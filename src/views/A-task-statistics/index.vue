<template>
  <div class="task-statistics">
    <div class="task-statistics-title">丨任务统计</div>
    <article class="num-wrap">
      <p class="num-title">选题计划总数</p>
      <div
        class="iCountUp"
        ref="num_test"
        v-for="(item, index) in taskTotal"
        :key="index"
      >
        <ICountUp
          :delay="delay"
          :endVal="Number(item)"
          :options="options"
          @ready="ready"
        />
      </div>
    </article>
    <div class="Echarts">
      <div id="testChart" style="width: 600px; height: 400px"></div>
    </div>
  </div>
</template>

<script>
import ICountUp from "vue-countup-v2";
export default {
  name: "test-name",
  components: {
    ICountUp,
  },
  data() {
    return {
      taskTotal: "122386",
      delay: 100,
      options: {
        separator: "",
        useEasing: true,
        grouping: true,
      },
    };
  },
  watch: {
    domNum(val) {
      console.log(val);
    },
  },
  mounted() {
    this.myEcharts();
  },
  methods: {
    ready(data) {
      console.log(data);
    },
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("testChart"));

      // 指定图表的配置项和数据
      let echartOpt = {
        series: [
          {
            type: "pie",
            radius: ["50%", "70%"],
         
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
              },
            },
            data: [
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" },
            ],
          },
        ],
      
      };
      // 使用刚指定的配置项和数据显示图表。

      myChart.setOption(echartOpt);
    },
  },
};
</script>

<style lang="scss" scoped>
.task-statistics {
  padding: 34px 0 56px 34px;

  box-sizing: border-box;
  width: 980px;
  position: relative;
  // background-image: url("../../../public/img/border.png");
  background-size: 100% 100%;
}
.iCountUp {
  display: inline-block;
  text-align: center;
  line-height: 128px;
  margin: 0 12px;
  width: 94px;
  height: 128px;
  font-size: 64px;
  color: white;
  background: rgba(11, 18, 34, 0.5);
  box-shadow: -25px 25px 49px 0px rgba(30, 30, 30, 0.05),
    0px 0px 75px 0px rgba(53, 224, 228, 0.1);
  border: 2px solid;
  border-image: linear-gradient(
      135deg,
      rgba(101, 242, 243, 1),
      rgba(85, 236, 238, 0),
      rgba(78, 233, 236, 0),
      rgba(53, 224, 228, 1)
    )
    2 2;
}
.task-statistics-title {
  height: 67px;
  font-size: 48px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 67px;
  letter-spacing: 1px;
  text-shadow: 0px 0px 24px #00b8ff, 0px 0px 14px #00b8ff;
}
.num-wrap {
  margin-top: 64px;
  margin-left: 20px;
  .num-title {
    margin-bottom: 15px;
    height: 49px;
    font-size: 35px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 49px;
    text-shadow: 0px 0px 20px #00b8ff, 0px 0px 11px #00b8ff;
  }
}
</style>