<template>
  <div class="bg-white dark:bg-dark-bg min-h-screen">
    <!-- Hero Section -->
    <section class="relative border-b border-gray-200 dark:border-gray-700 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-dark-bg dark:to-gray-800 overflow-hidden">
      <!-- 背景装饰 -->
      <div class="absolute inset-0 opacity-5 dark:opacity-10">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 relative z-10">
        <div class="text-center">
          <h1 class="text-6xl md:text-8xl font-bold mb-6 animate-fade-in bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-blue-400">
            联系我
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto animate-fade-in-delay">
            有任何问题或合作意向？欢迎随时联系我，我会尽快回复您。
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section class="py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- 联系表单 -->
          <div class="card p-8">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              发送消息
            </h2>
            
            <form @submit.prevent="submitForm" class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  姓名
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="请输入您的姓名"
                />
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  邮箱
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="请输入您的邮箱"
                />
              </div>
              
              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  主题
                </label>
                <input
                  id="subject"
                  v-model="form.subject"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="请输入邮件主题"
                />
              </div>
              
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  消息内容
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="6"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-vertical"
                  placeholder="请输入您想说的内容..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full btn-primary py-3 text-base font-medium"
                :class="{'opacity-50 cursor-not-allowed': isSubmitting}"
              >
                {{ isSubmitting ? '发送中...' : '发送消息' }}
              </button>
            </form>
          </div>

          <!-- 联系详情 -->
          <div class="space-y-8">
            <!-- 联系方式列表 -->
            <div class="card p-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                联系信息
              </h3>
              
              <div class="space-y-4">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-brand rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">邮箱</p>
                    <p class="text-gray-900 dark:text-white">example@email.com</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">电话</p>
                    <p class="text-gray-900 dark:text-white">+86 138-0000-0000</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">地址</p>
                    <p class="text-gray-900 dark:text-white">中国</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 响应时间说明 -->
            <div class="card p-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                响应时间
              </h3>
              
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600 dark:text-gray-300">工作日</span>
                  <span class="text-gray-900 dark:text-white font-medium">24小时内</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600 dark:text-gray-300">周末</span>
                  <span class="text-gray-900 dark:text-white font-medium">48小时内</span>
                </div>
              </div>
            </div>

            <!-- 社交媒体链接 -->
            <div class="card p-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                社交媒体
              </h3>
              
              <div class="flex space-x-4">
                <a href="#" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200">
                  <span class="sr-only">GitHub</span>
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200">
                  <span class="sr-only">Twitter</span>
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200">
                  <span class="sr-only">LinkedIn</span>
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isSubmitting = ref(false)

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitForm = async () => {
  isSubmitting.value = true
  
  // 模拟表单提交
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // 在实际项目中，这里应该调用API
  console.log('表单提交:', form.value)
  
  // 重置表单
  form.value = { name: '', email: '', subject: '', message: '' }
  isSubmitting.value = false
  
  // 显示成功消息
  alert('消息发送成功！我会尽快回复您。')
}
</script>