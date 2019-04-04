<template>
  <div class="app-container">
    <el-table
      :data="user_list"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="50px">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="permission"
        label="用户类别">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="phone_number"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="date_joined"
        label="创建日期">
      </el-table-column>
      <el-table-column
        prop="note"
        label="备注">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="show_config(scope.row)" type="text" size="small">设置</el-button>
          <el-button @click="delete_user(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="total"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="listQuery.limit"
      :current-page="listQuery.page"
      layout="total, prev, pager, next, sizes, jumper"
      background
      @size-change="handleSizeChange"
      @current-change="current_change">
    </el-pagination>
    <el-dialog :visible.sync="config_show" title="设置用户">
      <el-form ref="form" :model="config_form">
        <div>
           <el-form-item label="权限">
            <el-select v-model="config_form.permission" placeholder="选择权限">
              <el-option label="普通用户" value="0"/>
              <el-option label="管理员" value="1"/>
            </el-select>
          </el-form-item>
          <br><br><br>
          <el-button type="primary" @click="config_user()">确认</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { get_user_list } from '@/api/admin_api'
import { user_config } from '@/api/admin_api'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      user_list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      config_form: {
        'user': '',
        'permission': '',
        'delete': false
      },
      dialogVisible: false,
      config_show: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    show_config(row) {
      this.config_form.user = row.id
      this.config_form.permission = ''
      this.config_show = true
    },
    config_user() {
      user_config(this.config_form).then(response => {
        Message.success(response.msg)
        this.config_show = false
        this.fetchData()
      })
    },
    delete_user(row) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.config_form.user = row.id
        this.config_form.delete = true
        user_config(this.config_form).then(response => {
          Message.success(response.msg)
          this.fetchData()
        })
      })
    },
    handleSizeChange: function(size) {
      this.listQuery.limit = size
      this.fetchData()
    },
    current_change: function(currentPage) {
      this.listQuery.page = currentPage
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      get_user_list(this.listQuery).then(response => {
        this.user_list = response.data
        this.total = response.count
        this.listLoading = false
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

