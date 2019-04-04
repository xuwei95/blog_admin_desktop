<template>
  <div class="container">
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="router_to('/log/user_log')">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="eye-open" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">访客数</div>
            <count-to :start-val="0" :end-val="visit_number" :duration="1" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="router_to('/user/index')">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="user" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">用户数</div>
            <count-to :start-val="0" :end-val="user_number" :duration="1" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="router_to('/content/article')">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="form" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">文章数</div>
            <count-to :start-val="0" :end-val="article_number" :duration="1" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="router_to('/content/comments')">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="nested" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">评论数</div>
            <count-to :start-val="0" :end-val="comments_number" :duration="1" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <line-chart/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart/>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <sys_chart/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <network_chart/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import sys_chart from '@/components/Charts/sysLine'
import network_chart from '@/components/Charts/networkLine'
import LineChart from '@/components/Charts/LineChart'
import PieChart from '@/components/Charts/PieChart'
import BarChart from '@/components/Charts/BarChart'
import { getInfo } from '@/api/login'
import { get_store_Token } from '@/utils/auth'
export default {
  components: {
    CountTo,
    sys_chart,
    network_chart,
    LineChart,
    PieChart,
    BarChart
  },
  data() {
    return {
      visit_number: 0,
      article_number: 0,
      user_number: 0,
      comments_number: 0
    }
  },
  created() {
    this.get_info()
  },
  methods: {
    get_info() {
      getInfo(get_store_Token()).then(response => {
        this.visit_number = response.data.view_count
        this.article_number = response.data.article_count
        this.user_number = response.data.user_count
        this.comments_number = response.data.comments_count
      })
    },
    router_to(href) {
      this.$router.push({ path: href })
    }
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
.container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
}
.card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
