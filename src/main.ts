import Vue from 'vue'
import '@/plugins/vue-rx'
import '@/plugins/vuetify'
import App from '@/App.vue'
import router from '@/plugins/router'
import store from '@/plugins/store'
import i18n from '@/plugins/i18n'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
