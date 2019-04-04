<template>
  <div class="app-container">
    <el-row>
      <user_count_chart/>
    </el-row>
    <el-table
      :data="user_log"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="50px">
      </el-table-column>
      <el-table-column
        prop="user"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="behavior"
        label="行为">
      </el-table-column>
      <el-table-column
        prop="ip"
        label="IP地址">
      </el-table-column>
      <el-table-column
        prop="region"
        label="地区">
      </el-table-column>
      <el-table-column
        prop="source"
        label="来源">
      </el-table-column>
      <el-table-column
        prop="time"
        label="时间">
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
  </div>
</template>

<script>
import { get_user_log } from '@/api/admin_api'
import user_count_chart from '@/components/Charts/user_count'
export default {
  components: {
    user_count_chart
  },
  data() {
    return {
      user_log: [],
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      }
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
      get_user_log(this.listQuery).then(response => {
        this.user_log = response.data
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
