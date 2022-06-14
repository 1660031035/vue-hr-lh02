import PageTools from '@/components/PageTools/index.vue'

// excel导入组件
import UploadExcel from '@/components/UploadExcel'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    // 注册UploadExcel组件
    Vue.component('UploadExcel', UploadExcel)
  }
}
