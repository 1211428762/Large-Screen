<template>
  <div class="smartWrite">
    <p class="card-title">传播预测</p>
    <div ref="smartWrite" class="write"></div>
  </div>
</template>

<script>
let plain = {
  color: "rgba(0,0,0,0)",
};
let commonLabel = {
  fontSize: 64,
  color: "white",
};
let commonLabelLine = {
  show: true,
  length: 150,
  length2: 150,
};
let gradient = {
  type: "linear",
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [
    {
      offset: 0,
      color: "rgb(56,126,165)", // 0% 处的颜色
    },
    {
      offset: 1,
      color: "rgba(56,126,165,.1)", // 100% 处的颜色
    },
  ],
};

import * as echarts from "echarts";
export default {
  mounted() {
    var chartDom = this.$refs.smartWrite;
    var myChart = echarts.init(chartDom);
    var option;
    option = {
      series: [
        {
          name: "",
          type: "pie",
          radius: ["95%", "100%"],
          data: [
            {
              value: 100,
              itemStyle: {
                color: "rgba(0,0,0,.1)",
              },
            },
          ],
        },
        {
          name: "体育",
          type: "pie",
          radius: ["80%", "85%"],
          clockwise: false,
          label: commonLabel,
          labelLine: {
            length: 80,
            length2: 80,
          },
          data: [
            {
              value: 30,
              name: "体育",
              itemStyle: {
                color: "#53A3CF",
              },
            },
            {
              value: 10,
              itemStyle: plain,
            },
          ],
        },
        {
          name: "天气",
          type: "pie",
          radius: ["65%", "70%"],
          clockwise: false,
          label: commonLabel,
          labelLine: {
            length: 100,
            length2: 100,
          },
          data: [
            {
              value: 10,
              name: "天气",
              clockwise: false,
              itemStyle: {
                color: gradient,

                // color: "#53A3CF",
              },
            },
            {
              value: 10,
              itemStyle: plain,
            },
          ],
        },
        {
          name: "娱乐",
          type: "pie",
          radius: ["50%", "55%"],
          // clockwise: false,
          label: commonLabel,
          labelLine: commonLabelLine,
          data: [
            {
              value: 90,
              name: "娱乐",
              itemStyle: {
                color: "#53A3CF",
              },
            },
            {
              value: 10,
              itemStyle: plain,
            },
          ],
          label: commonLabel,
          labelLine: commonLabelLine,
        },
        {
          name: "财经",
          type: "pie",
          label: commonLabel,
          labelLine: commonLabelLine,
          radius: ["35%", "40%"],
          data: [
            {
              value: 30,
              name: "财经",
              itemStyle: {
                color: gradient,
              },
            },
            {
              value: 10,

              itemStyle: plain,
            },
          ],
        },
      ],
    };

    option && myChart.setOption(option);
  },
};
</script>

<style lang="scss" scoped>
.write {
  width: 100%;
  height: 850px;
}
</style>