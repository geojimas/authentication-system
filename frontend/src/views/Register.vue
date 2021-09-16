<template>
  <div class="register animate__animated animate__zoomIn">
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
import Swal from 'sweetalert2'
import axios from 'axios'
import { useStore } from 'vuex'

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

    const submit = () => {
      axios
        .post('http://localhost:5000/register', {
          name: data.name,
          email: data.email,
          password: data.password,
        })
        .then(response => {
          result.value = response.data.User
          store.dispatch('setUser', result.value)
          router.push('/login')

          Swal.fire({
            title: 'Success!',
            text: 'User Register Successfully',
            icon: 'success',
            confirmButtonText: 'OK',
          })
        })
        .catch(error => {
          console.log(error)
          Swal.fire({
            title: 'error!',
            text: error.response.data.message,
            icon: 'error',
            confirmButtonText: 'OK',
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
