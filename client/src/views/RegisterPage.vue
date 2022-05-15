<template>
  <div
    class="w-full mt-24 flex flex-col sm:justify-center items-center pt-6 sm:pt-0 animate__animated animate__fadeIn">
    <div class="w-full sm:max-w-md p-5 mx-auto">
      <h2 class="mb-12 text-center text-5xl font-extrabold">Register</h2>
      <form @submit.prevent="submit">
        <div class="mb-4">
          <label class="block mb-1" for="email">Name</label>
          <input
            type="text"
            name="name"
            required
            v-model="data.name"
            class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
        </div>
        <div class="mb-4">
          <label class="block mb-1" for="email">Email-Address</label>
          <input
            type="email"
            name="email"
            required
            v-model="data.email"
            class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
        </div>
        <div class="mb-4">
          <label class="block mb-1" for="password">Password</label>
          <input
            type="password"
            name="password"
            required
            v-model="data.password"
            class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
        </div>
        <div class="flex items-center">
          <input
            type="checkbox"
            checked
            class="border border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50" />
          <label for="remember_me" class="ml-2 block text-sm leading-5 text-gray-900">
            Remember me
          </label>
        </div>
        <div class="mt-6">
          <button
            class="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition">
            Register
          </button>
        </div>
        <div class="mt-6 text-center">
          Already have an Account ?
          <router-link to="/login" class="hover:underline"
            ><span class="font-bold">Login</span></router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { api } from '../../utils/axios'

const data = reactive({
  name: '',
  email: '',
  password: ''
})
const user = ref('')
const router = useRouter()
const toast = useToast()

const submit = () => {
  api
    .post('register', {
      name: data.name,
      email: data.email,
      password: data.password
    })
    .then(response => {
      user.value = response.data.user
      router.push('/login')
      toast.success(`user ${user.value.name} created successfully`, {
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
</script>
