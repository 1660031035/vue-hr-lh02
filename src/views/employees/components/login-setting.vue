<template>
  <el-form
    ref="userForm"
    :model="userInfo"
    label-width="120px"
    style="margin-left: 120px; margin-top: 30px"
  >
    <el-form-item label="姓名:">
      <el-input v-model="userInfo.username" style="width:300px" />
    </el-form-item>
    <el-form-item label="密码:">
      <el-input v-model="userInfo.password" type="password" style="width:300px" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="hSubmit">更新</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { getUserDetailById, saveUserDetailById } from '@/api/user'
export default {
  data() {
    return {
      userInfo: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空', triggler: 'blur' }],
        password: [{ required: true, message: '密码不能为空', triggler: 'blur' }]
      }
    }
  },
  created() {
    this.loadUserDetailById()
  },
  methods: {
    async loadUserDetailById() {
      const res = await getUserDetailById(this.$route.query.id)
      this.userInfo = res.data
      console.log(res.data)
    },
    hSubmit() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          this.doEdit()
        }
      })
    },
    async doEdit() {
      try {
        await saveUserDetailById(this.userInfo)
        // 修改成功
        this.$message.success('修改成功')
        // 路由跳转
        this.$router.back()
      } catch (err) {
        console.log(err)
        // 修改成功
        this.$message.error('修改失败')
      }
    }
  }
}
</script>
