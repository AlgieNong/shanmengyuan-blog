import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme()
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    applyTheme()
  }

  const applyTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      ensureHljsLightTheme(false)
      ensureHljsDarkTheme(true)
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      ensureHljsDarkTheme(false)
      ensureHljsLightTheme(true)
    }
  }

  function ensureHljsDarkTheme(enable) {
    const id = 'hljs-dark-theme'
    const existing = document.getElementById(id)
    if (enable) {
      if (!existing) {
        const link = document.createElement('link')
        link.id = id
        link.rel = 'stylesheet'
        link.href = 'https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/github-dark.min.css'
        document.head.appendChild(link)
      }
    } else {
      if (existing) existing.remove()
    }
  }

  function ensureHljsLightTheme(enable) {
    const id = 'hljs-light-theme'
    const existing = document.getElementById(id)
    if (enable) {
      if (!existing) {
        const link = document.createElement('link')
        link.id = id
        link.rel = 'stylesheet'
        link.href = 'https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/github.min.css'
        document.head.appendChild(link)
      }
    } else {
      if (existing) existing.remove()
    }
  }

  watch(isDark, applyTheme)

  return {
    isDark,
    initTheme,
    toggleTheme
  }
})