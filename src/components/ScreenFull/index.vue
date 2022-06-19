<template>
  <!-- 放置一个图标 -->
  <div style="display:inline-block">
    <svg-icon :icon-class="isScreen ? 'fullscreen' : 'exit-fullscreen'" class="fullscreen" @click="changeScreen" />
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'ScreenFull',
  data() {
    return {
      isScreen: true
    }
  },
  methods: {
    changeScreen() {
      // 调用screenfull的方法
      // screenfull是插件，它自带事件监听 on
      // screenfull.isFullscreen ：插件自带的属性，表示当前是否处于全屏状态

      screenfull.toggle()
      screenfull.on('change', () => {
        console.log('状态改变', screenfull.isFullscreen)
        this.isScreen = !screenfull.isFullscreen
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.fullscreen {
  width: 20px;
  height: 20px;
  color: #fff;
  cursor: pointer;
}
</style>
