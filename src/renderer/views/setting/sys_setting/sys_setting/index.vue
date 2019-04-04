<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="网站名称">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="网站域名">
        <el-input v-model="form.domain"/>
      </el-form-item>
      <el-form-item label="最大文件上传">
        <el-input v-model="form.max_upload"/>
      </el-form-item>
      <el-form-item label="首页标题">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.describe" type="textarea"/>
      </el-form-item>
      <el-form-item label="信息">
        <el-input v-model="form.information"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { get_website_info } from '@/api/admin_api'
import { set_website_info } from '@/api/admin_api'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      form: {
        name: '',
        domain: '',
        max_upload: '',
        title: '',
        describe: '',
        information: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      get_website_info().then(response => {
        if (response.data.length !== 0) {
          this.form = response.data
        }
        this.listLoading = false
      })
    },
    onSubmit() {
      set_website_info(this.form).then(response => {
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
