import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    userInfo: {
      name: null,
      email: null
    }
  }),
  persist: {
    key: 'info',
    storage: window.localStorage,
    paths: ['isLoggedIn', 'userInfo']
  }
})
