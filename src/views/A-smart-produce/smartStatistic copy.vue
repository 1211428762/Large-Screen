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
    return {};
  },
  mounted() {
    var chartDom = this.$refs.smartData;
    var myChart = echarts.init(chartDom);
    var option;
    var hour = new Date().getHours();
    var data = [
      [`${this.$hourTransform(hour, 12)}:00`, 150],
      [`${this.$hourTransform(hour, 10)}:00`, 50],
      [`${this.$hourTransform(hour, 8)}:00`, 253],
      [`${this.$hourTransform(hour, 6)}:00`, 120],
      [`${this.$hourTransform(hour, 4)}:00`, 230],
      [`${this.$hourTransform(hour, 2)}:00`, 125],
      [`${hour}:00`, 100],
    ];
    option = {
      backgroundColor: "rgba(0,0,0,0)",
      xAxis: {
        type: "category",
        boundaryGap: false,
        offset:20,
        data: [
          `${this.$hourTransform(hour, 12)}:00`,
          `${this.$hourTransform(hour, 10)}:00`,
          `${this.$hourTransform(hour, 8)}:00`,
          `${this.$hourTransform(hour, 6)}:00`,
          `${this.$hourTransform(hour, 4)}:00`,
          `${this.$hourTransform(hour, 2)}:00`,
          `${hour}:00`,
        ],
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
            color: "rgba(0, 0, 180, 0.4)",
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
          symbol: "none",
          lineStyle: {
            color: "#5E77FF",
            width: 1,
          },
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
    let that = this;
    setInterval(function () {
      let randomData = _.random(30, 300);
      let list = data.map((cur) => cur[1]);
      hour = new Date().getHours();
      let times = data.map((cur, index) => {
        return `${that.$hourTransform(hour, index * 2)}:00`;
      });

      list.shift();
      list.push(randomData);
      data = times.map((cur, index) => [cur, list[index]]);
      myChart.setOption({
        xAxis: {
          data: times,
        },
        series: [
          {
            data: data,
          },
        ],
      });
    }, 3600000);

    option && myChart.setOption(option);
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.smart-statistic {
  margin-top: 150px;
}
.smartData {
  margin-top: 80px;
  width: 100%;
  height: 660px;
}
</style>