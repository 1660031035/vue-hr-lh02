export default {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    setToken(state, newToken) {
      state.token = newToken
    }
  },
  actions: {},
  getters: {}
}