<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { get_network_count } from '@/api/admin_api'
const animationDuration = 4000

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      x_list: [],
      recv_Data: [],
      sent_Data: []
    }
  },
  mounted() {
    this.Fetch_data()
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    Fetch_data() {
      get_network_count().then(response => {
        console.log(response.data)
        this.x_list = response.data.x_list
        this.recv_Data = response.data.recv_data
        this.sent_Data = response.data.sent_data
        this.initChart()
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 30,
          left: '5%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.x_list,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          name: '流量使用(mb)',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '入网流量',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: this.recv_Data,
          animationDuration
        }, {
          name: '出网流量',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: this.sent_Data,
          animationDuration
        }]
      })
    }
  }
}
</script>
