import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import router from './router'
import store from '@/store'
// 引入所有的动态路由表
import { asyncRoutes8 } from '@/router'
// 引入工具方法
import getPageTitle from '@/utils/get-page-title'
// 白名单数组
const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  const token = store.state.user.token
  if (token) {
    if (to.path === '/login') {
      // 有token，还去登录 ---> 直接去主页
      // console.log('有token，还去登录 ---> 直接去主页')
      next('/')
      NProgress.done()
    } else {
      // 判断是否有userId再去发请求
      // 没有就获取,有就不用获取
      // 1. 获取个人信息
      const userInfo = store.state.user.userInfo
      if (!userInfo.userId) {
        // 如果没有就获取
        console.log('请求个人信息')
        await store.dispatch('user/getUserInfo')

        const menus = await store.dispatch('user/getUserInfo')
        console.log(menus, '当前用户能够访问的权限')
        console.log(asyncRoutes8, '所有的动态路由权限')
        // 筛选出用户的权限includes(menus)
        const routesFilter = asyncRoutes8.filter(item => {
          // console.log(item)
          const name = item.children[0].name
          // console.log(name, '筛选过后')
          return menus.includes(name)
        })
        routesFilter.push(
          { path: '*', redirect: '/404', hidden: true }
        )
        router.addRoutes(routesFilter)
        store.commit('menu/updateMenuList', routesFilter)
        next({
          ...to, // next({ ...to })的目的,是保证路由添加完了再进入页面 (可以理解为重进一次)
          replace: true // 重进一次, 不保留重复历史
        })
      } else {
        next()
      }
    }
  } else {
    // 没有token，只能访问白名单
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // console.log('没有token，只能访问白名单')
      next('/login')
      NProgress.done()
    }
    // whiteList.includes(to.path) ? next() : next('/login')
  }
  // console.log(token, '路由跳转', from.path, '----->', to.path)
})

// 可以创建多个路由守卫
router.beforeEach((to, from, next) => {
  console.log(to)
  // 调用getPageTitle()方法
  document.title = getPageTitle(to.meta.title)
  next()
})

router.afterEach(() => {
  NProgress.done()
})
