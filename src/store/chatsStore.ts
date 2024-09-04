import { create } from 'zustand'

import {
  createNewChat,
  deleteChat,
  getAllUsers,
  getChatList,
  getChatMessages,
  sendMessage,
} from '../services'
import { readChatMessages } from '../services/chatsOperations'
import { IChatsState } from '../types'
import { useAuthStore } from './authStore'

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

  openChat: async chat => {
    set({ isLoading: true })

    const updatedChats = await readChatMessages(chat._id)

    set({
      openedChat: chat,
      chats: updatedChats,
      isLoading: false,
    })
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
  },

  receiveMessage: newMessage => {
    const currentUser = useAuthStore.getState().currentUser?.id

    const isMessageFromOtherUser = newMessage.user !== currentUser

    set(state => {
      const updatedChats = state.chats.map(chat => {
        if (chat._id === newMessage.chat) {
          const unreadMessagesCount = isMessageFromOtherUser
            ? chat.unreadMessagesCount + 1
            : chat.unreadMessagesCount

          return {
            ...chat,
            unreadMessagesCount,
          }
        }

        return chat
      })
      return {
        ...state,
        messageList: [...state.messageList, newMessage],
        chats: updatedChats,
        isLoading: false,
      }
    })
  },

  updateChatUnreadCount: chatId => {
    set(state => ({
      chats: state.chats.map(chat =>
        chat._id === chatId
          ? { ...chat, unreadMessagesCount: chat.unreadMessagesCount + 1 }
          : chat
      ),
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
