import { userLogin, userRegister } from '@/api/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const accessToken = ref('')

    /**
     * 用户登录
     * @param data 登录表单
     */
    async function login(data: API.UserLoginForm) {
      try {
        const res = await userLogin(data)
        setToken(res.data)
      } catch (error) {
        return error
      }
    }

    /**
     * 用户注册
     * @param data 注册表单
     */
    async function register(data: API.UserRegisterForm) {
      await userRegister(data)
    }

    function setToken(token: string) {
      accessToken.value = token
    }

    /**
     * 获取用户的基本信息
     */
    function authInfo() {}

    return {
      accessToken,
      login,
      authInfo,
      register
    }
  },
  {
    persist: {
      storage: localStorage,
      key: 'oor-chat',
      paths: ['accessToken']
    }
  }
)
