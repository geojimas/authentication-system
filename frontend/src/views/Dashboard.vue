<template>
  <div v-if="auth" class="dashboard animate__animated animate__zoomIn">
    <h2>
      Welcome back <span>{{ UserName }}</span> !!
    </h2>
    <h2>Only Logged Users can watch this page</h2>
  </div>
</template>

<script>
import { computed, onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'
import Swal from 'sweetalert2'
import axios from 'axios'

export default {
  name: 'Home',
  setup() {
    const content = ref('You are not logged in!')
    const store = useStore()

    const UserName = computed(() => {
      return store.getters.getName
    })

    const auth = computed(() => store.state.authenticated)

    onBeforeMount(() => {
      axios
        .get('http://localhost:5000/dashboard', { withCredentials: true })
        .then(response => {
          content.value = response.data.message
          store.dispatch('setAuth', true)
        })
        .catch(error => {
          store.dispatch('setAuth', false)

          Swal.fire({
            title: 'error!',
            text: error.response.data.message,
            icon: 'error',
            confirmButtonText: 'OK',
          })
        })
    })

    return {
      UserName,
      auth,
    }
  },
}
</script>
