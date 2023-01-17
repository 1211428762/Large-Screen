<template>
  <div class="smart-statistic">
    <p class="card-title">智能生产统计</p>
    <div ref="smartData" class="smartData"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      myChart: null,
      option: null,
    };
  },
  mounted() {
    var chartDom = this.$refs.smartData;
    var myChart = echarts.init(chartDom);
    this.myChart = myChart;

    var option;
    // var hour = new Date().getHours();
    var data = [
      // [`${this.$hourTransform(hour, 12)}:00`, 150],
      // [`${this.$hourTransform(hour, 10)}:00`, 50],
      // [`${this.$hourTransform(hour, 8)}:00`, 253],
      // [`${this.$hourTransform(hour, 6)}:00`, 120],
      // [`${this.$hourTransform(hour, 4)}:00`, 230],
      // [`${this.$hourTransform(hour, 2)}:00`, 125],
      // [`${hour}:00`, 100],
      ["第一周", 150],
      ["第二周", 100],
      ["第三周", 253],
      ["第四周", 120],
      ["第五周", 230],
    ];
    option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "line",
          lineStyle: {
            color: "rgba(41, 203, 151, 1)",
            width: 5,
          },
        },
        backgroundColor: "transparent",
        textStyle: {
          fontSize: 48,
          fontWeight: 500,
          color: "rgba(255, 255, 255, 1)",
        },
      },

      backgroundColor: "rgba(0,0,0,0)",
      grid: {
        containLabel: true,
        left: 80,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        offset: 20,
        data: [["第一周"], ["第二周"], ["第三周"], ["第四周"], ["第五周"]],
        axisLabel: {
          show: true,
          color: "white", //更改坐标轴文字颜色
          fontSize: 48, //更改坐标轴文字大小
        },
        axisLine: {
          lineStyle: {
            color: "white", //更改坐标轴颜色,
            width: 3,
          },
        },
      },
      yAxis: [
        {
          type: "value",
          boundaryGap: [0, "10%"],

          axisLabel: {
            show: true,
            color: "white", //更改坐标轴文字颜色
            fontSize: 48, //更改坐标轴文字大小
          },
          axisLine: {
            lineStyle: {
              color: "white",
              width: 3,
            },
            show: true,
          },
        },
      ],

      visualMap: {
        type: "piecewise",
        show: false,
        dimension: 0,
        seriesIndex: 0,
        pieces: [
          {
            gt: 1,
            lt: 3,
            color: "rgba(0, 209, 255, 0.82)",
          },
          {
            gt: 5,
            lt: 7,
            color: "rgba(0, 0, 180, 0.4)",
          },
        ],
      },
      series: [
        {
          type: "line",
          smooth: 0.6,
          markLine: {
            symbol: ["none", "none"],
            label: { show: false },
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(55, 219, 255, 0.82)",
              },
              {
                offset: 1,
                color: "rgba(105, 255, 192, 0.22)",
              },
            ]),
          },
          data: data,
        },
      ],
    };
    this.option = option;
    let that = this;
    // 3600000更新数据,现在意义不大
    // setInterval(function () {
    //   let randomData = _.random(30, 300);
    //   let list = data.map((cur) => cur[1]);
    //   hour = new Date().getHours();
    //   let times = data.map((cur, index) => {
    //     return `${that.$hourTransform(hour, index * 2)}:00`;
    //   });

    //   list.shift();
    //   list.push(randomData);
    //   data = times.map((cur, index) => [cur, list[index]]);
    //   myChart.setOption({
    //     xAxis: {
    //       data: times,
    //     },
    //     series: [
    //       {
    //         data: data,
    //       },
    //     ],
    //   });
    // }, 3600000);

    option && myChart.setOption(option);
    console.log(this.$timer);
    this.$timer(this.myChart, this.option.series[0].data.length, 3000);
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.smart-statistic {
  margin-top: 150px;
}
.smartData {
  margin-top: 60px;
  width: 100%;
  height: 680px;
}
</style>