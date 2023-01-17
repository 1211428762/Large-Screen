<template>
  <div class="spread single-card">
    <section class="wrap">
      <p class="card-title">传播预测</p>

      <div class="title-detail">
        文章:&nbsp;&nbsp;
        <!-- <vue-seamless-scroll
          :data="titles"
          class="title-scroll"
          ref="seamlessScroll"
          :classOption="defaultOption"
        > -->
        <span class="title-span-scroll" v-for="(item, index) in titles" :key="index">{{ item }} </span>
        <!-- </vue-seamless-scroll> -->
      </div>
      <div class="echarts">
        <div ref="main"></div>
        <figure class="legend">
          <div style="border-color: rgba(44, 107, 230, 0.7)"></div>
          评论量
        </figure>
        <figure class="legend">
          <div style="border-color: rgba(250, 232, 40, 1)"></div>
          转发量
        </figure>
      </div>
    </section>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
  name: 'spread',
  data() {
    return {
      titles: [],
      titleIndex: -1,
    }
  },
  components: {
    vueSeamlessScroll,
  },
  created() {
    this.getData()
  },
  computed: {
    defaultOption() {
      return {
        step: 3, // 数值越大速度滚动越快
        limitMoveNum: 1,
        hoverStop: false, // 是否开启鼠标悬停stop
        singleHeight: 150, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        waitTime: 9000, // 单步运动停止的时间(默认值1000ms)
      }
    },
  },
  mounted() {
    var chartDom = this.$refs.main
    var myChart = echarts.init(chartDom)
    var option
    var data1 = [0.6, 0.4, 0.23, 0.61, 0.4, 0.6, 0.3, 0.4]
    var data2 = [0.3, 0.2, 0.4, 0.3, 0.5, 0.3, 0.24, 0.1]
    option = {
      animationEasing: 'elasticOut',
      animationDelayUpdate: function(idx) {
        return idx * 5
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: 'rgba(41, 203, 151, 1)',
            width: 5,
          },
        },
        backgroundColor: 'transparent',
        textStyle: {
          fontSize: 48,
          fontWeight: 500,
          color: 'rgba(255, 255, 255, 1)',
        },
      },
      grid: {
        // top: "17%",
        left: '4%',
        right: '0',
        bottom: '2%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          offset: 10,

          axisLine: {
            show: true,
            color: '#C5DEE4',
          },
          splitArea: {
            // show: true,
            color: '#C5DEE4',
            lineStyle: {
              color: '#C5DEE4',
            },
          },
          axisLabel: {
            color: '#C5DEE4',
            fontSize: 48,
            show: true,
            interval: 1,
          },
          splitLine: {
            show: false,
          },
          boundaryGap: false,
          data: ['第一天', 2, '第二天', 4, '第三天', 6, '第四天', 8],
        },
      ],

      yAxis: [
        {
          type: 'value',
          min: 0,
          // max: 140,
          splitNumber: 4,
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#C5DEE4'],
              opacity: 0.3,
            },
          },
          axisLine: {
            show: true,
            color: '#C5DEE4',
          },
          axisLabel: {
            show: true,
            // margin: 20,
            formatter: (val) => val * 100 + '%',
            fontSize: 48,
            color: '#C5DEE4',
          },
          axisTick: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: '评论量',
          type: 'line',
          smooth: true, //是否平滑
          showAllSymbol: false,
          // symbol: 'image://./static/images/guang-circle.png',
          lineStyle: {
            color: 'rgb(50,74,159)',
            shadowColor: 'rgba(0, 0, 0, 0)',
            shadowBlur: 0,
            shadowOffsetY: 5,
            shadowOffsetX: 5,
          },
          label: {
            // show: false,
            // position: "top",
            color: '#00ffff',
            fontSize: 48,
          },
          // tooltip: {
          //   show: false,
          // },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(44, 107, 230, .6)',
                },
                {
                  offset: 1,
                  color: 'rgba(84, 140, 255, 0.5)',
                },
              ],
              global: false, // 缺省为 false
            },
          },
          data: data1,
        },
        {
          name: '转发量',
          type: 'line',
          smooth: true, //是否平滑
          showAllSymbol: false,
          // symbol: 'image://./static/images/guang-circle.png',
          lineStyle: {
            color: '#FFBC0D',
            shadowColor: 'rgba(0, 0, 0, 0)',
            shadowBlur: 0,
            shadowOffsetY: 5,
            shadowOffsetX: 5,
          },
          label: {
            show: false,
            position: 'top',
            color: '#00ffff',
            fontSize: 48,
          },
          tooltip: {
            show: false,
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(250, 232, 40, 1)',
                },
                {
                  offset: 0.8,
                  color: 'rgba(250, 232, 40, .7)',
                },
                {
                  offset: 1,
                  color: 'rgba(247, 233, 73, 0.3)',
                },
              ],

              global: false, // 缺省为 false
            },
          },
          data: data2,
        },
      ],
    }
    // setInterval(() => {
    //   let [randomData1, randomData2] = [_.random(0.1, 0.7), _.random(0.1, 0.7)];
    //   data1.shift();
    //   data1.push(randomData1);
    //   data2.shift();
    //   data2.push(randomData2);
    //   option && myChart.setOption(option);
    //   if (this.titleIndex > 1) {
    //     this.titleIndex = -1;
    //   } else {
    //     this.titleIndex++;
    //     console.log(this.titleIndex);
    //   }
    // }, 10000);
    option && myChart.setOption(option)
    this.timer(myChart)
  },
  methods: {
    timer(echarts, delay = 3000) {
      let index = 0
      setInterval(() => {
        index += 2
        if (index > 8) {
          index = 0
        }
        echarts.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
        })
        echarts.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index,
        })
        echarts.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: index,
        })
      }, delay)
    },
    getData() {
      // this.$api.jinan_module.checkSpread().then(({ data }) => {
      //   console.log('data--->', data)
      //   if (data) {
      //     this.titles = ['济南市庆祝建党百年音乐会即将举行']
      //   }
      // })
      this.titles = ['庆祝建党百年音乐会即将举行']

      // setTimeout(() => {
      //   this.$refs.seamlessScroll.reset();
      // }, 9000);
    },
  },
}
</script>

<style lang="scss" scoped>
.spread {
  margin-top: 80px;
}
.echarts {
  position: relative;
  width: 1500px;
  overflow: hidden;
  > div {
    width: 1570px;
    height: 100%;
  }
  height: 750px;
}
.legend {
  position: absolute;
  right: 80px;
  line-height: 80px;
  top: 60px;
  & + .legend {
    margin-right: 300px;
  }
  color: white;
  font-size: 48px;
  > div {
    display: inline-block;
    // width: 100px;
    // height: 40px;
    margin-right: 28px;
    border-radius: 50%;
    vertical-align: middle;
    border: 15px solid;
    padding: 15px;
  }
}

.title-scroll {
  height: 150px;
  display: inline-block;
  overflow: hidden;
  margin-left: 20px;
}
.title-detail {
  position: relative;
  display: flex;
}
.title-span-scroll {
  display: block;
  height: 150px;
}
</style>
