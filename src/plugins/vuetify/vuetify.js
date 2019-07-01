import Vue from 'vue'
import Vuetify from 'vuetify'
import theme from './theme'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

/**
 * Exports Vuetify so that it can be used.
 */
Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme,
  customProperties: true
})