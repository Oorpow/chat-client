declare module API {
  interface CommonDataRes<T = any> {
    data?: T
    code: number
    message: string
  }

  interface UserLoginForm extends UserRegisterForm {}

  interface UserRegisterForm {
    username: string
    password: string
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

  interface PrivateChat {
    friendId: number
  }

  interface CreateChatRoom {
    name: string
  }

  interface JoinChatRoom {
    chatroomId: number
  }

  interface QuitChatRoom {
    chatroomId: number
  }
}
