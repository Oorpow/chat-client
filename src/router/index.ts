import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layout/default.vue'
import ChildWithBack from '@/layout/ChildWithBack.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register/index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/index.vue')
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
    },
    {
      path: '/business-card',
      name: 'businessCard',
      component: () => import('@/views/BusinessCard/index.vue')
    }
  ]
})

const whiteList = ['/login', '/register']

router.beforeEach((to, from, next) => {
  if (whiteList.includes(to.path)) {
    next()
  } else {
    const chatStorage = localStorage.getItem('oor-chat')
    if (chatStorage) {
      const storage = JSON.parse(chatStorage)
      if (storage.accessToken) {
        next()
      } else {
        next('/login')
      }
    } else {
      next()
    }
  }
})

export default router
