import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home'
import SignIn from '../components/SignIn'
import ProtectedResource from '../components/ProtectedResource'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'Home',
      path: '/',
      component: Home
    },
    {
      name: 'SignIn',
      path: '/sign_in',
      component: SignIn
    },
    {
      name: 'ProtectedResource',
      path: '/protected',
      component: ProtectedResource
    }
  ]
})
