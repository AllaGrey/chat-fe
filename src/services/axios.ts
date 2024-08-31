import axios from 'axios'

import { useAuthStore } from '../store'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const getAccessToken = () => {
  const { currentUser } = useAuthStore.getState()
  if (!currentUser) return localStorage.getItem('token')
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
