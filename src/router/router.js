import Vue from 'vue'
import Router from 'vue-router'
import Landingpage from '../views/landingpage/Landingpage'
import Dashboard from '../views/Dashboard.vue'
import Surveys from '../views/surveys/Survey.vue';
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
      path: '/survey',
      name: 'Survey',
      component: Survey
    },
    {
      path: '/about',
      name: 'About',
      icon: 'mdi-view-dashboard'
    }
  ],
  mode: 'history'
})
