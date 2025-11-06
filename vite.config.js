import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({command, mode}) => {
  // Netlify 构建时会设置 NETLIFY=true 环境变量
  const isNetlify = process.env.NETLIFY === 'true'
  
  return {
    plugins: [vue()],
    // Netlify 用根路径，GitHub Pages 用子路径
    base: isNetlify ? '/' : '/smy-blog.github.io/',
    build: {
      outDir: 'dist'
    }
  }
})