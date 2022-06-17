<template>
  <div>
    <!--
show-checkbox: 显示选择框
check-strictly: 关闭父子关联
default-expand-all: 默认展开
-->
    <el-tree
      :data="list"
      :props="{ label: 'name' }"
      show-checkbox
      check-strictly
      default-expand-all
    />
    <el-button @click="hClose">取消</el-button>
    <el-button type="primary">确定</el-button>
  </div>

</template>

<script>
// 导入树形结构
import { toTreeList } from '@/utils'
// 导入权限点列表api
import { getPermissionList } from '@/api/permission'
export default {
  name: 'AssignPermissionVue',
  data() {
    return {
      list: []
    }
  },
  created() {
    this.loadPermissionList()
  },
  methods: {
    // 权限点列表
    async loadPermissionList() {
      const res = await getPermissionList()
      console.log(res.data)
      this.list = toTreeList(res.data)
    },
    hClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>
