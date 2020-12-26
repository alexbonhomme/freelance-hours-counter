import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  // {
  //   path: '/project-details',
  //   name: 'project-details',
  //   component: () => import('@/views/ProjectDetails.vue')
  // },
  {
    path: '/project-new',
    name: 'project-new',
    component: () => import('@/views/ProjectNew.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.name !== 'login' && !Vue.prototype.$gapi.isAuthenticated()) {
//     next({
//       name: 'login'
//     })
//   } else {
//     next()
//   }
// })

export default router
