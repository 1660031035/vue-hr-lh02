// 设置路由导航守卫
// to: 要去那个页面
// from: 来自那个页面
// next: 它是一个函数
// 直接放行 next()
// 跳到其他页 next('页面路径')
import router from "./router"
router.beforeEach((to, from, next) =>  {
  console.log(to, from, '去哪里以及来自哪里')
  next()
})