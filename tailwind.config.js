/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,ts,tsx,js,jsx}',
    './public/admin/**/*.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#3b82f6',
          dark: '#1d4ed8',
        },
        dark: {
          bg: '#090D1F',
          text: '#FFFFFF'
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            /* 保留代码的内联样式形态，不覆盖颜色，以便由 highlight.js 主题控制 */
            code: {
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
            },
          },
        },
        invert: {
          css: {
            /* 暗色时也不覆盖颜色，让高亮主题自行处理 */
            code: {
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}