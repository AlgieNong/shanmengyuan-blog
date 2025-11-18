<template>
  <div class="theme-selector-container">
    <!-- 触发按钮 -->
    <button
      @click="showDropdown = !showDropdown"
      class="theme-selector-button"
      :aria-label="'切换主题'"
      :aria-expanded="showDropdown"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
      <span class="ml-2 hidden sm:inline">{{ currentThemeDisplayName }}</span>
      <svg class="w-4 h-4 ml-2 transition-transform" :class="{ 'rotate-180': showDropdown }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- 下拉菜单 -->
    <Transition name="dropdown">
      <div v-if="showDropdown" class="theme-selector-dropdown">
        <!-- Markdown 内容主题 -->
        <div class="theme-section">
          <div class="theme-section-header">
            <span class="theme-section-title">Markdown 内容样式</span>
          </div>
          <div class="theme-options">
            <button
              v-for="theme in markdownThemes"
              :key="theme.key"
              @click="selectMarkdownTheme(theme.key)"
              class="theme-option"
              :class="{ 'theme-option-active': markdownThemeStore.currentTheme === theme.key }"
            >
              <div class="theme-option-content">
                <span class="theme-option-name">{{ theme.displayName }}</span>
                <span class="theme-option-desc">{{ theme.description }}</span>
              </div>
              <svg v-if="markdownThemeStore.currentTheme === theme.key" class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <!-- 页面整体主题 -->
        <div class="theme-section">
          <div class="theme-section-header">
            <span class="theme-section-title">页面整体样式</span>
          </div>
          <div class="theme-options">
            <button
              v-for="theme in pageThemes"
              :key="theme.key"
              @click="selectPageTheme(theme.key)"
              class="theme-option"
              :class="{ 'theme-option-active': pageThemeStore.currentTheme === theme.key }"
            >
              <div class="theme-option-content">
                <span class="theme-option-name">{{ theme.displayName }}</span>
                <span class="theme-option-desc">{{ theme.description }}</span>
              </div>
              <svg v-if="pageThemeStore.currentTheme === theme.key" class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 点击外部关闭 -->
    <div v-if="showDropdown" class="theme-selector-overlay" @click="showDropdown = false"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useMarkdownThemeStore } from '../stores/markdownTheme'
import { usePageThemeStore } from '../stores/pageTheme'

const markdownThemeStore = useMarkdownThemeStore()
const pageThemeStore = usePageThemeStore()

const showDropdown = ref(false)

// 获取可用主题
const markdownThemes = computed(() => markdownThemeStore.availableThemes)
const pageThemes = computed(() => pageThemeStore.availableThemes)

// 当前主题显示名称
const currentThemeDisplayName = computed(() => {
  const mdTheme = markdownThemes.value.find(t => t.key === markdownThemeStore.currentTheme)
  const pageTheme = pageThemes.value.find(t => t.key === pageThemeStore.currentTheme)
  return `${mdTheme?.displayName || ''} / ${pageTheme?.displayName || ''}`
})

// 选择 Markdown 主题
const selectMarkdownTheme = (themeKey) => {
  markdownThemeStore.setTheme(themeKey)
  showDropdown.value = false
}

// 选择页面主题
const selectPageTheme = (themeKey) => {
  pageThemeStore.setTheme(themeKey)
  showDropdown.value = false
}

// 点击外部关闭
const handleClickOutside = (event) => {
  if (!event.target.closest('.theme-selector-container')) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.theme-selector-container {
  position: relative;
}

.theme-selector-button {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.dark .theme-selector-button {
  background: rgba(26, 27, 38, 0.8);
  border-color: rgba(255, 255, 255, 0.1);
  color: #e5e7eb;
}

.theme-selector-button:hover {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(0, 0, 0, 0.15);
}

.dark .theme-selector-button:hover {
  background: rgba(26, 27, 38, 0.95);
  border-color: rgba(255, 255, 255, 0.15);
}

.theme-selector-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 320px;
  max-height: 80vh;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  z-index: 50;
  padding: 1rem;
}

.dark .theme-selector-dropdown {
  background: rgba(26, 27, 38, 0.95);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
}

.theme-section {
  margin-bottom: 1.5rem;
}

.theme-section:last-child {
  margin-bottom: 0;
}

.theme-section-header {
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.dark .theme-section-header {
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.theme-section-title {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
}

.dark .theme-section-title {
  color: #9ca3af;
}

.theme-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.theme-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.theme-option:hover {
  background: rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.1);
}

.dark .theme-option:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

.theme-option-active {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.3);
}

.dark .theme-option-active {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.4);
}

.theme-option-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.theme-option-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
}

.dark .theme-option-name {
  color: #f3f4f6;
}

.theme-option-desc {
  font-size: 0.75rem;
  color: #6b7280;
}

.dark .theme-option-desc {
  color: #9ca3af;
}

.theme-selector-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 40;
}

/* 下拉动画 */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-0.5rem);
}
</style>

