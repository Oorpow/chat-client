import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
})

export default router
