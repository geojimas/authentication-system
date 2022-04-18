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
    meta: { requireAuth: true },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: { requireAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    beforeEnter: (to, _from, next) => {
      if (to.name === 'Login' && auth.value) next({ name: 'Home' })
      else next()
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    beforeEnter: (to, _from, next) => {
      if (to.name === 'Register' && auth.value) next({ name: 'Home' })
      else next()
    },
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: () => import('../views/NotFound.vue'),
  },
]

const Router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// Global Route Guard
Router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (auth.value) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default Router
