<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="当前密码">
        <el-input v-model="form.old_password" type="password"/>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.new_password" type="password"/>
      </el-form-item>
      <el-form-item label="确认新密码">
        <el-input v-model="form.repass" type="password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { set_password } from '@/api/admin_api'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      form: {
        old_password: '',
        new_password: '',
        repass: ''
      }
    }
  },
  methods: {
    onSubmit() {
      set_password(this.form).then(response => {
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
