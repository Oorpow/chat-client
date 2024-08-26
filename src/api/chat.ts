import { commonOpReq } from '@/utils/request'

// 发起私聊
export const sendPrivateChat = (data: API.PrivateChat) => {
  return commonOpReq.request({
    method: 'POST',
    url: '/chatroom/create/single',
    data
  })
}

// 创建群聊
export const createChatRoom = (data: API.CreateChatRoom) => {
  return commonOpReq.request({
    method: 'POST',
    url: '/chatroom/create/group',
    data
  })
}

// 加入群聊
export const joinChatRoom = (data: API.JoinChatRoom) => {
  return commonOpReq.request({
    method: 'POST',
    url: '/chatroom/join',
    data
  })
}

// 退出群聊
export const quitChatRoom = (data: API.QuitChatRoom) => {
  return commonOpReq.request({
    method: 'POST',
    url: '/chatroom/group/quit',
    data
  })
}

// 获取所有聊天
export const getAllChat = () => {
  return commonOpReq.request({
    url: '/chatroom/group/list'
  })
}
