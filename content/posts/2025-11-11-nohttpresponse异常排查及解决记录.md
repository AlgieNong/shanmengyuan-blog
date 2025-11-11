---
title: NoHttpResponse异常排查及解决记录
date: 2025-11-11T21:05:00.000+08:00
tags:
  - 异常记录
excerpt: 线上出现偶发性NoHttpResponse异常，记录排查修复过程
heroImage: /smy-blog.github.io/images/after_fin.png
draft: false
---
## 背景

* 接口：`accpapi.lianlianpay.com:443`，业务场景为结算余额查询。
* 客户端：Settlement Engine 服务，基于 Apache HttpClient 长连接。
* 异常：偶发 `org.apache.http.NoHttpResponseException`，线上请求偶尔失败但重试即成功。

## 调查时间线（按发生顺序）

### 阶段一｜定位异常含义

* 现象：日志多次出现 `accpapi.lianlianpay.com:443 failed to respond`。
* 分析：`NoHttpResponseException` 说明客户端发出请求但未收到任何响应头，常见根因是服务端提前关闭连接。
* 假设：服务端可能设置了较短的 Keep-Alive 超时时间，空闲连接会被主动断开。
* 行动计划：通过抓包验证服务器是否在请求前关闭连接。

### 阶段二｜本地抓包确认关闭顺序

![alt text](/smy-blog.github.io/images/lianlian_close_time.png)

* 动作：本地启动项目抓取 TLS 流量。
* 观察：当连接空闲约 15s 时，服务端发出 `Encrypted Alert`（close_notify）紧接 `FIN, ACK`，客户端才被动关闭。
* 结论：确认服务端存在15s空闲回收机制；
* 下一步：在可控环境重现问题，便于精准分析报文。

### 阶段三｜本地复现异常

* 动作：编写循环请求接口，模拟“每 14.5~15.5s 发一次余额查询”。
* 结果：本地日志复现 `NoHttpResponseException`，并与线上一致。
* 说明：此阶段保持现有代码，目的是验证问题。

```java
@RequestMapping(value = "/settle/balance/query/test", method = RequestMethod.POST)
@ApiOperation("余额查询测试")
public AjaxResult<LLPayBalanceQueryResponse> balanceQueryTest(@RequestBody @Valid LLPayBalanceQueryRequest request) {
    try {
        Random random = new Random();
        while (true) {
            Channel channel = ChannelRouteBiz.randomRoute(request);
            ChannelResponse response = channel.service().exec(ChannelCommandId.BALANCE_QUERY, request);
            Thread.sleep(145 * 100L + 100L * random.nextInt(10));
        }
    } catch (Exception e) {
        LogUtil.logApplicationError("请求连连发生错误", e);
        AjaxResult ajaxResult = new AjaxResult();
        ajaxResult.setMessage(e.getMessage());
        return ajaxResult;
    }
}
```

![alt text](/smy-blog.github.io/images/local_error.png)

### 阶段四｜逐帧分析原始抓包

![alt text](/smy-blog.github.io/images/error_fin.png)

* 报文重点（#10833~#11211）：

  * \#10833/#10834：服务端 close_notify + FIN，开始四次挥手。
  * \#11204：客户端发送第二笔请求的 Application Data。
  * \#11205/#11209：服务端立即返回 close_notify + FIN，Ack 仍停在 1615，并未读取新请求。
  * \#11211：服务端 RST，强制断开。
* 结论：请求确实落在服务端关闭窗口内，导致 `NoHttpResponseException`。根因在于客户端复用了已被服务器回收的连接。
* 行动计划：思考如何在客户端侧避免复用“即将被回收”的连接。

### 阶段五｜方案调研

* 资料调研：网上查询到两种解决方案，在构造HttpClientConnectionManager时：

  1. **构造函数指定 timeToLive**：到期即判定连接失效，下一次借用时会新建连接。
  2. **调用 setValidateAfterInactivity**：在连接空闲超过阈值时做“失效校验”。
* 实验验证：

  * 先为复现程序加入 `setValidateAfterInactivity(2000)`。

    ```java
    PoolingHttpClientConnectionManager cm = new PoolingHttpClientConnectionManager(socketFactoryRegistry);
    // 设置空闲校验时长（ms）
    cm.setValidateAfterInactivity(2000);
    CloseableHttpClient httpClient = HttpClients.custom()
            .setConnectionManager(cm)
            .build();
    ```
  * 抓包结果：15s 后客户端依旧复用旧连接，仍然触发 `NoHttpResponseException`。
  * 原因分析：该方法只检查本地 socket 状态（是否关闭、输入输出是否可用），不会发送探测数据给服务器，因而无法感知对端已发送 FIN。
* 结论：`setValidateAfterInactivity` 对“服务器抢先关闭”的场景无效，必须从生命周期入手。
* 最终方案：采用带 TTL 的构造函数，强制连接在 10s 后淘汰。

  ```java
  //设置连接的最大存活时间是10s，超过10s的会重新获取http连接
  PoolingHttpClientConnectionManager cm = new PoolingHttpClientConnectionManager(10, TimeUnit.SECONDS);
  CloseableHttpClient httpClient = HttpClients.custom()
          .setConnectionManager(cm)
          .build();
  ```
* 预期：客户端在 10s 左右就会放弃旧连接，下一次请求拿到崭新的连接，从时间上避开服务端 15s 的关闭窗口。

### 阶段六｜修改后验证与长时间观察

![alt text](/smy-blog.github.io/images/after_fin.png)

* 首轮验证抓包：

  * 假如客户端先发送请求，那么会主动发送 close_notify + FIN，随后立即重新握手，新请求落在新连接上。
* 长时间运行抓包：

  * 服务端仍可能在 15s 附近先行发送 close_notify + FIN。
  * 关键区别：此时旧连接已经没有未处理请求，客户端随即用新端口 63076 建立连接并发送下一笔请求。
* 结论：无论是谁抢先关闭，业务请求都始终在“刚创建的连接”上执行，再未观察到 `NoHttpResponseException`。

### 阶段七｜对比易宝渠道的行为

* 动作：补充抓包易宝渠道的 TLS 会话，验证是否存在类似问题。
* 观察：易宝服务器不会在空闲阶段主动发 close_notify/FIN，连接稳定保持；客户端会在 60~70s 时主动断开并重建，会话总是在服务器之前结束。
* 结论：由于易宝客户端始终先于服务器关闭连接，发送请求时连接均处于健康状态，因此没有出现被服务器略过或 `NoHttpResponseException` 的情况。

## 原因结论

* 服务端空闲回收阈值约 15s，超时后直接发送 close_notify + FIN。
* 客户端重用已闲置 15s 的连接，在服务器关闭瞬间发送请求，引发 `NoHttpResponseException`。
* 本质：长连接未做空闲健康检查，导致请求落在 TCP 四次挥手期间。

## 解决方案

1. 强制缩短客户端连接存活期：`PoolingHttpClientConnectionManager(10, TimeUnit.SECONDS)`。
2. 可选补强：

   * `setValidateAfterInactivity` 已验证无法识别“对端已发送 FIN”场景，此处不再启用，可作为其他业务的参考选项。
   * 定期 `closeIdleConnections`，及时回收僵尸连接。
