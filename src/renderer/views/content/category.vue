<template>
  <div class="app-container">
    <el-table
      :data="category_list"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="50px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="创建日期">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="show_edit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="del_category(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" title="编辑分类">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="center">
          <el-form-item label="分类名称:">
          </el-form-item>
          <el-input v-model="form.name"/>
          <br><br><br>
          <el-button type="primary" @click="edit_category()">确认</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="add_show" title="添加分类">
      <el-form ref="form" :model="add_form" label-width="80px">
        <div class="center">
          <el-form-item label="分类名称:">
          </el-form-item>
          <el-input v-model="add_form.category"/>
          <br><br><br>
          <el-button type="primary" @click="add_category()">确认</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-pagination
      :total="total"
      :page-size="listQuery.limit"
      :current-page="listQuery.page"
      layout="prev, pager, next"
      background
      @size-change="handleSizeChange"
      @current-change="current_change">
    </el-pagination>
    <el-button type="text" size="small" @click="show_add()">添加分类</el-button>
  </div>
</template>

<script>
import { get_category_list } from '@/api/admin_api'
import { edit_category } from '@/api/admin_api'
import { del_category } from '@/api/admin_api'
import { add_category } from '@/api/admin_api'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      category_list: [],
      listLoading: true,
      form: {
        'id': '',
        'name': ''
      },
      add_form: {
        'category': ''
      },
      dialogVisible: false,
      add_show: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      total: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
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
      get_category_list(this.listQuery).then(response => {
        this.category_list = response.data
        this.total = response.count
        this.listLoading = false
      })
    },
    edit_category() {
      edit_category(this.form).then(response => {
        Message.success(response.msg)
        this.dialogVisible = false
      })
    },
    del_category(row) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form = row
        del_category(this.form).then(response => {
          Message.success(response.msg)
          this.fetchData()
        })
      })
    },
    add_category() {
      add_category(this.add_form).then(response => {
        Message.success(response.msg)
        this.fetchData()
        this.add_show = false
      })
    },
    show_edit(row) {
      this.form = row
      this.dialogVisible = true
    },
    show_add() {
      this.add_show = true
    }
  }
}
</script>

<style scoped>
  .app-container{
    text-align: center;
  }
  .center{
    text-align: center;
  }
</style>

