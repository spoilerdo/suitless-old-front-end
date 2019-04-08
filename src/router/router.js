import Vue from 'vue'
import Router from 'vue-router'
import Landingpage from '../views/landingpage/Landingpage'
import Login from '../views/login/Login';
import Cdn from '../views/cdn/Cdn';
import Surveys from '../views/surveys/Surveys.vue';

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
      path: '/surveys',
      name: 'Surveys',
      component: Surveys
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/cdn',
      name: 'Cdn',
      component: Cdn
    },
    {
      path: '/about',
      name: 'About',
      icon: 'mdi-view-dashboard'
    }
  ],
  mode: 'history'
})
