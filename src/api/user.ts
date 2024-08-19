import { commonOpReq } from '@/utils/request'

export const userRegister = (data: API.UserRegisterForm) => {
  return commonOpReq.request({
    url: '/register',
    data
  })
}
