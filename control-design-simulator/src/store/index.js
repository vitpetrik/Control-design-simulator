import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    theme: "Dark theme",
  },
  getters: {
    theme(state) {
      return state.theme
    }
  },
  mutations: {
    theme(state, payload) {
      state.theme = payload
    }
  }
})
export default store