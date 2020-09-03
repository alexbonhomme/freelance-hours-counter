import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from './components/Login.vue'
import Home from './components/Home.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !Vue.prototype.$gapi.isAuthenticated()) {
    next({
      name: 'login'
    })
  } else {
    next()
  }
})

export default router