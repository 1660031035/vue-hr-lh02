<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height:60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="showDialog = true"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table :data="roles">
              <el-table-column type="index" :index="changeIndex" label="序号" width="120" />
              <el-table-column prop="name" label="角色名称" width="240" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary">编辑</el-button>
                  <el-button size="small" type="danger" @click="hDel(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <!-- 分页组件
                sizes: 显示页码
                :page-sizes: 切换每页条数
                :page-size: 每页显示几条
                :current-page: 当前的页码
                @current-page: 翻页时执行
                @size-change:切换每页条数时执行
              -->
              <el-pagination
                layout="sizes,prev,pager,next"
                :total="total"
                :page-sizes="[1,2,3,4]"
                :page-size="pagesize"
                :current-page="page"
                @current-change="hCurrentChange"
                @size-change="hSizeChange"
              />
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!-- 新增弹框 -->
      <el-dialog
        title="编辑弹层"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :visible.sync="showDialog"
      >
        <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="100px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name" />
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="roleForm.description" />
          </el-form-item>
        </el-form>
        <!-- 底部 -->
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small">取消</el-button>
            <el-button size="small" type="primary" @click="hSubmit">确定</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>
<script>
// 导入获取所有角色信息接口
import { getRoles, delRole, addRole } from '@/api/setting'
export default {
  data() {
    return {
      roles: [], // 传入表单的数据
      total: 0, // 数据总条数
      page: 1, // 当前页码
      pagesize: 2, // 每页条数
      showDialog: false, // 弹框显示隐藏
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
        description: [{ required: true, message: '角色描述不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.loadRole()
  },
  methods: {
    hSave() {
      this.$refs.roleForm.validate(valid => {
        if (valid) {
          this.doAdd
        }
      })
    },
    async doAdd() {
      await addRole(this.roleForm)
      // console.log(res)
      this.loadRole()
      this.$message.success('添加成功')
      // 关闭弹框
      this.showDialog = false
    },
    hSubmit() {
      // 兜底验证
      this.hSave()
      // 添加角色
      this.doAdd()
    },
    // 让每页的序号不是从1开始，而是延续上一页的序号 index是序号从0开始
    changeIndex(index) {
      index += 1
      // 如果翻页了
      if (this.page > 1) {
        index = index + (this.pagesize * this.page) - this.pagesize
        // console.log(index)
      }
      return index
    },
    async doDel(id) {
      await delRole(id)
      // 成功提示
      this.$message.success('删除成功')
      // 如果删除之前,当前页面只有一条数据,则当前的页面减一,如果页码小于0，说明只剩一页，页码变为1
      if (this.roles.length === 1) {
        this.page--
        if (this.page <= 0) {
          this.page = 1
        }
      }
      // 刷新列表
      this.loadRole()
    },
    hDel(id) {
      // 添加询问框
      this.$confirm('此操作将永久删除角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.doDel(id)
      }).catch(err => err)
    },
    hCurrentChange(newPage) {
      // 翻页时执行
      console.log(newPage)
      this.page = newPage
      // 刷新列表
      this.loadRole()
    },
    hSizeChange(newSize) {
      // 切换每页条数时执行
      this.pagesize = newSize
      // 更改页码为1
      this.page = 1
      // 刷新列表
      this.loadRole()
    },
    async loadRole() {
      try {
        const res = await getRoles({ page: this.page, pagesize: this.pagesize })
        console.log(res)
        this.total = res.data.total
        this.roles = res.data.rows
      } catch (error) {
        this.$message.error(error)
      }
    }
  }
}
</script>
