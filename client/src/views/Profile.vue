<template>
  <div v-if="auth" class="profile animate__animated animate__zoomIn">
    <div>
      <img src="../assets/prof.png" width="250" alt="profile" />
    </div>
    <div class="info">
      <p>
        Name:<span>{{ user.name }}</span>
      </p>
      <p>
        Email:<span>{{ user.email }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Profile',
  setup() {
    const store = useStore()
    const auth = computed(() => store.getters.getIfIsAuth)
    const user = computed(() => store.getters.getUser)

    return {
      auth,
      user,
    }
  },
}
</script>
