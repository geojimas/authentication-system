import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    authenticated: false,
    UserData: {},
  },
  mutations: {
    SET_AUTH: (state, payload) => (state.authenticated = payload),
    SET_USER: (state, payload) => (state.UserData = payload),
  },
  actions: {
    setAuth: ({ commit }, payload) => commit('SET_AUTH', payload),
    setUser: ({ commit }, payload) => commit('SET_USER', payload),
  },
  getters: {
    getUser(state) {
      return state.UserData
    },
    getIfIsAuth(state) {
      return state.authenticated
    },
  },
  plugins: [createPersistedState()],
})