<template>
  <!-- 表单 -->
  <el-form ref="addForm" :model="formData" :rules="rules" label-width="120px">
    <el-form-item label="姓名" prop="username">
      <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
    </el-form-item>
    <el-form-item label="手机" prop="mobile">
      <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
    </el-form-item>
    <el-form-item label="入职时间" prop="timeOfEntry">
      <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
    </el-form-item>
    <el-form-item label="聘用形式" prop="formOfEmployment">
      <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择">
        <!-- [{id: 1, label:'正式'},{id: 2, label:'非正式'}] -->
        <el-option v-for="item in employType" :key="item.id" :value="item.id" :label="item.label" />
      </el-select>
    </el-form-item>
    <el-form-item label="工号" prop="workNumber">
      <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
    </el-form-item>
    <el-form-item label="部门" prop="departmentName">
      <el-input v-model="formData.departmentName" style="width:50%" placeholder="请选择部门" @focus="hFocus()" />
      <div v-if="showTree" class="tree-box">
        <el-tree :data="treeData" :props="{ label: 'name' }" @node-click="hNodeClick" />
      </div>
    </el-form-item>
    <el-form-item label="转正时间" prop="correctionTime">
      <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" />
    </el-form-item>
    <el-form-item>
      <el-button @click="$emit('close')">取消</el-button>
      <el-button type="primary" @click="hSubmit">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// 导入新增员工信息api
import { addEmployee } from '@/api/employees'
// 导入获取部门数据api
import { getDepartments } from '@/api/departments'
// 导入树形结构
import { toTreeList } from '@/utils'
import { TYPE_MAP } from '@/constant/employees'

export default {
  data() {
    return {
      treeData: [],
      showTree: false, // 部门显示框
      employType: Object.keys(TYPE_MAP).map(key => { return { id: key, label: TYPE_MAP[key] } }),
      formData: {
        username: '', // 用户名
        mobile: '', // 手机号
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'change' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击将树状数据显示到输入框
    // 如果没有children属性,就直接显示
    // 如果有children属性就显示children
    hNodeClick(obj) {
      // console.log(obj, node, '06C09083.png')
      if (obj.children.length) return // 没有children 直接返回
      // 将选择的部门显示到输入框
      this.formData.departmentName = obj.name
      // 隐藏树状结构
      this.showTree = false
    },
    hFocus() {
      this.loadDepatrments()
    },
    async loadDepatrments() {
      const res = await getDepartments()
      // 去掉第一个元素
      res.data.depts.shift()
      // 转化为树状结构
      this.treeData = toTreeList(res.data.depts)
      console.log(this.treeData)
      // 显示tree
      this.showTree = true
    },

    async doAdd() {
      try {
        // 传入输入的数据
        await addEmployee(this.formData)
        // 成功提示
        this.$message.success('添加成功')
        // 通知父组件
        this.$emit('update-empolyee')
      } catch (error) {
        console.log(error)
        this.$message.error('添加失败')
      }
    },
    // 确定按钮
    hSubmit() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.doAdd()
          this.$emit('close')
        }
      })
    }
  }
}
</script>
