<template>
  <div class="employees-container">
    <div class="app-container">
      <page-tools>
        <!-- 插入到left插槽位置 -->
        <template #left>
          <span>本月: 社保在缴 公积金在缴</span>
        </template>
        <!-- 插入到right插槽位置 -->
        <template #right>
          <el-button type="warning" size="small">导入excel</el-button>
          <el-button type="danger" size="small">导出excel</el-button>
          <el-button type="primary" size="small">新增员工</el-button>
        </template>
      </page-tools>

      <el-card style="margin-top: 10px;">
        <el-table border :data="list">
          <el-table-column label="序号" type="index" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="工号" prop="workNumber" />
          <el-table-column label="聘用形式" prop="formOfEmployment">
            <template slot-scope="scope">
              {{ format(scope.row.formOfEmployment) }}
            </template>
          </el-table-column>
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" prop="timeOfEntry" />
          <el-table-column label="操作" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">分配角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <!-- 分页效果
          @size-change 每页几条 改变执行
          @current-change 翻页时执行回调
          -->
          <el-pagination
            layout="sizes, prev, pager, next"
            :total="total"
            :current-page="page"
            :page-sizes="[10,15,20,25]"
            :page-size="pagesize"
            @size-change="hSizeChange"
            @current-change="hcurrentchange"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getEmployeeList } from '@/api/employees'
// 枚举
import { TYPE_MAP } from '@/constant/employees'
export default {
  data() {
    return {
      list: [],
      page: 1,
      pagesize: 10,
      total: 0
    }
  },
  created() {
    this.loadEmployee()
  },
  methods: {
    format(type) {
      return TYPE_MAP[type] || '未知'
    },
    // 翻页时执行
    hSizeChange(newPage) {
      this.pagesize = newPage
      this.loadEmployee()
      this.page = 1
    },
    // 每页几条, 改变时执行
    hcurrentchange(curPage) {
      this.page = curPage
      this.loadEmployee()
    },
    async loadEmployee() {
      const res = await getEmployeeList(this.page, this.pagesize)
      console.log(res.data, '员工信息')
      this.list = res.data.rows
      this.total = res.data.total
    }
  }
}
</script>
