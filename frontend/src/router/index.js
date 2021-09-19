import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import { computed } from 'vue'
import Home from '../views/Home.vue'

const auth = computed(() => store.getters.getIfIsAuth)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    beforeEnter: (_to, _from, next) => {
      if (!auth.value) next({ name: 'Login' })
      else next()
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    beforeEnter: (_to, _from, next) => {
      if (!auth.value) next({ name: 'Login' })
      else next()
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    beforeEnter: (_to, _from, next) => {
      if (auth.value) next({ name: 'Dashboard' })
      else next()
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    beforeEnter: (_to, _from, next) => {
      if (auth.value) next({ name: 'Dashboard' })
      else next()
    },
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: () => import('../views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
