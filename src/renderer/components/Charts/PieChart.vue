<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { get_user_count } from '@/api/admin_api'
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
      data_list: []
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
      get_user_count({ 'region': 1 }).then(response => {
        this.x_list = response.data.x_list
        this.data_list = response.data.data_list
        this.initChart()
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        title: {
          text: '用户访问分布',
          x: 'left',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 12
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: this.x_list
        },
        calculable: true,
        series: [
          {
            name: '用户访问地区分布',
            type: 'pie',
            // roseType: 'radius',
            radius: '55%',
            center: ['50%', '38%'],
            data: this.data_list,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
