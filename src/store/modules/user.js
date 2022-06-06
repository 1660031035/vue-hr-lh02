import { getToken, setToken } from "@/utils/auth"
// 导入封装的函数
import { login } from "@/api/user"
// 代码优化: 在vuex中的action中发登录请求
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
  actions: {
    async userLogin(context, data) {
      // 用户登录
      const res = await login(data)
      // console.log(res.data) // 获取token
      context.commit('setToken', res.data)
    }
  },
  getters: {}
}