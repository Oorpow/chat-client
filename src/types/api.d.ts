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

  interface FindSingleChatRoomRequest extends PrivateChat {}

  interface FindSingleChatRoomRes {
    chatroomId: number
  }
}
