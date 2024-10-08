import { commonOpReq } from '@/utils/request'

/**
 * 发起私聊
 * @param data
 * @returns
 */
export const sendPrivateChat = (data: API.PrivateChat) => {
  return commonOpReq.request<API.CommonDataRes<API.CreatePrivateChatRes>>({
    method: 'POST',
    url: '/chatroom/create/single',
    data
  })
}

/**
 * 创建群聊
 * @param data
 * @returns
 */
export const createChatRoom = (data: API.CreateChatRoom) => {
  return commonOpReq.request({
    method: 'POST',
    url: '/chatroom/create/group',
    data
  })
}

/**
 * 加入群聊
 * @param data
 * @returns
 */
export const joinChatRoom = (data: API.JoinChatRoom) => {
  return commonOpReq.request({
    method: 'POST',
    url: '/chatroom/join',
    data
  })
}

/**
 * 退出群聊
 * @param data
 * @returns
 */
export const quitChatRoom = (data: API.QuitChatRoom) => {
  return commonOpReq.request({
    method: 'POST',
    url: '/chatroom/group/quit',
    data
  })
}

/**
 * 获取全量聊天信息
 * @returns
 */
export const getAllChat = () => {
  return commonOpReq.request({
    url: '/chatroom/group/list'
  })
}

/**
 * 根据id获取聊天室信息
 * @param data
 * @returns
 */
export const getChatroomInfoById = (data: API.GetChatroomInfoRequest) => {
  return commonOpReq.request<API.CommonDataRes<API.GetChatroomInfoRes>>({
    url: `/chatroom/find/${data.chatroomId}`
  })
}

/**
 * 查看当前用户与对方是否存在私聊聊天室
 * @param data
 * @returns
 */
export const getOneToOneChatHistory = (data: API.FindSingleChatRoomRequest) => {
  return commonOpReq.request<API.CommonDataRes<API.FindSingleChatRoomRes>>({
    url: '/chatroom/find/single',
    params: {
      friendId: data.friendId
    }
  })
}
