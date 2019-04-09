import Vue from 'vue'
import Vuetify from 'vuetify'
import VueParticles from 'vue-particles'
import VeeValidate from 'vee-validate'
import pdfreporter from './plugins/pdfreporter/pdfreporter'
import flowchartEditor from './plugins/flowchartEditor/flowchartEditor';


import './plugins/vuetify'
import App from './App.vue'
import store from './store/store'
import router from './router/router'
import '@mdi/font/css/materialdesignicons.css'
import {setToken} from '@/api/api'

Vue.config.productionTip = false
Vue.use(VueParticles)
Vue.use(Vuetify, {
  iconfont: 'mdi'
});
Vue.use(VeeValidate);
Vue.use(pdfreporter);
Vue.use(flowchartEditor);

if (localStorage.jwtToken) {
  //restore axios default header sessions
  setToken(localStorage.jwtToken);
}

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
