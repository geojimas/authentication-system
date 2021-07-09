<template>
  <nav class="header animate__animated animate__zoomIn">
    <div class="logo">
      <router-link to="/" class="nav-link"
        ><img src="../assets/logo.png" alt="logo" width="50"
      /></router-link>
    </div>
    <div class="actions">
      <div v-if="!auth" class="noAuth">
        <div class="links">
          <router-link to="/login" class="nav-link">Login</router-link>
          <router-link to="/register" class="nav-link">Register</router-link>
        </div>
      </div>
      <div v-if="auth" class="auth">
        <p>User :<span>{{ UserName }}</span></p>
        <div class="links">
          <router-link to="/dashboard" class="navbar-brand">Dashboard</router-link>
          <a href="#" class="nav-link" @click="logout">Logout</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Nav',
  setup() {
    const store = useStore()
    const router = useRouter()
    const auth = computed(() => store.state.authenticated)
    const UserName = computed(() => {
      return store.getters.getName
    })

    const logout = () => {
      axios.get('http://localhost:5000/logout', { withCredentials: true }).then(response => {
        store.dispatch('setAuth', false)
        router.push('/')
        Swal.fire({
          title: response.data.message,
          icon: 'success',
          confirmButtonText: 'OK',
        })
      })
    }

    // Forced Reload Page
    // window.location.reload()

    return {
      auth,
      logout,
      UserName,
    }
  },
}
</script>
