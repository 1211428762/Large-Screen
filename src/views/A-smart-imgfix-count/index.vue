<template>
  <div class="imgfixContainer">
    <p class="card-title">智能图像修复统计</p>
    <div ref="imgfixCount" class="imgfix-count"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "ImgfixCount",
  data() {
    return {
      xData: ["5.1", "5.2", "5.3", "5.4", "5.5", "5.6", "5.7"],
      yList: [32, 58, 64, 30, 100, 60, 90],
    };
  },
  created() {
    this.xData.forEach((cur, index, arr) => {
      this.xData[index] = this.getDate("day", index - arr.length + 1);
    });
  },
  mounted() {
    this.initBar();
  },
  methods: {
    initBar() {
      const CubeLeft = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: function (ctx, shape) {
          const xAxisPoint = shape.xAxisPoint;
          const c0 = [shape.x, shape.y + 26];
          const c1 = [shape.x - 36, shape.y];
          const c2 = [xAxisPoint[0] - 36, xAxisPoint[1] - 36];
          const c3 = [xAxisPoint[0], xAxisPoint[1] - 10];
          ctx
            .moveTo(c0[0], c0[1])
            .lineTo(c1[0], c1[1])
            .lineTo(c2[0], c2[1])
            .lineTo(c3[0], c3[1])
            .closePath();
        },
      });
      const CubeRight = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: function (ctx, shape) {
          const xAxisPoint = shape.xAxisPoint;
          const c1 = [shape.x, shape.y + 26];
          const c2 = [xAxisPoint[0], xAxisPoint[1] - 10];
          const c3 = [xAxisPoint[0] + 36, xAxisPoint[1] - 36];
          const c4 = [shape.x + 36, shape.y];
          ctx
            .moveTo(c1[0], c1[1])
            .lineTo(c2[0], c2[1])
            .lineTo(c3[0], c3[1])
            .lineTo(c4[0], c4[1])
            .closePath();
        },
      });
      const CubeTop = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: function (ctx, shape) {
          const c1 = [shape.x, shape.y + 26];
          const c2 = [shape.x + 36, shape.y];
          const c3 = [shape.x + 0, shape.y - 26];
          const c4 = [shape.x - 36, shape.y];
          ctx
            .moveTo(c1[0], c1[1])
            .lineTo(c2[0], c2[1])
            .lineTo(c3[0], c3[1])
            .lineTo(c4[0], c4[1])
            .closePath();
        },
      });
      echarts.graphic.registerShape("CubeLeft", CubeLeft);
      echarts.graphic.registerShape("CubeRight", CubeRight);
      echarts.graphic.registerShape("CubeTop", CubeTop);

      let option = {
        // backgroundColor: "#010d3a",
        /**区域位置*/
        //   grid: {
        //       left: '10%',
        //       right: '10%',
        //       top: 80,
        //       bottom: 40,
        //     },
        /**图例大小*/
        //  legend: {
        //   type: 'plain',
        //   left: 0,
        //   top: 20,
        //   itemGap: 20,
        //   itemWidth: 35,
        //   itemHeight: 20
        // },
        //X轴
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              color: "rgba(41, 203, 151, 1)",
              width: 5,
            },
          },
        
          textStyle: {
            fontSize: 48,
            fontWeight: 500,
          
          },
        },
        grid: {
          top: 150,
        },
        xAxis: {
          show: true,
          name: "（日）",
          nameTextStyle: {
            color: "#FFFFFF",
            fontSize: 48,
          },
          nameLocation: "end",
          type: "category",
          axisLine: {
            show: true,
            lineStyle: {
              color: "#FFFFFF",
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            fontSize: 48,
            color: "#FFFFFF",
            margin: 30,
          },
          data: this.xData,
        },
        yAxis: {
          show: true,
          splitNumber: 5,
          name: "单位(次)",
          nameTextStyle: {
            color: "#FFFFFF",
            fontSize: 48,
            align: "center",
            padding: [0, 0, 50, -55],
          },
          nameLocation: "end",
          axisLine: {
            show: true,
            lineStyle: {
              color: "#FFFFFF",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
            },
          },
          axisLabel: {
            color: "#FFFFFF",
            fontSize: 48,
            verticalAlign: "top",
          },
        },
        series: [
          {
            type: "custom",
            renderItem: (params, api) => {
              const location = api.coord([api.value(0), api.value(1)]);
              return {
                type: "group",
                children: [
                  {
                    type: "CubeLeft",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: "#00D7FF",
                        },
                        {
                          offset: 1,
                          color: "#99D4FF",
                        },
                        // {
                        //   offset: 1,
                        //   color: 'rgba(255, 255, 255, 0)'
                        // }
                      ]),
                    },
                  },
                  {
                    type: "CubeRight",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: "#00D7FF",
                        },
                        {
                          offset: 1,
                          color: "#99D4FF",
                        },
                        // {
                        //   offset: 1,
                        //   color: 'rgba(255, 255, 255, 0)'
                        // }
                      ]),
                    },
                  },
                  {
                    type: "CubeTop",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: "#00D7FF",
                    },
                  },
                ],
              };
            },
            data: this.yList,
          },
        ],
      };

      this.myChart = echarts.init(this.$refs.imgfixCount);
      this.myChart.setOption(option);
      window.addEventListener("resize", () => {
        if (this.myChart) {
          this.myChart.resize();
        }
      });
      this.$timer(this.myChart, 7);
    },
    getDate(type = null, number = 0) {
      var nowdate = new Date();
      switch (type) {
        case "day": //取number天前、后的时间
          nowdate.setTime(nowdate.getTime() + 24 * 3600 * 1000 * number);
          var y = nowdate.getFullYear();
          var m = nowdate.getMonth() + 1;
          var d = nowdate.getDate();
          var retrundate = m + "-" + d;
          break;
        case "month": //取number月前、后的时间
          nowdate.setMonth(nowdate.getMonth() + number);
          var y = nowdate.getFullYear();
          var m = nowdate.getMonth() + 1;
          var d = nowdate.getDate();
          var retrundate = m + "-" + d;
          break;
        default:
          //取当前时间
          var m = nowdate.getMonth() + 1;
          var d = nowdate.getDate();
          var retrundate = m + "-" + d;
      }
      return retrundate;
    },
  },
};
</script>
<style lang="scss" scoped>
.imgfixContainer {
  height: auto;
  width: 1300px;
  margin: 0;
}
.imgfix-count {
  width: 1300px;
  height: 880px;
  margin: 60px;
}
.card-title {
  padding-top: 80px;
  &::before {
    top: 87px;
  }
}
</style>