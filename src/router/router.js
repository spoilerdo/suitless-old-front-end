import Vue from 'vue'
import Router from 'vue-router'
import Landingpage from '../views/landingpage/Landingpage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landingpage',
      component: Landingpage,
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
