import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
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
  }
]

const router = createRouter({
  history: createWebHistory('/blog/'),
  routes
})

export default router