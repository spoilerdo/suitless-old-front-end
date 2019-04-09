import Vue from 'vue'
import Router from 'vue-router'
import Landingpage from '../views/landingpage/Landingpage'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/login/Login';
import Surveys from '../views/surveys/Surveys';
import Survey from '../views/survey/Survey.vue';
import FlowchartEditor from '../views/flowchartEditor/FlowchartEditor';
import LoginLanding from '@/views/landingpage/LoginLanding';

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
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/landingregister',
      name: 'Landing-Register',
      component: LoginLanding
    },
    {
      path: '/about',
      name: 'About',
      icon: 'mdi-view-dashboard'
    },
    {
      path: '/flowchart',
      name: 'test',
      component: FlowchartEditor
    }
  ],
  mode: 'history'
})
