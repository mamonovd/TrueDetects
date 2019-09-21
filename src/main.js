import Vue from 'vue'
import App from '@/App'
import router from '@/config/router'
import store from '@/store'
import i18n from '@/config/i18n'

import vuetify from '@/plugins/vuetify'

Vue.config.productionTip = false

// eslint-disable-next-line
Vue.prototype.$log = console.log.bind(console)

new Vue({
  vuetify,
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
