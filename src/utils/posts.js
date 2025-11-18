import fm from 'front-matter'
import { encode as encodePlantUML } from 'plantuml-encoder'

// 使用 Vite 的 import.meta.glob 读取 Markdown 源文件（原始字符串）
// 注意：本文件位于 src/utils/，到 content/posts/ 的相对路径为 ../../content/posts/*.md
const files = import.meta.glob('../../content/posts/*.md', { as: 'raw', eager: true })

function transformPlantUML(md) {
  if (!md) return md
  const replacer = (match, lang, code) => {
    try {
      const encoded = encodePlantUML(code.trim())
      const src = `https://www.plantuml.com/plantuml/svg/${encoded}`
      return `![](${src})`
    } catch (e) {
      return match
    }
  }
  return md.replace(/```(plantuml|puml)\n([\s\S]*?)\n```/g, replacer)
}


function toSlug(path) {
  // 例如 ../../content/posts/2025-01-10-vite-and-vue3.md -> 2025-01-10-vite-and-vue3
  const name = path.split('/').pop() || ''
  return name.replace(/\.md$/, '')
}

function normalizePost(raw, slug) {
  const { attributes, body } = fm(raw)
  // 只转换 PlantUML（Mermaid 由 marked renderer 处理）
  const processedBody = transformPlantUML(body || '')
  return {
    slug,
    title: attributes?.title || slug,
    date: attributes?.date ? new Date(attributes.date).toISOString().slice(0, 10) : '1970-01-01',
    tags: Array.isArray(attributes?.tags) ? attributes.tags : [],
    excerpt: attributes?.excerpt || '',
    heroImage: attributes?.heroImage || '',
    draft: !!attributes?.draft,
    body: processedBody
  }
}

// 加载全部已发布文章（过滤 draft），并按日期倒序
export async function loadPosts() {
  const all = Object.entries(files).map(([path, raw]) => normalizePost(raw, toSlug(path)))
  const published = all.filter(p => !p.draft)
  published.sort((a, b) => new Date(b.date) - new Date(a.date))
  return published
}

export function getPostBySlug(posts, slug) {
  return posts.find(post => post.slug === slug)
}

// 解析单个 Markdown 字符串，返回 { front matter 展开的字段, body }
export function parseMarkdown(content) {
  const { attributes, body } = fm(content)
  // 只转换 PlantUML（Mermaid 由 marked renderer 处理）
  const processedBody = transformPlantUML(body)
  return { ...attributes, body: processedBody }
}

// 获取所有标签
export function getAllTags(posts) {
  const tags = new Set()
  posts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => tags.add(tag))
    }
  })
  return Array.from(tags)
}

// 按标签过滤文章
export function filterPostsByTag(posts, tag) {
  return posts.filter(post => post.tags && post.tags.includes(tag))
}

// 按日期排序（最新的在前）
export function sortPostsByDate(posts) {
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}
