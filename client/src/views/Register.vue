<template>
  <div class="register animate__animated animate__fadeIn">
    <form @submit.prevent="submit">
      <h2>Sign up</h2>

      <div class="controls">
        <input type="text" v-model="data.name" name="name" required placeholder="Name" />
      </div>
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
      <button>Sign up</button>
      <div class="acc">
        <p>
          Already have an Account ??
          <router-link to="/login" class="navbar-brand"> Log in</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useStore } from 'vuex'
import { client } from '../utils/config'

export default {
  name: 'Register',
  setup() {
    const data = reactive({
      name: '',
      email: '',
      password: '',
    })
    const result = ref('')
    const router = useRouter()
    const store = useStore()
    const toast = useToast()

    const submit = () => {
      client
        .post('register', {
          name: data.name,
          email: data.email,
          password: data.password,
        })
        .then(response => {
          result.value = response.data.User
          store.dispatch('setUser', result.value)
          router.push('/login')

          toast.success('User Register Successfully', {
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
