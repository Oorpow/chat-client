import { commonOpReq } from '@/utils/request'

export const userLogin = (data: API.UserLoginForm) => {
  return commonOpReq.request<API.CommonDataRes<string>>({
    method: 'POST',
    url: '/user/login',
    data
  })
}

export const userRegister = (data: API.UserRegisterForm) => {
  return commonOpReq.request({
    method: 'POST',
    url: '/user/register',
    data
  })
}

export const userAuthInfo = () => {
  return commonOpReq.request<API.CommonDataRes<API.UserInfo>>({
    url: '/user/auth'
  })
}
