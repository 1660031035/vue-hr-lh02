// 设置路由导航守卫
// to: 要去那个页面
// from: 来自那个页面
// next: 它是一个函数
// 直接放行 next()
// 跳到其他页 next('页面路径')
import router from "./router"
import store from '@/store'
// 导入路由导航守卫跳转进度条
import Nprogress from "nprogress"
import 'nprogress/nprogress.css' 
// 两个API
// Nprogress.start() 启动进度条
// Nprogress.done() 进度条结束
// 设置白名单
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) =>  {
  // 启动进度条
  Nprogress.start()
  // console.log(to, from, '去哪里以及来自哪里')
  const token = store.state.user.token
  console.log(token,'路由导航')
  // next()
  // 判断是否有token
  if(token) {
    // 判断是否去登录页
    if(whiteList.includes(to.path)) {
      // 回到主页
      next('/')
      Nprogress.done()
    } else {
      next()
    }
  } else {
    // 没有token
    // 是否去白名单
    if(whiteList.includes(to.path)) {
      // 放行
      next()
      
    }else {
      next('/login')
      Nprogress.done()
    }
  }
})

router.afterEach(() => {
  Nprogress.done()
})