import { commonOpReq } from '@/utils/request'

//
export const getChatHistoryByChatroomId = (data: API.GetChatroomInfoRequest) => {
  return commonOpReq.request<API.CommonDataRes<API.GetChatHistoryRes[]>>({
    url: '/chat-history/list',
    params: {
      chatroomId: data.chatroomId
    }
  })
}
