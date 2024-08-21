import { commonOpReq } from '@/utils/request'

interface CommonDataRes<T = any> {
  data?: T
  code: number
  message: string
}

export const userLogin = (data: API.UserLoginForm) => {
  return commonOpReq.request<CommonDataRes<string>>({
    method: 'POST',
    url: '/login',
    data
  })
}

export const userRegister = (data: API.UserRegisterForm) => {
  return commonOpReq.request({
    method: 'POST',
    url: '/register',
    data
  })
}

export const userAuthInfo = () => {
  return commonOpReq.request({
    url: '/auth'
  })
}
