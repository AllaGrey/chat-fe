import { create } from 'zustand'

import {
  getCurrentUser,
  login,
  logout,
  register,
  updateCurrentUser,
} from '../services'
import { IUserState, IUserToUpdate } from '../types'

export const useAuthStore = create<IUserState>(set => ({
  currentUser: null,
  isLoggedIn: false,
  isLoading: true,

  signUp: async userData => {
    set({ isLoading: true })

    const user = await register(userData)

    localStorage.setItem('token', user?.accessToken)

    set({
      currentUser: user,
      isLoggedIn: true,
      isLoading: false,
    })
  },

  signIn: async (email, password) => {
    set({ isLoading: true })

    const user = await login({ email, password })

    localStorage.setItem('token', user?.accessToken)

    set({
      currentUser: user,
      isLoggedIn: true,
      isLoading: false,
    })
  },

  signOut: async () => {
    await logout()

    localStorage.removeItem('token')

    set({ currentUser: null, isLoggedIn: false })
  },

  getUser: async () => {
    set({ isLoading: true })

    const token = localStorage.getItem('token')

    if (!token || token === 'undefined') {
      set({ isLoading: false })
      return
    }

    const user = await getCurrentUser()

    localStorage.setItem('token', user?.accessToken)

    set({
      currentUser: user,
      isLoggedIn: true,
      isLoading: false,
    })
  },

  updateUser: async (userData: IUserToUpdate) => {
    set({ isLoading: true })

    const user = await updateCurrentUser(userData)

    localStorage.setItem('token', user?.accessToken)

    set({
      currentUser: user,
      isLoggedIn: true,
      isLoading: false,
    })
  },
}))
