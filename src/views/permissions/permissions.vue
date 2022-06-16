<template>
  <div class="permission-container">
    <div class="app-container">
      <!-- 表格 -->
      <el-card>
        <div style="text-align: right; margin-bottom: 20px">
          <el-button type="primary" size="small">添加权限</el-button>
        </div>
        <el-table border :data="list" row-key="id">
          <el-table-column label="名称" prop="name" />
          <el-table-column label="标识" prop="code" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <template>
              <el-button type="text">添加</el-button>
              <el-button type="text">编辑</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
// 增删改查api
import { getPermissionList, getPermissionDetail, addPermission, updatePermission, delPermission } from '@/api/permission'
// 转化为树形api
import { toTreeList } from '@/utils'
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.loadPermissionList()
  },
  methods: {
    async loadPermissionList() {
      const res = await getPermissionList({ page: 1, pagesize: 100 })
      console.log(res)
      this.list = toTreeList(res.data)
    }
  }
}
</script>
