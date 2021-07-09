import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"

export default createStore({
    state: {
        authenticated: false,
        userName: ''
    },
    mutations: {
        SET_AUTH: (state, payload) => state.authenticated = payload,
        SET_NAME: (state, payload) => state.userName = payload
    },
    actions: {
        setAuth: ({ commit }, payload) => commit('SET_AUTH', payload),
        setName: ({ commit }, payload) => commit('SET_NAME', payload)
    },
    getters: {
        getName(state) {
            return state.userName
        },
        getIfIsAuth(state) {
            return state.authenticated
        }
    },
    plugins: [createPersistedState()]
})