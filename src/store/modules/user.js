import { getToken, setToken } from "@/utils/auth"
// 导入封装的函数
import { login, getProfile, getUserInfo} from "@/api/user"
// 代码优化: 在vuex中的action中发登录请求
export default {
  namespaced: true,
  state: {
    // 本地取token, 如果有取,没有就为空
    token: getToken() || '',
    userInfo: {}
  },
  mutations: {
    setToken(state, newToken) {
      state.token = newToken
      // 本地储存token
      setToken(newToken)
    },
    setUserInfo(state, userInfo) {
      state.userInfo =  userInfo
      console.log(userInfo)
  },
  },
  actions: {
    async userLogin(context, data) {
      // 用户登录
      const res = await login(data)
      // console.log(res.data) // 获取token
      context.commit('setToken', res.data)
    },
    async getUserInfo(context) {
      // ajax获取数据
      const rs = await getProfile()
      console.log('用来获取用户信息的,', rs)
      context.commit('setUserInfo', rs.data)
      const rsInfo = await getUserInfo(rs.data.userId)
      const obj = {...rs.data, ...rsInfo.data}
      context.commit('setUserInfo', obj)
  },
  logout(context) {
    // 清空token和用户信息
    context.commit('setToken', '')
    context.commit('setUserInfo', {})
  },
  },
  getters: {}
}