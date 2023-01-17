<template>
  <div class="smart-write">
    <section class="smartwrite-wrap">
      <p class="card-title">智能技术应用</p>
      <div class="title-detail">智能写作</div>
      <p class="desc"><span>写作类型:</span>{{ type }}</p>
      <p class="desc"><span>关键词:</span>{{ keywords }}</p>
      <div class="content">
        <vue-seamless-scroll
          :data="Array.from(word)"
          class="scoll-warp-proof"
          :classOption="defaultOption"
        >
          <p>{{ word }}</p>
        </vue-seamless-scroll>
      </div>
    </section>
  </div>
</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  data() {
    return {
      type: "天气预报推送",
      keywords: "济南、最低气温、穿衣",
      word:
        "今天是7月11号，星期天，济南今天大雨转中雨，24至28度，明天中雨，25至28度，请各位观众带好防雨工具，注意雨天。小暑时节的雷雨常是“倒黄梅”的天气信息，预兆雨带还会在长江中下游维持。",
    };
  },
  components: {
    vueSeamlessScroll,
  },
  created() {},
  mounted() {},
  computed: {
    defaultOption() {
      return {
        step: 1, // 数值越大速度滚动越快
        // limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: false, // 是否开启鼠标悬停stop

        waitTime: 0, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.smart-write {
  margin-right: 17px;
  width: 1500px;
}
.smartwrite-wrap {
  margin-left: 17px;
}
.desc {
  padding-left: 70px;
  font-size: 64px;
  line-height: 90px;
  letter-spacing: 1.71429px;
  color: #ffffff;
  span {
    color: #00e4ff;
    margin-right: 20px;
  }
  &:last-of-type {
    margin-bottom: 40px;
  }
}
.content {
  overflow: hidden;
  width: 1256px;
  height: 576px;
  margin: auto;
  background: rgba(0, 123, 140, 0.3);
  border-radius: 15px;
  p {
    padding: 20px 50px;
    font-size: 64px;
    line-height: 90px;
    text-align: justify;
    letter-spacing: 1.71429px;
    color: #ffffff;
    opacity: 0.8;
    text-indent: 2em;
  }
}
</style>
<style lang="scss" scoped>
.card-text span[id] {
  color: #f5a623;
  border: 1px solid #50e3c2;
}
.scoll-warp-proof {
  height: 730px;
  overflow: hidden;
  margin-top: 25px;
  * {
    transform: scale(1);
  }
}.title-detail{
      margin-left: 20px;
}
</style>