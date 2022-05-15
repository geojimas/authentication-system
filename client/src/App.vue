<template>
  <main>
    <NavBar v-if="$route.path !== '/login' && $route.path !== '/register'" />
    <RouterView />
    <FooTerVue v-if="$route.path !== '/login' && $route.path !== '/register'" />
  </main>
</template>

<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import FooTerVue from './components/FooTer.vue'
</script>
