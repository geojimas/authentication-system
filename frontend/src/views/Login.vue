<template>
  <div class="login animate__animated animate__fadeIn">
    <form @submit.prevent="submit">
      <h2>Login</h2>
      <div class="controls">
        <input type="email" v-model="data.email" name="email" required placeholder="email" />
      </div>
      <div class="controls">
        <input
          type="password"
          v-model="data.password"
          name="password"
          required
          placeholder="password"
        />
      </div>
      <button>login</button>
      <div class="acc">
        <p>
          Don't have an Account ??
          <router-link to="/register" class="navbar-brand"> Sign up</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useToast } from 'vue-toastification'

export default {
  name: 'Login',
  setup() {
    const data = reactive({
      email: '',
      password: '',
    })
    const router = useRouter()
    const store = useStore()
    const toast = useToast()

    const submit = () => {
      axios
        .post(
          'http://localhost:5000/api/login',
          {
            email: data.email,
            password: data.password,
          },
          { withCredentials: true }
        )
        .then(response => {
          store.dispatch('setAuth', true)
          store.dispatch('setUser', response.data.User)
          router.push('/dashboard')

          toast.success(`${response.data.message}`, {
            timeout: 3000,
            position: 'top-center',
            icon: true,
          })
        })
        .catch(error => {
          toast.error(`${error.response.data.message}`, {
            timeout: 3000,
            position: 'top-center',
            icon: true,
          })
        })
    }

    return {
      data,
      submit,
    }
  },
}
</script>
