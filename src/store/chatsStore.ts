import { create } from 'zustand'

import { chatListData } from '../mocks/chatListData'

export const useChatsStore = create(set => ({
  chats: 0,
  openedChat: null,
  getAllChats: () => set(({ chats }: any) => ({ chats: chatListData })),
  openChat:
    () =>
    ({ openedChat }: any) => ({ openedChat: chatListData[0] }),
  createChat: () => set(null),
  removeChat: () => set(({ chats }: any) => ({ chats: chats })),
}))
