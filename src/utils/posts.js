import matter from 'gray-matter'

// 模拟文章数据 - 在实际项目中这些数据应该从 content/posts/ 目录读取
export const mockPosts = [
  {
    slug: 'ux-review-presentations',
    title: 'UX Review Presentations',
    date: '2023-01-01',
    tags: ['Design', 'Research', 'Presentation'],
    excerpt: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
    heroImage: '/images/ux-review.jpg',
    body: `# UX Review Presentations

Creating compelling presentations that wow your colleagues and impress your managers requires a combination of storytelling, data visualization, and effective communication.

## Key Elements

### 1. Storytelling
- Start with a clear narrative
- Build tension and resolution
- Use real user stories

### 2. Data Visualization
- Use charts and graphs effectively
- Highlight key insights
- Keep it simple and clear

### 3. Communication
- Speak clearly and confidently
- Engage your audience
- Be prepared for questions

## Best Practices

- Practice your presentation multiple times
- Know your audience
- Use visual aids effectively
- Be authentic and passionate

Remember, the goal is not just to present data, but to inspire action and drive change.`
  },
  {
    slug: 'migrating-to-linear-101',
    title: 'Migrating to Linear 101',
    date: '2023-01-15',
    tags: ['Design', 'Research'],
    excerpt: 'Linear helps streamline software projects, sprints, tasks, and bug tracking. Here\'s how to get started...',
    heroImage: '/images/linear-migration.jpg',
    body: `# Migrating to Linear 101

Linear is a modern issue tracking tool that helps teams streamline their software development process.

## Getting Started

### 1. Setting Up Your Workspace
- Create your team workspace
- Invite team members
- Set up projects and cycles

### 2. Importing Existing Data
- Import from Jira, GitHub, or other tools
- Map existing workflows
- Train your team

### 3. Best Practices
- Use labels and statuses effectively
- Set up automated workflows
- Integrate with your development tools

## Benefits

- Faster issue tracking
- Better collaboration
- Improved visibility
- Streamlined workflows

Migrating to Linear can significantly improve your team\'s productivity and collaboration.`
  },
  {
    slug: 'building-your-api-stack',
    title: 'Building Your API Stack',
    date: '2023-02-01',
    tags: ['Design', 'Research'],
    excerpt: 'The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing...',
    heroImage: '/images/api-stack.jpg',
    body: `# Building Your API Stack

Modern API development requires a comprehensive stack of tools and technologies.

## Core Components

### 1. API Design
- OpenAPI Specification
- API design tools
- Mock servers

### 2. Development
- Framework selection
- Authentication and authorization
- Rate limiting

### 3. Testing
- Unit testing
- Integration testing
- Performance testing

### 4. Documentation
- API documentation
- Code examples
- Interactive documentation

## Recommended Tools

- **Design**: Stoplight, Swagger
- **Development**: Express.js, FastAPI
- **Testing**: Postman, Jest
- **Documentation**: Redoc, Swagger UI

Building a solid API stack is essential for creating robust and maintainable APIs.`
  },
  {
    slug: 'grid-system-for-better-design',
    title: 'Grid System for Better Design User Interface',
    date: '2023-02-15',
    tags: ['Design', 'Interface'],
    excerpt: 'A grid system is a design tool used to arrange content on a webpage. It is a series of vertical and horizontal lines that create a matrix of intersecting points, which can be used to align and organize page elements.',
    heroImage: '/images/grid-system.jpg',
    body: `# Grid System for Better Design User Interface

Grid systems are fundamental to creating consistent and visually appealing user interfaces.

## Benefits of Grid Systems

### 1. Consistency
- Uniform spacing
- Predictable layouts
- Professional appearance

### 2. Efficiency
- Faster design process
- Reusable components
- Scalable designs

### 3. Accessibility
- Better readability
- Improved navigation
- Enhanced user experience

## Implementation

### CSS Grid
\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
}
\`\`\`

### Flexbox
\`\`\`css
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
\`\`\`

## Best Practices

- Start with a mobile-first approach
- Use consistent spacing
- Test on multiple devices
- Consider content hierarchy

Grid systems are essential for creating modern, responsive web designs.`
  }
]

// 在实际项目中，这个函数会从 content/posts/ 目录读取 Markdown 文件
export async function loadPosts() {
  // 模拟异步加载
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPosts)
    }, 100)
  })
}

export function getPostBySlug(posts, slug) {
  return posts.find(post => post.slug === slug)
}

// 解析 Markdown 文件的函数（在实际项目中会用到）
export function parseMarkdown(content) {
  const { data, content: body } = matter(content)
  return {
    ...data,
    body
  }
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
  return posts.filter(post => 
    post.tags && post.tags.includes(tag)
  )
}

// 按日期排序（最新的在前）
export function sortPostsByDate(posts) {
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}