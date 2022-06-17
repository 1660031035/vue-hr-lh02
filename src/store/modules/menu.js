// 导入静态路由
import { constantRoutes } from '@/router'
export default {
  namespaced: true,
  state() {
    return {
      menuList: [...constantRoutes]
    }
  },
  mutations: {
    updateMenuList(state, asyncRoutes) {
      state.menuList = [...constantRoutes, ...asyncRoutes]
    }
  }
}
