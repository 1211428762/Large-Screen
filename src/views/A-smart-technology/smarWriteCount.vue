<template>
  <div class="smartWrite">
    <p class="card-title">智能写作统计分析</p>
    <div class="write-wrap">
      <div ref="smartWrite" class="write"></div>
    </div>
  </div>
</template>

<script>
let commonLabel = {
  fontSize: 43,
  color: "white",
  padding: [0, 0, 50, 0],
  rich: {
    "<style_name>": {
      color: "rgba(162, 58, 58, 1)",
    },
  },
};
let commonLabelLine = {
  show: true,
  length: 20,
  length2: 60,
  showAbove: true,
  minTurnAngle: 90,
  maxSurfaceAngle: 90,
  rich: {},
  lineStyle: {
    width: 3,
    color: "#78DFFF",
  },
};

import * as echarts from "echarts";
export default {
  data() {
    return {
      timerIndex: 0,
      timerObj: null,
      myEchart: null,
      option: {},
    };
  },
  mounted() {
    this.myEchart = echarts.init(this.$refs.smartWrite);
    var option;
    this.option = {
      series: [
        {
          name: "面积模式",
          type: "pie",
          radius: [80, 250],
          center: ["50%", "50%"],
          roseType: "radius",
          emphasis: {
            label: {
              show: true,
            },
            scale: true,
            scaleSize: 25,
          },
          data: [
            {
              value: 82,
              name: "体育 22%",
              itemStyle: {
                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  {
                    offset: 0,
                    color: "#387BFC",
                  },
                  {
                    offset: 1,
                    color: "#01349B",
                  },
                ]),
              },
              label: commonLabel,
              labelLine: commonLabelLine,
            },

            {
              value: 50,
              name: "娱乐 15%",
              itemStyle: {
                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  {
                    offset: 0,
                    color: "#FEEF4D",
                  },
                  {
                    offset: 1,
                    color: "#857700",
                  },
                ]),
              },
              label: commonLabel,
              labelLine: commonLabelLine,
            },
            {
              value: 65,
              name: "财经 20%",
              itemStyle: {
                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  {
                    offset: 0,
                    color: "#A8A8A8",
                  },
                  {
                    offset: 1,
                    color: "#FFFFFF",
                  },
                ]),
              },
              label: commonLabel,
              labelLine: commonLabelLine,
            },
            {
              value: 93,
              name: "天气 33%",
              itemStyle: {
                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  {
                    offset: 0,
                    color: "#00F7FF",
                  },
                  {
                    offset: 1,
                    color: "#008A83",
                  },
                ]),
              },
              label: commonLabel,
              labelLine: commonLabelLine,
            },
          ],
        },
      ],
    };
    this.timer();
    this.option && this.myEchart.setOption(this.option);
  },
  methods: {
    timerFunc() {
      const that = this;
      that.myEchart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
      });
      that.myEchart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: that.timerIndex,
      });
      that.myEchart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: that.timerIndex,
      });
    },
    timer() {
      const that = this;
      that.timerObj = setInterval(() => {
        that.timerFunc();
        that.timerIndex++;
        if (that.timerIndex === that.option.series[0].data.length) {
          that.timerIndex = 0;
        }
      }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
.write {
  width: 1000px;
  height: 850px;
  transform: scale(1.3);
}
.write-wrap {
  background: url("../../../public/img/pie-bg.png") no-repeat;
  background-size: contain;
  background-position: 50% 60%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-title {
  padding-top: 80px;
  &::before {
    top: 87px;
  }
}
</style>