import { getToken, setToken } from "@/utils/auth"

export default {
  namespaced: true,
  state: {
    // 本地取token, 如果有取,没有就为空
    token: getToken() || ''
  },
  mutations: {
    setToken(state, newToken) {
      state.token = newToken
      // 本地储存token
      setToken(newToken)
    }
  },
  actions: {},
  getters: {}
}