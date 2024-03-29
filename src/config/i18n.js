import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from '@/i18n/en-US'
//import ru from '@/i18n/ru-RU'

Vue.use(VueI18n)
export default new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en',
  messages: {
      en
  }
})
