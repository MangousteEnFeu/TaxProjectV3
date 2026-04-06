import { defineStore } from 'pinia'
import api from '../services/api'

export const useDeclarationStore = defineStore('declaration', {
    state: () => ({
        declarations: [] as any[],
        currentDeclaration: null as any,
    }),
    actions: {
        async fetchDeclarations() {
            const response = await api.get('/declarations/list/')
            this.declarations = response.data.results
        },
        async fetchDeclaration(id: string) {
            const response = await api.get(`/declarations/list/${id}/`)
            this.currentDeclaration = response.data
        },
        async createDeclaration(data: any) {
            const response = await api.post('/declarations/list/', data)
            this.declarations.push(response.data)
            return response.data
        }
    }
})
