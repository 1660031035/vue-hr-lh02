<template>
  <!-- el-image组件 ：https://element.eleme.io/#/zh-CN/component/image -->
  <el-image :src="src" class="img-container">
    <!-- error插槽：设置如果出错，要显示的内容 -->
    <template #error>
      <!-- 静态资源就近维护：把head.jpg这张图放在这个组件的目录下 -->
      <img src="./img.png" alt="">
    </template>
  </el-image>
</template>

<script>
export default {
  // 定义如何从父组件中接收数据
  props: {
    src: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
/* 设置图片样式
/deep/ 样式穿透
*/
.el-image /deep/ img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
