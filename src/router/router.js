import Vue from 'vue'
import Router from 'vue-router'
import Landingpage from '../views/landingpages/Landingpage'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/login/Login';
import Surveys from '../views/landingpages/SurveysLanding';
import Survey from '../views/survey/Survey.vue';
import FlowchartEditor from '../views/flowchartEditor/FlowchartEditor';
import LoginLanding from '@/views/landingpages/LoginLanding';

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
      path: '/survey/:surveyID',
      name: 'Survey',
      component: Survey,
      props: true
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
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
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
