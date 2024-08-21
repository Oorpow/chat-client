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
      const res = await userLogin(data)
      // 存储token
      accessToken.value = res.data
    }

    /**
     * 用户注册
     * @param data 注册表单
     */
    async function register(data: API.UserRegisterForm) {
      await userRegister(data)
    }

    /**
     * 获取用户的基本信息
     */
    function authInfo() {}

    return {
      login,
      authInfo,
      register
    }
  },
  {
    persist: {
      key: 'oor-chat',
      paths: ['accessToken']
    }
  }
)
