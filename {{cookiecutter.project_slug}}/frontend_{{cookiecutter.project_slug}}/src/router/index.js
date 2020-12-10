import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store/'

import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'

const ifAuthenticated = (to, from, next) => {
  if (!store.getters['auth/isAuthenticated']) {
    next()
    return
  }
  next('/')
}

const ifNotAuthenticated = (to, from, next) => {
  if (store.getters['auth/isAuthenticated']) {
    next()
    return
  }
  next('/login')
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: ifAuthenticated,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
