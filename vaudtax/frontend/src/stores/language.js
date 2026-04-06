import { defineStore } from 'pinia'
import { ref } from 'vue'
import { TRANSLATIONS } from '../constants/translations'

export const useLanguageStore = defineStore('language', () => {
    const language = ref(localStorage.getItem('app_language') || 'fr')

    const setLanguage = (lang) => {
        language.value = lang
        localStorage.setItem('app_language', lang)
    }

    const t = (path) => {
        const keys = path.split('.')
        let value = TRANSLATIONS[language.value]

        for (const key of keys) {
            if (value && value[key]) {
                value = value[key]
            } else {
                // Fallback to French if translation missing
                let fallback = TRANSLATIONS['fr']
                for (const k of keys) {
                    if (fallback && fallback[k]) fallback = fallback[k]
                    else return path
                }
                return fallback || path
            }
        }
        return value
    }

    return { language, setLanguage, t }
})
