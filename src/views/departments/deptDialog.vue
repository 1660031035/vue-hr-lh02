<template>
  <el-form ref="deptForm" :rules="rules" :model="form" label-width="120px">
    <el-form-item label="部门名称" prop="name">
      <el-input v-model="form.name" style="width:80%" placeholder="1-50个字符" />
    </el-form-item>
    <el-form-item label="部门编码" prop="code">
      <el-input v-model="form.code" style="width:80%" placeholder="1-50个字符" />
    </el-form-item>
    <el-form-item label="部门负责人" prop="manager">
      <el-select v-model="form.manager" style="width:80%" placeholder="请选择">
        <el-option v-for="item in list" :key="item.id" :label="item.username" :value="item.username" />
      </el-select>
    </el-form-item>
    <el-form-item label="部门介绍" prop="introduce">
      <el-input v-model="form.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="small" @click="hSubmit">确定</el-button>
      <el-button size="small" @click="$emit('hCancel')">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
// 员工简单列表
import { getEmployee } from '@/api/employees'
import { addDepartments, getDepartDetail, updateDepartments } from '@/api/departments.js'
export default {
  props: {
    // 接收父组件传递过来的参数
    isEdit: {
      type: Boolean,
      required: true
    },
    pid: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // 表单校验
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍要求1-300个字符', trigger: 'blur' }
        ]
      },
      list: [],
      form: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      }
    }
  },
  created() {
    this.LoadEmployee()
    if (this.isEdit) {
      // 如果是编辑状态才调用
      this.loadDepartDetail()
    }
  },
  methods: {
    async LoadEmployee() {
      const res = await getEmployee()
      console.log(res, '简单列表')
      this.list = res.data
    },
    async doAdd() {
      // 组装参数
      const d = { ...this.form, pid: this.pid }
      await addDepartments(d)
      // 通知父组件: 关闭弹框,再次更新数据
      this.$emit('success')
    },
    // 获取部门详情
    async loadDepartDetail() {
      const res = await getDepartDetail(this.pid)
      this.form = res.data
    },
    doEdit() {
      updateDepartments(this.form)
      this.$emit('success')
    },
    hSubmit() {
      // 表单校验
      this.$refs.deptForm.validate(valid => {
        if (valid) {
          // 通过校验
          this.isEdit ? this.doEdit() : this.doAdd()
        }
      })
      // 调用函数
    }
  }
}
</script>
