<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark header animate__animated animate__fadeIn">
    <div class="container-fluid">
      <div class="logo">
        <router-link to="/" class="nav-link"
          ><img src="../assets/logo.png" alt="logo" width="50"
        /></router-link>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div v-if="auth" class="user container">
          <h5>
            <span class="log">Logged in as :</span>
          </h5>
          <div class="log">
            Name:<span>{{ user.name }}</span>
          </div>
          <div class="log">
            Email:<span>{{ user.email }}</span>
          </div>
        </div>

        <div v-else class="container"></div>

        <!-- Navication Links -->
        <div v-if="auth" class="auth">
          <div class="links">
            <router-link to="/profile">Profile</router-link>
            <router-link to="/dashboard">Dashboard</router-link>
            <button @click="logout">Logout</button>
          </div>
        </div>
        <div v-else class="noAuth">
          <div class="links">
            <router-link to="/login">Login</router-link>
            <router-link to="/register">Register</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios'
import { useToast } from 'vue-toastification'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Nav',
  setup() {
    const store = useStore()
    const router = useRouter()
    const toast = useToast()
    const auth = computed(() => store.getters.getIfIsAuth)
    const user = computed(() => store.getters.getUser)

    const logout = () => {
      axios.get('http://localhost:5000/api/logout', { withCredentials: true }).then(response => {
        store.dispatch('setAuth', false)
        router.push('/')

        toast.success(`${response.data.message}`, {
          timeout: 3000,
          position: 'top-center',
          icon: true,
        })
      })
    }

    // Forced the page to Reload
    // window.location.reload()

    return {
      auth,
      logout,
      user,
    }
  },
}
</script>
