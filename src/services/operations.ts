import { axiosPublic } from '.'
import { LoginFormInputs, RegisterFormInputs } from '../types'

export const login = async (data: LoginFormInputs) => {
  const result = await axiosPublic.post('auth/login', data)
  console.log(result)
  return result.data
}

export const register = async (data: RegisterFormInputs) => {
  const result = await axiosPublic.post('auth/register', data)
  console.log(result)
  return result.data
}
