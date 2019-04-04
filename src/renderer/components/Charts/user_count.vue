<template>
  <div class="user_count_chart">
    <div :style="{height: height,width: width}" ref="myEchart"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import 'echarts/map/js/china.js'
  import { get_user_count } from '@/api/admin_api'
  export default {
    name: 'echarts',
    props: {
      id: {
        type: String,
        default: 'user_count_chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '400px'
      }
    },
    data() {
      return {
        chart: null,
        user_count: [],
        max_count: 100
      }
    },
    mounted() {
      this.Fetch_data()
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      Fetch_data() {
        get_user_count().then(response => {
          this.user_count = response.data
          this.max_count = response.max_count
          this.chinaConfigure()
        })
      },
      chinaConfigure() {
        const myChart = echarts.init(this.$refs.myEchart)
        window.onresize = myChart.resize
        myChart.setOption({ // 进行相关配置
          backgroundColor: '#02AFDB',
          title: {
            top: 10,
            text: '用户访问分布图',
            textStyle: {
              fontWeight: 'normal',
              fontSize: 24,
              color: '#F1F1F3'
            },
            left: '1%'
          },
          tooltip: {}, // 鼠标移到图里面的浮动提示框
          dataRange: {
            show: true,
            x: '25px',
            min: 0,
            max: this.max_count,
            text: ['High', 'Low'],
            realtime: true,
            calculable: true,
            color: ['orangered', 'red', 'lightskyblue']
          },
          geo: { // 这个是重点配置区
            map: 'china', // 表示中国地图
            roam: true,
            label: {
              normal: {
                show: false, // 是否显示对应地名
                textStyle: {
                  color: 'rgba(0,0,0,0.4)'
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(0, 0, 0, 0.2)'
              },
              emphasis: {
                areaColor: null,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          series: [{
            type: 'scatter',
            coordinateSystem: 'geo' // 对应上方配置
          },
          {
            name: '访问数', // 浮动框的标题
            type: 'map',
            geoIndex: 0,
            data: this.user_count
          }
          ]
        })
      }
    }
  }
</script>
