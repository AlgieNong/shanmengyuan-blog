<template>
  <div class="bg-white dark:bg-dark-bg min-h-screen">
    <!-- Hero Section -->
    <section class="relative border-t border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
          <h1 class="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-8">
            关于我
          </h1>
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <section class="py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Profile -->
          <div class="lg:col-span-2">
            <div class="prose prose-lg dark:prose-invert max-w-none">
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                个人简介
              </h2>
              
              <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">
                你好！我是一名热爱技术的开发者，专注于前端开发和用户体验设计。
                我相信技术应该服务于人，通过优雅的代码和出色的设计来创造价值。
              </p>
              
              <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">
                在日常工作中，我喜欢探索新技术，解决复杂问题，并与团队协作构建出色的产品。
                我热衷于开源社区，喜欢分享知识，也乐于向他人学习。
              </p>

              <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                技能专长
              </h3>
              
              <div class="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">前端技术</h4>
                  <ul class="text-gray-600 dark:text-gray-300 space-y-1">
                    <li>Vue.js / React</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                    <li>Vite / Webpack</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">其他技能</h4>
                  <ul class="text-gray-600 dark:text-gray-300 space-y-1">
                    <li>UI/UX 设计</li>
                    <li>Git / GitHub</li>
                    <li>Node.js</li>
                    <li>Docker</li>
                  </ul>
                </div>
              </div>

              <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                工作经历
              </h3>
              
              <div class="space-y-6">
                <div class="border-l-4 border-brand pl-4">
                  <h4 class="font-semibold text-gray-900 dark:text-white">前端开发工程师</h4>
                  <p class="text-gray-500 dark:text-gray-400 text-sm">某科技公司 • 2022年 - 至今</p>
                  <p class="text-gray-600 dark:text-gray-300 mt-2">
                    负责核心产品的前端架构设计和开发，带领团队完成多个重要项目。
                  </p>
                </div>
                
                <div class="border-l-4 border-gray-300 dark:border-gray-600 pl-4">
                  <h4 class="font-semibold text-gray-900 dark:text-white">全栈开发工程师</h4>
                  <p class="text-gray-500 dark:text-gray-400 text-sm">创业公司 • 2020年 - 2022年</p>
                  <p class="text-gray-600 dark:text-gray-300 mt-2">
                    参与产品从0到1的开发过程，负责前后端开发和系统部署。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <div class="card p-6 sticky top-6">
              <!-- Avatar -->
              <div class="text-center mb-6">
                <div class="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span class="text-4xl text-gray-400">👨‍💻</span>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">开发者</h3>
                <p class="text-gray-500 dark:text-gray-400">前端工程师 & 设计师</p>
              </div>

              <!-- Contact Info -->
              <div class="space-y-4">
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span class="text-gray-600 dark:text-gray-300">example@email.com</span>
                </div>
                
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span class="text-gray-600 dark:text-gray-300">某科技公司</span>
                </div>
                
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span class="text-gray-600 dark:text-gray-300">中国</span>
                </div>
              </div>

              <!-- Social Links -->
              <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div class="flex justify-center space-x-4">
                  <a href="#" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <span class="sr-only">GitHub</span>
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                  </a>
                  <a href="#" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <span class="sr-only">Twitter</span>
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                    </svg>
                  </a>
                  <a href="#" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
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
      </div>
    </section>
  </div>
</template>