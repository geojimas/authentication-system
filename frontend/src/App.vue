<template>
  <main>
    <Nav />
    <router-view />
    <Footer />
  </main>
</template>

<script>
import Nav from '@/components/Nav'
import Footer from '@/components/Footer.vue'
export default {
  components: {
    Nav,
    Footer,
  },
}
</script>
