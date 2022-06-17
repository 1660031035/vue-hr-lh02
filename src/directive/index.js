// 注册一个全局自定义组件
import store from '@/store'
export default {
  install(Vue) {
    Vue.directive('allow', {
      // 当被绑定的元素插入到 DOM 中时inserted会自动执行
      inserted: function(el, binding) {
        // console.log(binding, 'binding')
        if (!store.state.user.userInfo.roles.points.includes(binding.value)) {
          el.remove()
        }
      }
    })
  }
}
