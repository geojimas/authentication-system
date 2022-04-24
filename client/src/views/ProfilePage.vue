<template>
  <div class="flex justify-center mt-32 animate__animated animate__fadeIn">
    <div class="align-middle rounded-3xl overflow-hidden shadow-xl max-w-xs my-3 bg-red-500">
      <img src="https://i.imgur.com/dYcYQ7E.png" class="w-full" />
      <div class="flex justify-center -mt-8">
        <img
          width="80"
          height="80"
          src="/prof.png"
          class="rounded-full border-solid border-white border-2 -mt-3" />
      </div>
      <div class="text-center px-3 pb-6 pt-2">
        <h3 class="text-white text-xl bold font-sans">Name : {{ user.name }}</h3>
        <p class="mt-2 text-xl font-light text-white">Email: {{ user.email }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { userStore } from '../stores/user'

const store = userStore()
const user = computed(() => store.userInfo)
console.log(user)
</script>
