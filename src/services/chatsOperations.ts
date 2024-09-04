import { axiosPublic } from '.'
import { ENDPOINTS } from '../constants'
import { IChat } from '../types'
import { IMessage } from '../types/types'

export const getChatList = async () => {
  try {
    const { data } = await axiosPublic.get(ENDPOINTS.CHATS)
    return data as IChat[]
  } catch (error) {
    console.log('Error getting chat list', error)
  }
}

export const createNewChat = async (partnerId: string) => {
  try {
    const { data } = await axiosPublic.post(
      ENDPOINTS.CHATS,
      {},
      {
        params: { partner: partnerId },
      }
    )
    return data
  } catch (error) {
    console.log('Error creating new chat', error)
  }
}

export const deleteChat = async (chatId: string) => {
  try {
    const { data } = await axiosPublic.delete(`${ENDPOINTS.CHATS}/${chatId}`)
    return data
  } catch (error) {
    console.log('Error deleting chat', error)
  }
}

export const getChatMessages = async (chatId: string) => {
  try {
    const { data } = await axiosPublic.get(`${ENDPOINTS.CHATS}/${chatId}`)
    return data
  } catch (error) {
    console.log('Error creating new chat', error)
  }
}

export const readChatMessages = async (chatId: string) => {
  try {
    const { data } = await axiosPublic.put(`${ENDPOINTS.CHATS}/${chatId}`)
    return data
  } catch (error) {
    console.log('Error creating new chat', error)
  }
}

export const getAllUsers = async () => {
  try {
    const { data } = await axiosPublic.get(`${ENDPOINTS.USER}/`)
    return data
  } catch (error) {
    console.log('Error creating new chat', error)
  }
}

export const sendMessage = async (
  message: Omit<IMessage, '_id' | 'createdAt' | 'readBy'>
) => {
  try {
    const { data } = await axiosPublic.post(ENDPOINTS.MESSAGES, message)
    return data
  } catch (error) {
    console.log('Error creating new chat', error)
  }
}
