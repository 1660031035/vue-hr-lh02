<template>
  <div>
    <!--
show-checkbox: 显示选择框
check-strictly: 关闭父子关联
default-expand-all: 默认展开
node-key="id": 数据回填必须的属性
-->
    <el-tree
      ref="tree"
      :data="list"
      :props="{ label: 'name' }"
      show-checkbox
      check-strictly
      default-expand-all
      node-key="id"
    />
    <el-button @click="hClose">取消</el-button>
    <el-button type="primary" @click="hSubmit">确定</el-button>
  </div>

</template>

<script>
// 导入获取角色权限详情api和给角色分配权限的api
import { getRoleDetail, assignPerm } from '@/api/setting'
// 导入树形结构
import { toTreeList } from '@/utils'
// 导入权限点列表api
import { getPermissionList } from '@/api/permission'
export default {
  name: 'AssignPermissionVue',
  props: {
    rolesId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    this.loadPermissionList()
    this.loadRoleDetail()
  },
  methods: {
    // 保存权限
    async hSave() {
      // 获取当前角色的permIds
      const permIds = this.$refs.tree.getCheckedKeys()
      await assignPerm({ id: this.rolesId, permIds })
      // 关闭弹框
      this.$emit('close')
      // 成功提示
      this.$message.success('修改成功')
    },
    hSubmit() {
      this.hSave()
    },
    // 角色权限详情
    async loadRoleDetail() {
      const res = await getRoleDetail(this.rolesId)
      // console.log(res.data)
      this.$refs.tree.setCheckedKeys(res.data.permIds)
    },
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
