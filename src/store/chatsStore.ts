import { create } from 'zustand'

import {
  createNewChat,
  deleteChat,
  getAllUsers,
  getChatList,
  getChatMessages,
  sendMessage,
} from '../services'
import { IChatsState } from '../types'

export const useChatsStore = create<IChatsState>((set, get) => ({
  chats: [],
  usersList: [],
  openedChat: null,
  messageList: [],
  filter: '',
  isLoading: true,

  getChats: async () => {
    set({ isLoading: true })

    const chats = await getChatList()

    set({ chats, isLoading: false })
  },

  openChat: chat => {
    set({ openedChat: chat })
  },

  closeChat: () => {
    set({ openedChat: null, messageList: [] })
  },

  createChat: async partnerId => {
    set({ isLoading: true })

    const newChat = await createNewChat(partnerId)

    set(state => ({
      chats: [newChat, ...state.chats],
      usersList: state.usersList.filter(user => user.id !== partnerId),
      openedChat: newChat,
      isLoading: false,
    }))
  },

  deleteChat: async chatId => {
    set({ isLoading: true })

    await deleteChat(chatId)

    set(state => ({
      chats: state.chats.filter(chat => chat._id !== chatId),
      isLoading: false,
    }))
  },

  getMessageList: async () => {
    set({ isLoading: true })

    const chatId = get().openedChat?._id

    if (!chatId) return

    const messageList = await getChatMessages(chatId)

    set({ messageList, isLoading: false })
  },

  addMessage: async newMessage => {
    await sendMessage(newMessage)
    // set(state => ({
    //   messageList: [...state.messageList, message],
    // }))
  },

  receiveMessage: newMessage => {
    set(state => ({
      messageList: [...state.messageList, newMessage],
    }))
  },

  getAllUsers: async () => {
    set({ isLoading: true })

    const usersList = await getAllUsers()

    set({ usersList, isLoading: false })
  },

  filterUsers: filterValue => {
    set({ filter: filterValue })
  },
}))
