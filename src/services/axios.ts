import axios from 'axios'

// import { store } from '../store'

const BASE_URL = 'https://chat-be-nine.vercel.app/api/'

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosPublic.interceptors.request.use(
  config => {
    // const state = store.getState()
    // const token = state.auth.token

    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`
    // }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)
