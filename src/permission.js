import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import router from './router'
import store from '@/store'

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
        if(!userInfo.userId) {
          // 如果没有就获取
          console.log('请求个人信息')
          await store.dispatch('user/getUserInfo')
        }
        next()
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

router.afterEach(() => {
  NProgress.done()
})