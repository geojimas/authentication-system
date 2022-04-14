<template>
  <div v-if="auth" class="dashboard animate__animated animate__zoomIn">
    <h1>
      Welcome <span>{{ user.name }}</span> !!
    </h1>
    <h1>You are logged In !!</h1>
    <h2>Only Logged Users can watch this page.</h2>
  </div>
</template>

<script>
import { computed, onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'
import { useToast } from 'vue-toastification'
import { client } from '../utils/config'

export default {
  name: 'Home',
  setup() {
    const content = ref('You are not logged in!')
    const store = useStore()
    const toast = useToast()
    const user = computed(() => store.getters.getUser)
    const auth = computed(() => store.getters.getIfIsAuth)

    onBeforeMount(() => {
      client
        .get('/dashboard')
        .then(response => {
          content.value = response.data.message
          store.dispatch('setAuth', true)
        })
        .catch(error => {
          store.dispatch('setAuth', false)

          toast.error(`${error.response.data.message}`, {
            timeout: 3000,
            position: 'top-center',
            icon: true,
          })
        })
    })

    return {
      user,
      auth,
    }
  },
}
</script>
