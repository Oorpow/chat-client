import { ref } from 'vue'
import { defineStore } from 'pinia'
import { userAuthInfo, userLogin, userRegister } from '@/api/user'

export const useUserStore = defineStore(
  'user',
  () => {
    const accessToken = ref('')
    const userInfo = ref<API.UserInfo | null>(null)

    /**
     * 用户登录 保存token、获取用户个人信息并保存
     * @param data 登录表单
     */
    async function login(data: API.UserLoginForm) {
      try {
        const res = await userLogin(data)
        setToken(res.data)
        await authInfo()
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

    function setUserInfo(info: API.UserInfo) {
      userInfo.value = info
    }

    /**
     * 获取用户的基本信息
     */
    async function authInfo() {
      try {
        const res = await userAuthInfo()
        setUserInfo(res.data)
      } catch (error) {
        return error
      }
    }

    return {
      accessToken,
      userInfo,
      login,
      authInfo,
      register
    }
  },
  {
    persist: {
      storage: localStorage,
      key: 'oor-chat',
      paths: ['accessToken', 'userInfo']
    }
  }
)
