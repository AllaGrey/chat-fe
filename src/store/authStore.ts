import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { currentUser } from '../mocks'

interface IUser {
  id: string
  name: string
  surname: string
  avatar: string
}

interface IUserState {
  currentUser: IUser | null
  isLoggedIn: boolean
}

const initialState = {
  currentUser: null,
  isLoggedIn: false,
}

export const useAuthStore = create(set => ({
  currentUser: null,
  isLoggedIn: false,
  signUp: async () => {
    const user = await currentUser
    set({ user: user, isLoggedIn: true })
  },
  signIn: async () => {
    const user = await currentUser
    set({ user: user, isLoggedIn: true })
  },
  signOut: () => set(null),
}))
