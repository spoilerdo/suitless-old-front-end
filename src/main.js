import Vue from 'vue'
import VueParticles from 'vue-particles'
import VeeValidate from 'vee-validate'
import 'fullpage.js/vendors/scrolloverflow'
import VueFullPage from 'vue-fullpage.js'

import pdfreporter from './plugins/pdfreporter/pdfreporter'
import flowchartEditor from './plugins/flowchartEditor/flowchartEditor';
import notification from './plugins/notification/notification';


import './plugins/vuetify/vuetify'
import App from './App.vue'
import store from './store/store'
import router from './router/router'
import {setToken} from '@/api/api'

Vue.config.productionTip = false
Vue.use(VueParticles);
Vue.use(VeeValidate);
Vue.use(VueFullPage);

Vue.use(pdfreporter);
Vue.use(flowchartEditor);
Vue.use(notification)

if (localStorage.jwtToken) {
  //restore axios default header sessions
  setToken(localStorage.jwtToken);
}

export const VueInstance = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
