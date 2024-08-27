import { create } from 'zustand'

import { axiosPublic } from '../services'
import { IUserState, IUserToUpdate } from '../types'

export const useAuthStore = create<IUserState>(set => ({
  currentUser: null,
  isLoggedIn: false,
  isLoading: true,

  signUp: async userData => {
    set({ isLoading: true })
    try {
      const { data } = await axiosPublic.post('/auth/register', userData)
      const { name, surname, avatar, access_token: accessToken, _id: id } = data
      set({
        currentUser: {
          id,
          name,
          surname,
          avatar,
          accessToken,
        },
        isLoggedIn: true,
        isLoading: false,
      })
    } catch (error) {
      console.error('Sign up failed:', error)
    }
  },

  signIn: async (email, password) => {
    set({ isLoading: true })
    try {
      const { data } = await axiosPublic.post('/auth/login', {
        email,
        password,
      })
      const { name, surname, avatar, access_token: accessToken, _id: id } = data

      localStorage.setItem('token', accessToken)

      set({
        currentUser: {
          id,
          name,
          surname,
          avatar,
          accessToken,
        },
        isLoggedIn: true,
        isLoading: false,
      })
    } catch (error) {
      console.error('Sign in failed:', error)
    }
  },

  signOut: async () => {
    try {
      await axiosPublic.post('/auth/logout')

      localStorage.removeItem('token')
    } catch (error) {
      console.error('Sign in failed:', error)
    }

    set({ currentUser: null, isLoggedIn: false })
  },

  getUser: async () => {
    try {
      set({ isLoading: true })
      const token = localStorage.getItem('token')
      if (!token) {
        set({ isLoading: false })
        return
      }
      const { data } = await axiosPublic.get('/users/current')
      const { name, surname, avatar, access_token: accessToken, id } = data

      localStorage.setItem('token', accessToken)

      set({
        currentUser: {
          id,
          name,
          surname,
          avatar,
          accessToken,
        },
        isLoggedIn: true,
        isLoading: false,
      })
    } catch (error) {
      console.error('getUser failed:', error)
    }
  },

  updateUser: async (userData: IUserToUpdate) => {
    set({ isLoading: true })
    try {
      const { data } = await axiosPublic.put('/users', userData)
      const { name, surname, avatar, access_token: accessToken, _id: id } = data

      localStorage.setItem('token', accessToken)

      set({
        currentUser: {
          id,
          name,
          surname,
          avatar,
          accessToken,
        },
        isLoggedIn: true,
        isLoading: false,
      })
    } catch (error) {
      console.error('Sign in failed:', error)
    }
  },
}))
