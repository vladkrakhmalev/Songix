export interface ILoginRequest {
  email: string
  password: string
}

export interface ILoginResponse {
  token: string
  user: {
    id: string
    email: string
  }
}

export interface IRegisterRequest {
  email: string
  password: string
}

export interface IRegisterResponse {
  token: string
  user: {
    id: string
    email: string
  }
}
