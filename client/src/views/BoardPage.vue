<template>
  <div v-if="isAuth" class="mt-28 animate__animated animate__zoomIn">
    <div class="flex items-center justify-center">
      <div class="bg-slate-700 rounded-xl m-16 border">
        <div class="flex flex-col p-10 px-16 space-y-6 items-center text-center">
          <h1 class="font-light md:text-6xl text-5xl text-white tracking-wide">
            Welcome <span class="text-red-600">{{ user.name }}</span> !!
          </h1>
          <p class="text-gray-400 md:text-2xl text-xl px-18">
            You are logged In !! Only Logged Users can watch this page.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import { userStore } from '../stores/user'
import { useToast } from 'vue-toastification'
import { api } from '../../utils/axios'

const content = ref('You are not logged in!')
const store = userStore()
const toast = useToast()
const isAuth = computed(() => store.isLoggedIn)
const user = computed(() => store.userInfo)

onBeforeMount(() => {
  api
    .get('/dashboard')
    .then(response => {
      content.value = response.data.message
    })
    .catch(error => {
      console.log(error)
      toast.error(`${error.response.data.message}`, {
        timeout: 2000,
        position: 'top-center',
        icon: true
      })
    })
})
</script>
