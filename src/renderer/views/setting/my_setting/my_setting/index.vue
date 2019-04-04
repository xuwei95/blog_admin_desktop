<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="60px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" :disabled="true"/>
        不可修改。一般用于后台登入名
      </el-form-item>
       <el-form-item label="设置头像" label-width="80px">
          <el-upload
          class="avatar-uploader"
          action="123"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" width="50px" height="50px">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname"/>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="form.phone_number"/>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email"/>
      </el-form-item>
      <div class="left">
        <el-form-item label="性别">
          <el-select v-model="form.sex" placeholder="选择性别">
            <el-option label="男" value="男"/>
            <el-option label="女" value="女"/>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item label="备注">
        <el-input v-model="form.note" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { get_my_info } from '@/api/admin_api'
import { set_my_info } from '@/api/admin_api'
import { Message } from 'element-ui'
import { get_store_Token } from '@/utils/auth'
export default {
  data() {
    return {
      form: {
        id: '',
        username: '',
        nickname: '',
        phone_number: '',
        email: '',
        sex: '',
        note: '',
        headimg: ''
      },
      query_form: {
        token: ''
      },
      imageUrl: '',
      headimg: ''
    }
  },
  created() {
    this.query_form.token = get_store_Token()
    this.fetchData()
  },
  methods: {
    fetchData() {
      get_my_info(this.query_form).then(response => {
        if (response.data.length !== 0) {
          this.form = response.data
          this.imageUrl = 'http://api.blogxu.cn:8000' + response.data.head_img
        }
      })
    },
    beforeAvatarUpload(file) {
      this.headimg = file
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return false
    },
    onSubmit() {
      const data = new FormData()
      data.append('id', this.form.id)
      data.append('username', this.form.username)
      data.append('nickname', this.form.nickname)
      data.append('phone_number', this.form.phone_number)
      data.append('email', this.form.email)
      data.append('sex', this.form.sex)
      data.append('note', this.form.note)
      data.append('headimg', this.headimg)
      set_my_info(data).then((response) => {
        Message.success(response.msg)
        setTimeout(function() {
          this.fetchData()
        }, 300)
      }).catch(error => console.log(error))
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
.left{
  text-align: left;
}
</style>

