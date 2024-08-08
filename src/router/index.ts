import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layout/default.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register/index.vue')
    },
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '/chat',
          name: 'chat',
          component: () => import('@/views/Chat/index.vue')
        },
        {
          path: '/directory',
          name: 'directory',
          component: () => import('@/views/Directory/index.vue')
        },
        {
          path: '/my',
          name: 'my',
          component: () => import('@/views/My/index.vue')
        }
      ]
    }
  ]
})

export default router
