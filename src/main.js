import Vue from 'vue'
import VueParticles from 'vue-particles'
import VeeValidate from 'vee-validate'
import pdfreporter from './plugins/pdfreporter/pdfreporter'
import flowchartEditor from './plugins/flowchartEditor/flowchartEditor';


import './plugins/vuetify/vuetify'
import App from './App.vue'
import store from './store/store'
import router from './router/router'
import {setToken} from '@/api/api'

Vue.config.productionTip = false
Vue.use(VueParticles)
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
