<template>
  <main>
    <NavBar />
    <RouterView />
    <FooTerVue />
  </main>
</template>

<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import FooTerVue from './components/FooTer.vue'
</script>
