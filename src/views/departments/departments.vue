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
      </el-card>  
      <!-- 放置一个el-tree组件 -->
        <el-tree :data="list"/>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 依赖一份树形数据
      list: [{
        label: '财务部',
        children: [
          {
            label: '财务核算部'
          },
          {
            label: '税务核算部'
          }
        ]
      }]
    }
  }
}
</script>