import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue')
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('../pages/Projects.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../pages/About.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../pages/Contact.vue')
  },
  {
    path: '/post/:slug',
    name: 'PostDetail',
    component: () => import('../pages/PostDetail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.NODE_ENV === 'production' ? '/smy-blog.github.io/' : '/'),
  routes
})

export default router