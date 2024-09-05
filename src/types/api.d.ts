declare module API {
  interface CommonDataRes<T = any> {
    data?: T
    code: number
    message: string
  }

  interface CommonDate {
    createTime: string
    updateTime: string
  }

  interface UserLoginForm extends UserRegisterForm {}

  interface UserRegisterForm {
    username: string
    password: string
  }

  interface UserInfo extends CommonDate {
    id: number
    username: string
    avatar: string
  }

  interface CheckUserBusinessCardRequest {
    id: number | string
  }

  type BusinessCardInfo = {
    id: number
    username: string
    avatar: string
  }

  interface FriendShipRequest {
    friendId: number
    reason: string
  }

  interface AgreeFriendshipRequest {
    fromUserId: number
  }

  interface RejectFriendshipRequest extends AgreeFriendshipRequest {}

  interface DeleteFriendship {
    friendId: number
  }

  interface SearchFriendRequest {
    username: string
  }

  interface FriendInfo extends UserInfo {
    id: number
    username: string
    avatar: string
  }

  interface PrivateChat {
    friendId: number
  }

  interface CreatePrivateChatRes {
    chatroomId: number
  }

  interface CreateChatRoom {
    name: string
  }

  interface JoinChatRoom {
    chatroomId: number
  }

  interface QuitChatRoom extends JoinChatRoom {}

  interface GetChatroomInfoRequest extends JoinChatRoom {}

  interface FindSingleChatRoomRequest extends PrivateChat {}

  interface GetChatroomInfoRes extends CommonDate {
    id: number
    name: string
    type: boolean
  }

  interface FindSingleChatRoomRes {
    chatroomId: number
  }

  interface GetChatHistoryRequest extends JoinChatRoom {}

  interface GetChatHistoryRes {
    id: number
    content: string
    type: number
    chatroomId: number
    fromUserId: number
    // fromUser
    user?: {
      id: number
      username: string
    }
  }

  interface ChatMessagePayload {
    fromUserId: number
    chatroomId: number
    message: {
      type: 'text' | 'image'
      content: string
    }
  }

  interface ChatMessageReply {
    id: number
    type: string
    userId: number
    message: {
      type: number
      content: string
    }
    chatroomId: number
  }
}
