import Vue from 'vue'
import Vuetify from 'vuetify'
import './plugins/vuetify'
import App from './App.vue'
import store from './store/store'
import router from './router/router'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  iconfont: 'mdi'
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
