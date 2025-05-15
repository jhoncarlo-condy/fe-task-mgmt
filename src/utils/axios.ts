import axios from 'axios'
import Cookies from 'js-cookie'

const getToken = () => {
  return Cookies.get('token')
}
const apiUrl = import.meta.env.VITE_APP_API_BASE_URL

export const AxiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${getToken()}`,
    'Content-Type': 'application/json',
  },
})
