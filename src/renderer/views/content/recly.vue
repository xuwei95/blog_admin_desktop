<template>
  <div class="app-container">
    <el-table
      :data="article_list"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="50px">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="category"
        label="分类">
      </el-table-column>
      <el-table-column
        prop="tags"
        label="标签">
      </el-table-column>
      <el-table-column
        prop="is_public"
        label="是否公开">
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者">
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="创建日期">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="recly_article(scope.row)">还原</el-button>
          <el-button type="text" size="small" @click="delete_article(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="total"
      :page-size="listQuery.limit"
      :current-page="listQuery.page"
      layout="prev, pager, next"
      background
      @size-change="handleSizeChange"
      @current-change="current_change">
    </el-pagination>
    <el-button type="text" size="small" @click="clean_recly()">清空回收站</el-button>
  </div>
</template>

<script>
import { get_recly_list } from '@/api/admin_api'
import { delete_article } from '@/api/admin_api'
import { recly_article } from '@/api/admin_api'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      article_list: [],
      listLoading: true,
      del_form: {
        id: '',
        real_delete: true
      },
      recly_form: {
        id: ''
      },
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
      get_recly_list(this.listQuery).then(response => {
        this.article_list = response.data
        this.total = response.count
        this.listLoading = false
      })
    },
    delete_article(row) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.del_form.id = row.id
        delete_article(this.del_form).then(response => {
          Message.success(response.msg)
          this.fetchData()
        })
      })
    },
    recly_article(row) {
      this.recly_form.id = row.id
      recly_article(this.recly_form).then(response => {
        Message.success(response.msg)
        this.fetchData()
      })
    },
    clean_recly() {
      this.$confirm('确认清空回收站?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        recly_article().then(response => {
          Message.success(response.msg)
          this.fetchData()
        })
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
