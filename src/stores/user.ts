import { userRegister } from '@/api/user'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  async function register(data: API.UserRegisterForm) {
    await userRegister(data)
  }

  return {
    register
  }
})
