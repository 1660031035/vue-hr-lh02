<template>
  <div class="department-container">
    <div class="app-container">
      <el-card>
          <!-- 用一个行列布局 -->
          <el-row type="flex" justify="space-between" align="middle" style="height: 40px">
            <el-col :span="20">
              <svg-icon icon-class="home" /><span>江苏传智播客教育科技股份有限公司</span>
            </el-col>
            <el-col :span="4">
              <el-row type="flex" justify="end">
                <!-- 两个内容 -->
                <el-col>负责人</el-col>
                <!-- 下拉菜单 element -->
                <el-col>
                  <el-dropdown>
                    <span>
                      操作<i class="el-icon-arrow-down" />
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>添加子部门</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <!-- 放置一个el-tree组件 -->
        <!-- default-expand-all 默认展开 -->
        <el-tree default-expand-all :data="data" :props="defaultProps">
        <template class="custom-tree-node" slot-scope="{ data }">
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
          style="height: 40px; width: 100%;"
        >
          <el-col :span="20">
            <svg-icon icon-class="home" /><span>{{ data.name }}</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <!-- 两个内容 -->
              <el-col>{{ data.manager }}</el-col>
              <!-- 下拉菜单 element -->
              <el-col>
                <el-dropdown>
                  <span> 操作<i class="el-icon-arrow-down" /> </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                    <el-dropdown-item>编辑部门</el-dropdown-item>
                    <el-dropdown-item>删除部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </template>
        </el-tree>
      </el-card>  
      
    </div>
  </div>
</template>
<script>
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
export default {
  data() {
      return {
        data: [],
        defaultProps: {
          children: 'children',
          label: 'lable'
        }
      };
    },
  created() {
    this.loadDepartments()
  },
  methods: {
    async loadDepartments() {
      const res = await getDepartments()
      res.data.depts.shift()
      console.log(res)
      // 调用提前封装好的根据函数来做格式转换
      this.data = tranListToTreeData(res.data.depts)
    }
  }
}

</script>