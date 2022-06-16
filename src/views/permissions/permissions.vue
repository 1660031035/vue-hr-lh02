<template>
  <div class="permission-container">
    <div class="app-container">
      <!-- 表格 -->
      <el-card>
        <div style="text-align: right; margin-bottom: 20px">
          <el-button type="primary" size="small" @click="hAdd(1, '0')">添加权限</el-button>
        </div>
        <el-table border :data="list" row-key="id">
          <el-table-column label="名称" prop="name" />
          <el-table-column label="标识" prop="code" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- type为1时为页面级访问权限，它可以继续做添加： 设置页面下边某个功能是否可以操作 -->
              <!-- type为2时为按钮级别的访问权限，它就不能再继续细分了，它就没有添加了 -->
              <el-button v-if="scope.row.type===1" type="text" @click="hAdd(2,scope.row.id)">添加</el-button>
              <el-button type="text">编辑</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <!--    增加弹框结构-->
    <el-dialog
      :visible.sync="showDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      title="弹层标题"
      @close="resetForm"
    >
      <!-- 表单内容 -->
      <el-form ref="form" label-width="100px">
        <el-form-item label="权限名称">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="权限标识">
          <el-input v-model="formData.code" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" />
        </el-form-item>
        <el-form-item label="权限启用">
          <el-switch
            v-model="formData.enVisible"
            active-text="启用"
            active-value="1"
            inactive-text="不启用"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <div style="text-align: right;">
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary" @click="hSubmit">确定</el-button>
        </div>
      </template>
    </el-dialog>
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
      list: [],
      showDialog: false, // 是否显示弹层
      formData: {
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        enVisible: '0', // 开启
        pid: '', // 添加到哪个节点下
        type: '' // 类型
      }
    }
  },
  created() {
    this.loadPermissionList()
  },
  methods: {
    // 表单重置
    resetForm() {
      this.formData = {
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        enVisible: '0', // 开启
        pid: '', // 添加到哪个节点下
        type: '' // 类型
      }
      // 2. 清空校验
      this.$refs.form.resetFields()
    },
    // 添加
    async doAdd() {
      // 成功添加
      try {
        await addPermission(this.formData)
        // 成功提示
        this.$message.success('添加成功')
        // 刷新列表
        await this.loadPermissionList()
        // 关闭弹框
        this.showDialog = false
      } catch (error) {
        this.$message.error('添加失败')
        console.log(error)
      }
    },
    hSubmit() {
      // 表单校验
      // 添加权限点
      this.doAdd()
    },
    hAdd(type, id) {
      this.showDialog = true
      this.formData.type = type
      this.formData.pid = id
      console.log(type, id)
    },
    async loadPermissionList() {
      const res = await getPermissionList({ page: 1, pagesize: 100 })
      console.log(res)
      this.list = toTreeList(res.data)
    }
  }
}
</script>
