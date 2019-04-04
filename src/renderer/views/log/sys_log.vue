<template>
  <div class="app-container">
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <sys_info_chart/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <sys_network_chart/>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="sys_log"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="50px">
      </el-table-column>
      <el-table-column
        prop="cpu"
        label="cpu占用">
      </el-table-column>
      <el-table-column
        prop="memory"
        label="内存占用">
      </el-table-column>
      <el-table-column
        prop="disk"
        label="硬盘占用">
      </el-table-column>
      <el-table-column
        prop="sent_speed"
        label="出网网速">
      </el-table-column>
      <el-table-column
        prop="recv_speed"
        label="入网网速">
      </el-table-column>
      <el-table-column
        prop="network_sent"
        label="出网总流量">
      </el-table-column>
      <el-table-column
        prop="network_recv"
        label="入网总流量">
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
import { get_sys_log } from '@/api/admin_api'
import sys_info_chart from '@/components/Charts/sys_info_chart'
import sys_network_chart from '@/components/Charts/sys_network_chart'
export default {
  components: {
    sys_info_chart,
    sys_network_chart
  },
  data() {
    return {
      sys_log: [],
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
      get_sys_log(this.listQuery).then(response => {
        this.sys_log = response.data
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
