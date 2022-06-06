// 设置路由导航守卫
// to: 要去那个页面
// from: 来自那个页面
// next: 它是一个函数
// 直接放行 next()
// 跳到其他页 next('页面路径')
import router from "./router"
import store from '@/store'
router.beforeEach((to, from, next) =>  {
  // console.log(to, from, '去哪里以及来自哪里')
  const token = store.state.user.token
  console.log(token,'路由导航')
  // next()
  // 判断是否有token
  if(token) {
    // 判断是否去登录页
    if(to.path === '/login') {
      // 回到主页
      next('/')
    } else {
      next()
    }
  } else {
    // 没有token
    // 是否去白名单
    if(to.path === '/login') {
      // 放行
      next()
    }else {
      next('/login')
    }
  }
})