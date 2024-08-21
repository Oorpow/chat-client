declare module API {
  interface UserLoginForm extends UserRegisterForm {}

  interface UserRegisterForm {
    username: string
    password: string
  }
}
