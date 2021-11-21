import { createStore } from 'vuex'

export default createStore({
  state: {
    test: 1,
  },
  getters: {
    getTest(state) {
      return state.test
    },
  },
  mutations: {
    addTest(state) {
      ++state.test
    },
  },
  actions: {},
  modules: {},
})
