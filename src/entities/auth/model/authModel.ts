import axios from 'axios'

export interface ILogin {
  email: string,
  password: string,
}

export interface IRegistration {
  email: string,
  password: string,
  repeatPassword: string,
}

export interface IResetPassword {
  email: string,
}



export const login = async (form: ILogin) => {
  try {
    const response = await axios.post(`https://reqres.in/api/login`, form)
    return { success: true, data: response.data }

  } catch (error: any) {
    return { success: false, error: error.response.data.error }
  }
}

export const register = async (form: IRegistration) => {
  try {
    const response = await axios.post(`https://reqres.in/api/register`, form)
    return { success: true, data: response.data }

  } catch (error: any) {
    return { success: false, error: error.response.data.error }
  }
}

export const resetPassword = async (form: IResetPassword) => {
  try {
    const response = await axios.post(`https://reqres.in/api/login`, form)
    return { success: true, data: response.data }

  } catch (error: any) {
    return { success: false, error: error.response.data.error }
  }
}