import { createI18n } from 'vue-i18n'
import fr from './messages/fr.json'
import de from './messages/de.json'
import it from './messages/it.json'
import en from './messages/en.json'
import pt from './messages/pt.json'
import sq from './messages/sq.json'
import hr from './messages/hr.json'
import rm from './messages/rm.json'

const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('locale') || 'fr',
    fallbackLocale: 'fr',
    messages: {
        fr, de, it, en, pt, sq, hr, rm
    }
})

export default i18n
