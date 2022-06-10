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
                    <el-dropdown-item @click.native="hAdd('')">添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- 放置一个el-tree组件 -->
        <!-- default-expand-all 默认展开 -->
        <el-tree default-expand-all :data="data" :props="defaultProps">
          <template slot-scope="{ data }" class="custom-tree-node">
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
                        <el-dropdown-item @click.native="hAdd(data.id)">添加子部门</el-dropdown-item>
                        <el-dropdown-item @click.native="hEdit(data.id)">编辑部门</el-dropdown-item>
                        <el-dropdown-item v-if="data.children.length === 0" @click.native="hDel(data.id)">删除部门</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-tree>
        <el-dialog
          v-if="showDialog"
          :title="(isEdit ? '编辑' : '添加') + '部门'"
          :visible.sync="showDialog"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
        >
          <DeptDialog :origin-list="originList" :is-edit="isEdit" :pid="curId" @hCancel="hCancel" @success="hSuccess" />
        </el-dialog>
      </el-card>

    </div>
  </div>
</template>
<script>
import { getDepartments, delDepartment } from '@/api/departments'
import { toTreeList } from '@/utils'
// 引入弹框组件
import DeptDialog from './deptDialog.vue'
export default {
  components: { DeptDialog },
  data() {
    // 注册
    return {
      // 表单校验中的id,pid,name,code
      originList: [],
      // 检测是否处于编辑状态
      isEdit: false,
      curId: '',
      // 显示隐藏弹框
      showDialog: false,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'lable'
      }
    }
  },
  created() {
    this.loadDepartments()
  },
  methods: {
    async doDel(id) {
      await delDepartment(id)
      // 刷新列表
      this.loadDepartments()
      // 删除成功提示
      this.$message.success('删除成功')
    },
    // 删除部门
    hDel(id) {
      // 添加询问框
      this.$confirm('此操作将永久删除部门，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除
        this.doDel(id)
      }).catch(() => {})
    },
    async loadDepartments() {
      const res = await getDepartments()
      res.data.depts.shift()
      // console.log(res.data.depts)
      this.originList = res.data.depts.map(item => {
        return {
          id: item.id,
          pid: item.pid,
          name: item.name,
          code: item.code
        }
      })
      console.log(this.originList)
      // 调用提前封装好的根据函数来做格式转换
      this.data = toTreeList(res.data.depts)
    },
    // 点击取消关闭弹层
    hCancel() {
      this.showDialog = false
    },
    // 收到父组件的hSuccess事件
    hSuccess() {
      // 关闭弹层
      this.showDialog = false
      // 重新获取列表
      this.loadDepartments()
    },
    hAdd(id) {
      // 显示弹层
      this.showDialog = true
      // 更新当前点击的id
      this.curId = id
      // 2. isEdit变为false
      this.isEdit = false
    },
    hEdit(id) {
      // 1. 显示弹层
      this.showDialog = true
      // 2. isEdit变为true
      this.isEdit = true
      // 3. 更新当前点击的id
      this.curId = id
    }
  }
}
</script>
