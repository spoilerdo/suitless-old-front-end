import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Surveys from '../views/surveys/Survey.vue';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/dashboard',
      name: 'Home',
      component: Dashboard,
      icon: 'mdi-view-dashboard'
    },
    {
      path: '/surveys',
      name: 'Surveys',
      component: Surveys
    },
    {
      path: '/about',
      name: 'About',
      icon: 'mdi-view-dashboard'
    }
  ],
  mode: 'history'
})
