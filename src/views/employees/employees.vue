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
          <el-button type="warning" size="small" @click="$router.push('/import')">导入excel</el-button>
          <el-button type="danger" size="small" @click="hExport()">导出excel</el-button>
          <el-button type="primary" size="small" @click="showDialog = true">新增员工</el-button>
        </template>
      </page-tools>

      <el-card style="margin-top: 10px;">
        <el-table border :data="list" :default-sort="{ prop: 'timeOfEntry' }">
          <el-table-column label="序号" type="index" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="头像" prop="staffPhoto">
            <template slot-scope="scope">
              <image-holder :src="scope.row.staffPhoto" />
            </template>
          </el-table-column>
          <el-table-column label="工号" prop="workNumber" />
          <el-table-column label="聘用形式" prop="formOfEmployment">
            <template slot-scope="scope">
              {{ format(scope.row.formOfEmployment) }}
            </template>
          </el-table-column>
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" sortable prop="timeOfEntry" />
          <el-table-column label="操作" width="280">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="$router.push('/employees/detail?id='+scope.row.id)">查看</el-button>
              <el-button type="text" size="small">分配角色</el-button>
              <el-button type="text" size="small" @click="hDel(scope.row.id)">删除</el-button>
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
    <el-dialog
      v-if="showDialog"
      title="新增员工"
      :visible.sync="showDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <emp-dialog ref="AddEmployee" @update-empolyee="hUpdateEmpolyee" @close="showDialog=false" />
    </el-dialog>
  </div>
</template>
<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
// 引入子组件
import empDialog from './empDialog.vue'
// 枚举
import { TYPE_MAP } from '@/constant/employees'
export default {
  components: {
    empDialog
  },
  data() {
    return {
      // 点击按钮显示弹层
      showDialog: false,
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
    // 封装一个处理数据的函数
    formatData(rows) {
      // 提取英文的属性
      const enHeader = Object.keys(rows[0])
      const map = {
        'id': '编号',
        'password': '密码',
        'mobile': '手机号',
        'username': '姓名',
        'timeOfEntry': '入职日期',
        'formOfEmployment': '聘用形式',
        'correctionTime': '转正日期',
        'workNumber': '工号',
        'departmentName': '部门',
        'staffPhoto': '头像地址'
      }
      const header = enHeader.map(item => map[item])
      const data = rows.map(obj => {
        obj.formOfEmployment = TYPE_MAP[obj.formOfEmployment]
        return Object.values(obj)
      })
      return { header, data }
    },
    // 导出excel
    async hExport() {
      // 发请求拿数据
      const res = await getEmployeeList(this.page, this.pagesize)
      // 解构
      const { header, data } = this.formatData(res.data.rows)
      import('@/vendor/Export2Excel').then(excel => {
        // excel表示导入的模块对象
        console.log(excel)
        excel.export_json_to_excel({
          header, // 表头 必填
          data, // 具体数据 必填
          filename: '员工信息表', // 文件名称
          autoWidth: true, // 宽度是否自适应
          bookType: 'xlsx' // 生成的文件类型
        })
      })
    },
    // 添加成功
    hUpdateEmpolyee() {
      // 关闭弹框,刷新列表
      this.showDialog = false
      // 添加成功, 进入最后一页
      this.total++
      this.page = Math.ceil(this.total / this.pagesize)
      console.log('添加成功')
      this.loadEmployee()
    },
    async doDel(id) {
      await delEmployee(id)
      // 如果删除第最后一页的最一条数据之后，页面会显示不正常
      if (this.list.length === 1) {
        this.page--
        if (this.page <= 0) {
          this.page = 1
        }
      }
      // 刷新列表
      await this.loadEmployee()
      // 删除成功提示
      this.$message.success('删除成功')
    },
    hDel(id) {
      // 添加询问框
      this.$confirm('你确定要删除吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.doDel(id)
      }).catch(error => console.log(error))
    },
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
