<template>
  <div ref="reportRank" class="report-rank"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'ReporterRank',
  data() {
    return {
      //   height: '934px',
      //   width: '980px',
      max: 208.5,
      reportRank: [
        {
          rank: 'NO' + 1,
          name: '张三',
        },
        {
          rank: 'NO' + 2,
          name: '张三',
        },
        {
          rank: 'NO' + 3,
          name: '张三',
        },
        {
          rank: 'NO' + 4,
          name: '张三',
        },
        {
          rank: 'NO' + 5,
          name: '张三',
        },
      ],
      top5Name: [
        '市大北环项目计划6月底开工 ',
        '市民智库建设...',
        '市代表团在澳... ',
        '市代表团在澳... ',
        '市代表团在澳... ',
      ],
      top5Num: [65.8, 46.8, 40.2, 36.8, 30.5],
      top5Info: ['65.8万 weibo', '46.8万 baidu', '40.2万 wechat', '36.8万 baidu', '30.5万 weibo'],
    }
  },
  mounted() {
    this.initBar()
  },
  methods: {
    initBar() {
      this.max = this.top5Num[0]
      let option = {
        // textStyle: {
        //   rich: {
        //     rank: {
        //       textShadowColor: "#00B8FF",
        //       textShadowBlur: 14,
        //       fontWeight: 500,
        //     },
        //     name: {
        //       fontWeight: 400,
        //     },
        //   },
        // },
        grid: {
          left: '0%',
          top: '50',
          right: '0%',
          bottom: '0',
          containLabel: true,
        },
        xAxis: [
          {
            show: false,
            max: this.max,
          },
        ],
        yAxis: [
          {
            inverse: true,
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              inside: true,
              padding: [0, 0, 120, 0],
              color: '#ffffff',
              height: 85,
              width: 770,
              overflow: 'truncate',
              ellipsis: '...',
              lineHeight: 85,
              rich: {
                rank: {
                  textShadowColor: '#00B8FF',
                  textShadowBlur: 14,
                  fontSize: '64',
                  fontWeight: 500,
                  lineHeight: 85,
                },
                name: {
                  fontSize: '62',
                  fontWeight: 400,
                  lineHeight: 83,
                },
              },
              formatter: function(value, index) {
                //   let arr = value.split(' ')
                let str = '{rank|NO.' + (index + 1) + '}     {name|' + value + '}'
                return str
              },
            },
            data: this.top5Name,
          },
          {
            inverse: true,
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              inside: true,
              padding: [0, 0, 120, 0],
              color: '#ffffff',
              height: 78,
              lineHeight: 78,
              fontSize: '60',
              fontWeight: 400,
              rich: {
                num: {
                  fontSize: '60',
                  fontWeight: 400,
                },
                imgweibo: {
                  width: 68,
                  height: 68,
                  backgroundColor: {
                    image: 'img/weibo.png',
                  },
                },
                imgbaidu: {
                  width: 68,
                  height: 68,
                  backgroundColor: {
                    image: 'img/baidu.png',
                  },
                },
                imgwechat: {
                  width: 68,
                  height: 68,
                  backgroundColor: {
                    image: 'img/wechat.png',
                  },
                },
              },
              formatter: function(value, index) {
                let arr = value.split(' ')
                let str = '{num|' + arr[0] + '} {img' + arr[1] + '|}'
                return str
              },
            },
            data: this.top5Info,
            // .map((cur) => {
            //   return cur + "万";
            // }),
          },
          {
            //   name: '',
            //   nameGap: '0',
            //   nameTextStyle: {
            //     color: '#ffffff',
            //     fontSize: '48',
            //     textShadowColor: '#00B8FF',
            //     textShadowBlur: 14,
            //     padding: [0, 0, 0, 420]
            //   },
            axisLine: {
              lineStyle: {
                color: 'rgba(0,0,0,0)',
              },
            },
            data: [],
          },
        ],
        series: [
          {
            name: '条',
            type: 'bar',
            yAxisIndex: 0,
            data: this.top5Num,
            barCategoryGap: 155,
            label: {
              // normal: {
              position: 'right',
              textStyle: {
                color: '#ffffff',
                fontSize: '16',
              },
              // },
            },
            barWidth: 38,
            itemStyle: {
              // normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: '#7DF6FE',
                },
                {
                  offset: 1,
                  color: '#2BA5D4',
                },
              ]),
              // },
            },
            z: 2,
          },
          {
            name: '白框',
            type: 'bar',
            yAxisIndex: 1,
            barGap: '-100%',
            data: [208, 208, 208, 208, 208],
            barWidth: 34,
            itemStyle: {
              // normal: {
              color: '#00709B',
              borderRadius: 5,
              // },
            },
            z: 1,
          },
          {
            name: '外框',
            type: 'bar',
            yAxisIndex: 2,
            barGap: '-100%',
            data: [this.max, this.max, this.max, this.max, this.max],
            barWidth: 43,
            itemStyle: {
              // normal: {
              color: '#2BA5D4',
              borderRadius: 5,
              textShadowBlur: 7,
              // },
            },
            z: 0,
          },
        ],
      }
      this.myChart = echarts.init(this.$refs.reportRank)
      this.myChart.setOption(option)
      window.addEventListener('resize', () => {
        if (this.myChart) {
          this.myChart.resize()
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.report-rank {
  height: 950px;
  width: 1530px;
  margin-top: 83px;
}
</style>
