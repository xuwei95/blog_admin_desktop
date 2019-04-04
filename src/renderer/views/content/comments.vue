<template>
  <div class="app-container">
    <el-table
      :data="comments_list"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="50px">
      </el-table-column>
      <el-table-column
        prop="article"
        label="文章">
      </el-table-column>
      <el-table-column
        prop="user"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容">
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="创建日期">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
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
  </div>
</template>

<script>
import { get_comments_list } from '@/api/admin_api'
import { del_comment } from '@/api/admin_api'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      comments_list: [],
      listLoading: true,
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
      get_comments_list(this.listQuery).then(response => {
        this.comments_list = response.data
        this.total = response.count
        this.listLoading = false
      })
    },
    handleClick(row) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del_comment({ 'id': row.id }).then(response => {
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
