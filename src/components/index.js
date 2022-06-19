import PageTools from '@/components/PageTools/index.vue'
// excel导入组件
import UploadExcel from '@/components/UploadExcel'
// 图片上传组件
import UploadImg from '@/components/UploadImg'
// 头像组件
import ImageHolder from '@/components/ImageHolder'
// 切换语言组件
import Lang from '@/components/Lang'
// 全屏组件
import ScreenFull from '@/components/ScreenFull'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    // 注册导入Excel组件
    Vue.component('UploadExcel', UploadExcel)
    // 注册图片上传组件
    Vue.component('UploadImg', UploadImg)
    Vue.component('ImageHolder', ImageHolder) // 头像组件
    Vue.component('Lang', Lang) // 切换语言组件
    Vue.component('ScreenFull', ScreenFull) // 全屏组件
  }
}
