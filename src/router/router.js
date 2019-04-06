import Vue from 'vue'
import Router from 'vue-router'
import Landingpage from '../views/landingpage/Landingpage'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/login/Login';
import cdn from '../views/cdn/cdn';
import Surveys from '../views/surveys/Surveys.vue';
import Survey from '../views/survey/Survey.vue';

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
      component: cdn
    },
    {
      path: '/about',
      name: 'About',
      icon: 'mdi-view-dashboard'
    }
  ],
  mode: 'history'
})
