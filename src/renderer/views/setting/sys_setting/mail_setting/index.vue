<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="SMTP服务器">
        <el-input v-model="form.host"/>
      </el-form-item>
      <el-form-item label="SMTP端口号">
        <el-input v-model="form.port"/>
      </el-form-item>
      <el-form-item label="发件人邮箱">
        <el-input v-model="form.email"/>
      </el-form-item>
      <el-form-item label="发件人昵称">
        <el-input v-model="form.nickname"/>
      </el-form-item>
      <el-form-item label="邮箱登入密码">
        <el-input v-model="form.password" type="password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { get_mail_info } from '@/api/admin_api'
import { set_mail_info } from '@/api/admin_api'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      form: {
        host: '',
        port: '',
        email: '',
        nickname: '',
        password: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      get_mail_info().then(response => {
        if (response.data.length !== 0) {
          this.form = response.data
          console.log(this.form)
        }
      })
    },
    onSubmit() {
      set_mail_info(this.form).then(response => {
        Message.success(response.msg)
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.app-container{
    text-align: center;
  }
</style>
