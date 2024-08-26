import axios from 'axios'

import { useAuthStore } from '../store'

const BASE_URL = 'https://chat-be-nine.vercel.app/api/'

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const getAccessToken = () => {
  const { currentUser } = useAuthStore.getState()
  if (!currentUser) return JSON.stringify(localStorage.getItem('token'))
  return currentUser?.accessToken
}

axiosPublic.interceptors.request.use(
  config => {
    const accessToken = getAccessToken()

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)
