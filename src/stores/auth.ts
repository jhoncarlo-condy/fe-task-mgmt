import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<{ email: string; user_type: number } | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  function login(payload: { token: string; user: { email: string; user_type: number } | null }) {
    token.value = payload.token
    user.value = payload.user

    localStorage.setItem('token', payload.token)
    localStorage.setItem('user', JSON.stringify(payload.user))
  }

  function logout() {
    token.value = null
    user.value = null

    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  function loadStoredAuth() {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser) {
      token.value = storedToken
      user.value = JSON.parse(storedUser)
    }
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
    loadStoredAuth,
  }
})
