import { axiosPublic } from '.'
import { ENDPOINTS } from '../constants'
import { IUserToUpdate, LoginFormInputs, SignUpInputs } from '../types'

export const login = async (loginData: LoginFormInputs) => {
  try {
    const { data } = await axiosPublic.post(ENDPOINTS.LOGIN, loginData)
    const { name, surname, avatar, access_token: accessToken, id } = data

    return { name, surname, avatar, accessToken, id }
  } catch (error) {
    console.error('Sign in failed:', error)
  }
}

export const register = async (userData: SignUpInputs) => {
  try {
    const { data } = await axiosPublic.post(ENDPOINTS.REGISTER, userData)
    const { name, surname, avatar, access_token: accessToken, id } = data

    return { name, surname, avatar, accessToken, id }
  } catch (error) {
    console.error('Sign up failed:', error)
  }
}

export const logout = async () => {
  try {
    await axiosPublic.post(ENDPOINTS.LOGOUT)
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

export const getCurrentUser = async () => {
  try {
    const { data } = await axiosPublic.get(ENDPOINTS.CURRENT_USER)
    const { name, surname, avatar, access_token: accessToken, id } = data

    return { name, surname, avatar, accessToken, id }
  } catch (error) {
    console.error('Get current user failed:', error)
  }
}

export const updateCurrentUser = async (userData: IUserToUpdate) => {
  try {
    const { data } = await axiosPublic.put(ENDPOINTS.USER, userData)
    const { name, surname, avatar, access_token: accessToken, id } = data

    return { name, surname, avatar, accessToken, id }
  } catch (error) {
    console.error('Update current user failed:', error)
  }
}
