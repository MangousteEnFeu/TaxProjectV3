import { defineStore } from 'pinia'
import api from '../services/api'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        user: null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        async login(credentials) {
            const response = await api.post('/accounts/login/', credentials)
            this.token = response.data.access
            localStorage.setItem('token', this.token)
            await this.fetchUser()
        },
        async fetchUser() {
            if (this.token) {
                try {
                    const response = await api.get('/accounts/profile/')
                    this.user = response.data
                } catch (error) {
                    this.logout()
                }
            }
        },
        logout() {
            this.token = null
            this.user = null
            localStorage.removeItem('token')
        }
    }
})
