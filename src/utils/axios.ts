import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const apiUrl = import.meta.env.VITE_APP_API_BASE_URL

export const AxiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

AxiosInstance.interceptors.request.use((config) => {
  const auth = useAuthStore()

  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`
  }

  return config
})
