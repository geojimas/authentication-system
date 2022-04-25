<template>
  <div class="flex justify-center mt-32 animate__animated animate__fadeIn">
    <div class="align-middle rounded-3xl shadow-xl my-3 bg-red-500">
      <div class="flex justify-center -mt-8">
        <img
          width="80"
          height="80"
          src="/prof.png"
          class="rounded-full border-solid border-white border-2 -mt-3" />
      </div>
      <div class="text-center px-3 pb-6 pt-2 text-white font-bold text-xl">
        <h3>Name : {{ user.name }}</h3>
        <p>Email: {{ user.email }}</p>
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
