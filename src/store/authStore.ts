import { create } from 'zustand'

import { axiosPublic } from '../services'

interface IUser {
  id: string
  name: string
  surname: string
  accessToken: string
}

interface IUserToUpdate {
  name: string
  surname: string
}

interface IUserState {
  currentUser: IUser | null
  isLoggedIn: boolean
  signUp: (userData: any) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
  updateUser: (data: IUserToUpdate) => Promise<void>
  getUser: () => void
}

export const useAuthStore = create<IUserState>(set => ({
  currentUser: null,
  isLoggedIn: false,

  signUp: async userData => {
    try {
      const { data } = await axiosPublic.post('/auth/register', userData)
      const { name, surname, access_token: accessToken, _id: id } = data
      set({
        currentUser: {
          name,
          surname,
          id,
          accessToken,
        },
        isLoggedIn: true,
      })
    } catch (error) {
      console.error('Sign up failed:', error)
    }
  },

  signIn: async (email, password) => {
    try {
      const { data } = await axiosPublic.post('/auth/login', {
        email,
        password,
      })
      const { name, surname, access_token: accessToken, _id: id } = data

      localStorage.setItem('token', accessToken)

      set({
        currentUser: {
          name,
          surname,
          id,
          accessToken,
        },
        isLoggedIn: true,
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
      if (!localStorage.getItem('token')) return
      const { data } = await axiosPublic.get('/users/current')
      const { name, surname, access_token: accessToken, _id: id } = data

      localStorage.setItem('token', accessToken)

      set({
        currentUser: {
          name,
          surname,
          id,
          accessToken,
        },
        isLoggedIn: true,
      })
    } catch (error) {
      console.error('Sign in failed:', error)
    }
  },

  updateUser: async (userData: IUserToUpdate) => {
    try {
      const { data } = await axiosPublic.put('/users', userData)
      const { name, surname, access_token: accessToken, _id: id } = data

      localStorage.setItem('token', accessToken)

      set({
        currentUser: {
          name,
          surname,
          id,
          accessToken,
        },
        isLoggedIn: true,
      })
    } catch (error) {
      console.error('Sign in failed:', error)
    }
  },
}))
