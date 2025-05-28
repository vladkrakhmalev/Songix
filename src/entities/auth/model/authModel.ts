export interface ILogin {
  email: string
  password: string
}

export interface IRegistration {
  email: string
  password: string
  repeatPassword: string
}

export interface IResetPassword {
  email: string
}
