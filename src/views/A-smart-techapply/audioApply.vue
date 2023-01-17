<template>
  <div class="contentAudit">
    <section class="wrap">
      <p class="card-title">智能技术应用</p>
      <div class="title-detail">智能语音合成</div>
      <div class="text-wrap flex-start">
        <div class="text">
          <span>文本信息:</span>
          <vue-seamless-scroll
            :data="Array.from(text)"
            class="scoll-warp-proof"
            :classOption="defaultOption"
          >
            {{ text }}
          </vue-seamless-scroll>
        </div>
        <div class="analysis-results">
          <div
            v-for="(item, index) in dataList"
            :key="index"
            class="right-container"
          >
            <div class="checkbox-status">
              <div class="inner" :class="{ active: item.selected }"></div>
            </div>
            <span>{{ item.name }}</span>
          </div>
          <span class="play">
            <div class="music-wave">
              <p
                v-for="(item, index) in 5"
                :key="index"
                :style="{ 'animation-delay': 0.4 * index + 's' }"
              ></p>
            </div>
            <!-- <img src="img/Vector.png" alt="" />  -->
            播放</span
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  name: "contentAudit",
  data() {
    return {
      dataList: [
        {
          selected: true,
          name: "男生",
        },
        {
          selected: false,
          name: "女生",
        },
        {
          selected: false,
          name: "童声",
        },
      ],

      text:
        "今天下午，全市建设一流营商环境大会召开。会议认真贯彻落实习近平总书记对山东、对济南工作的重要指示要求，深入贯彻落实黄河流域生态保护和高质量发展重大国家战略及生态",
    };
  },
  components: {
    vueSeamlessScroll,
  },
  props: ["vContent"],
  mounted() {},
  computed: {
    defaultOption() {
      return {
        step: 2, // 数值越大速度滚动越快
        // limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: false, // 是否开启鼠标悬停stop

        waitTime: 0, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.contentAudit {
  margin-right: 220px;
  height: 1130px;
  width: 1700px;
}
.text-wrap {
  padding: 44px 70px 0 76px;
  .text {
    width: 834px;
    height: 630px;
    padding-right: 66px;
    padding-bottom: 30px;
    border-right: 1px solid #1cf1ff;
    // font-weight: bold;
    font-size: 64px;
    line-height: 90px;
    text-align: justify;
    letter-spacing: 1.71429px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 7;
    text-overflow: ellipsis;

    color: #ffffff;
    opacity: .8;
    span {
      color: #00e4ff;
    }
  }
}
.analysis-results {
  width: 500px;
  padding: 20px 0 0 80px;
  font-size: 55px;
  color: white;
  .play {
    padding: 20px 55px 20px 37px;
    background: rgba(43, 255, 242, 0.5);
    border-radius: 12px;
    // font-weight: bold;
    font-size: 64px;
text-align: center;
    display: inline-block;
    line-height: 90px;
    letter-spacing: 1.71429px;
    color: #ffffff;
    margin: 40px 0 0 -40px;
    width: 377px;
    height: 121px;
  }
}

.right-container {
  display: flex;
  align-items: center;
  margin-bottom: 58px;
  span {
    margin-left: 66px;
    font-size: 64px;
    line-height: 90px;
    text-align: justify;
    letter-spacing: 1.71429px;
    color: #00e4ff;
  }
  &:last-of-type {
    margin-bottom: 94px;
  }
}

.checkbox-status {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 83px;
  height: 83px;
  border-radius: 50%;
  border: 9px solid #ffffff;
  box-shadow: 0px 0px 26px #00b8ff, 0px 0px 46px #00b8ff;
  .inner {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border-width: 24px;
  }
  .inner.active {
    background: #ffffff;
    box-shadow: 0px 0px 26px #00b8ff, 0px 0px 26px #00b8ff;
  }
}
.music-wave {
  width: 100px;
  height: 50px;
  display: inline-block;
  p {
    width: 20px;
    display: inline-block;
    height: 50px;
    border-radius: 10px 10px 0 0;
    animation: music-wave 500ms linear infinite alternate none running;
  }
}
@keyframes music-wave {
  0% {
    opacity: 0.35;
    background: #f3f3f3;
    height: 1%;
  }

  100% {
    opacity: 1;
    background: #fff;
    height: 100%;
  }
}
.title-detail {
  margin-left: 20px;
}
.scoll-warp-proof {
  opacity: 0.8;
  div {
    opacity: 0.8;
  }
}
</style>