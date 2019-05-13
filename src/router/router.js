import Vue from 'vue'
import Router from 'vue-router'
import Landingpage from '../views/landingpage/Landingpage'
import Login from '../views/login/Login';
import Surveys from '../views/surveys/Surveys';
import Survey from '../views/survey/Survey.vue';
import FlowchartEditor from '../views/flowchartEditor/FlowchartEditor';
import LoginLanding from '@/views/landingpage/LoginLanding';
import Cdn from '../views/cdn/Cdn';
import Dashboard from '../views/Dashboard.vue'

Vue.use(Router)


let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Landingpage',
      component: Landingpage,
      meta: { requiresAuth: false, requiresAdmin: false }
    },
    {
      path: '/surveys',
      name: 'Surveys',
      component: Surveys,
      meta: { requiresAuth: false, requiresAdmin: false }
    },
    {
      path: '/survey/:surveyID',
      name: 'Survey',
      component: Survey,
      props: true,
      meta: { requiresAuth: true, requiresAdmin: false }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false, requiresAdmin: false }
    },
    {
      path: '/landingregister',
      name: 'Landing-Register',
      component: LoginLanding,
      meta: { requiresAuth: false, requiresAdmin: false }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      icon: 'mdi-view-dashboard',
      meta: { requiresAuth: true, requiresAdmin: false }
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
    },
    {
      path: '/flowchart',
      name: 'test',
      component: FlowchartEditor,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '*',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false, requiresAdmin: false }
    }
  ],
  mode: 'history'
}
)

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let jwtDecode = require("jwt-decode");
    try {
      let token = jwtDecode(localStorage.jwtToken);
      if (token != null) {
        if (to.matched.some(record => record.meta.requiresAdmin)) {
          let role = token["scopes"];
          if (role == "ADMIN") {
            next()
          }
          else {
            next({
              path: '/dashboard',
              query: { redirect: to.fullPath }
            })
          }
        }
        else {
          next()
        }
      }
    }
    catch{
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router;