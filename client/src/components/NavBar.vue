<template>
  <div class="bg-gray-900 text-gray-100 py-3.5 px-6 shadow md:flex justify-between">
    <router-link to="/" class="flex items-center">
      <img width="30" height="30" src="/logo.png" />
      <h1 class="text-xl">Gromet</h1>
    </router-link>
    <div v-if="isAuth" class="flex items-center justify-center">
      <div class="-space-x-4">
        <img
          class="relative z-30 inline object-cover w-12 h-12 border-2 border-white bg-white rounded-full"
          src="/avatar.png"
          alt="Profile image" />
        <div
          class="inline-flex items-center justify-center px-8 py-2 text-md font-bold leading-none text-red-100 bg-purple-700 rounded-full">
          {{ user.name }}
        </div>
      </div>
    </div>
    <div
      v-if="isAuth"
      class="md:flex md:items-center md:px-0 text-center md:pb-0 md:static bg-gray-900 md:w-auto w-full duration-500 ease-in">
      <div v-for="(link, index) in privateRoutes" :key="index" class="md:mx-4 md:my-0 my-4 text-xl">
        <router-link :to="link.link" class="hover:text-green-400 hover:underline">{{
          link.name
        }}</router-link>
      </div>
      <button
        @click="logout"
        class="inline-flex items-center justify-center py-1.5 px-4 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition">
        Logout
      </button>
    </div>
    <div
      v-else
      class="md:flex md:items-center md:px-0 text-center md:pb-0 md:static bg-gray-900 md:w-auto w-full duration-500 ease-in">
      <div v-for="(link, index) in publicRoutes" :key="index" class="md:mx-4 md:my-0 my-4 text-xl">
        <router-link
          :to="link.link"
          :class="{
            'hover:text-green-400 hover:underline': link.name === 'Login',
            'bg-green-400 hover:bg-green-600 duration-300 font-sm text-white rounded-md py-1.5 px-4 font-bold':
              link.name === 'Register'
          }"
          >{{ link.name }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { userStore } from '../stores/user'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { api } from '../../utils/axios'

const store = userStore()
const router = useRouter()

const isAuth = computed(() => store.isLoggedIn)
const user = computed(() => store.userInfo)

const toast = useToast()

const logout = () => {
  api
    .get('/logout')
    .then(response => {
      // clear pinia state
      store.$patch(state => {
        state.isLoggedIn = false
        state.userInfo = {
          name: null,
          email: null
        }
      })
      // clear the browser localStorage
      window.localStorage.clear()
      // redirect to Home
      router.push('/')
      // Notify
      toast.success(`${response.data.message}`, {
        timeout: 2000,
        position: 'top-center',
        icon: true
      })
    })
    .catch(error => {
      console.log(error)
      toast.error(`${error.response.data.message}`, {
        timeout: 2000,
        position: 'top-center',
        icon: true
      })
    })
}
// Forced the page to Reload
// window.location.reload()

const privateRoutes = reactive([
  { name: 'DashBoard', link: '/dashboard' },
  { name: 'Profile', link: '/profile' }
])

const publicRoutes = reactive([
  { name: 'Register', link: '/register' },
  { name: 'Login', link: '/login' }
])
</script>
