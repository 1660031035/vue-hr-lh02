<template>
  <!-- // 分配角色 -->
  <div>
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <div style="margin-top: 20px; text-align: right">
      <el-button type="primary" @click="hSubmit">确定</el-button>
      <el-button @click="closeDialog">取消</el-button>
    </div>
  </div>
</template>
<script>
// 保存分配权限
import { assignRoles } from '@/api/employees'
import { getAssignRoles } from '@/api/setting'
// 获取某个员工信息
import { getUserDetailById } from '@/api/user'
export default {
  props: {
    curId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      roleIds: [],
      list: []
    }
  },
  created() {
    this.loadRoles()
    this.loadUserDetailById()
  },
  methods: {
    // 保存权限
    async doAdd() {
      await assignRoles({ id: this.curId, roleIds: this.roleIds })
      // 关闭弹框
      this.$emit('close')
      // 成功提示
      this.$message.success('修改成功')
    },
    hSubmit() {
      this.doAdd()
    },
    // 数据回填
    async loadUserDetailById() {
      const res = await getUserDetailById(this.curId)
      this.roleIds = res.data.roleIds
    },
    async loadRoles() {
      const res = await getAssignRoles({ page: 1, pagesize: 100 })
      this.list = res.data.rows
    },
    closeDialog() {
      this.$emit('close')
    }
  }
}
</script>
