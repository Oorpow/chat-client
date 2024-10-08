import { commonOpReq } from '@/utils/request'

/** 发送好友请求 */
export const sendFriendshipRequest = (data: API.FriendShipRequest) => {
  return commonOpReq.request({
    method: 'POST',
    url: '/friendship/add',
    data
  })
}

/** 获取好友申请列表 */
export const getFriendshipRequestList = () => {
  return commonOpReq.request({
    url: '/friendship/list'
  })
}

/** 获取好友列表 */
export const getFriendshipList = () => {
  return commonOpReq.request<API.CommonDataRes<API.FriendInfo[]>>({
    url: '/friendship/friends'
  })
}

/** 同意请求 & 添加好友 */
export const agreeFriendshipRequest = (data: API.AgreeFriendshipRequest) => {
  return commonOpReq.request({
    method: 'POST',
    url: '/friendship/agree',
    data
  })
}

/** 拒绝好友请求 */
export const rejectFriendshipRequest = (data: API.RejectFriendshipRequest) => {
  return commonOpReq.request({
    method: 'POST',
    url: '/friendship/reject',
    data
  })
}

/** 删除好友 */
export const deleteFriendship = (data: API.DeleteFriendship) => {
  return commonOpReq.request({
    method: 'POST',
    url: '/friendship/remove',
    data
  })
}

/**
 * 根据用户名查询好友
 * @param data
 * @returns
 */
export const searchFriendByUsername = (data: API.SearchFriendRequest) => {
  return commonOpReq.request<API.CommonDataRes<API.FriendInfo[]>>({
    url: `/friendship/search?username=${data.username}`
  })
}
