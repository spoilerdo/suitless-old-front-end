import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Dashboard,
      icon: 'mdi-view-dashboard'
    },
    {
      path: '/about',
      name: 'About',
      icon: 'mdi-view-dashboard'
    }
  ],
  mode: 'history'
})
