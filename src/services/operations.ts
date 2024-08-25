import { axiosPublic } from '.'
import { LoginFormInputs } from '../types'

export const login = async (data: LoginFormInputs) => {
  const result = await axiosPublic.post('auth/login', data)
  console.log(result)
  return result.data
}
