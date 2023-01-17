<template>
  <div class="report-rank">
    <vue-seamless-scroll
      :data="newsData"
      class="scroll-wrap"
      ref="seamlessScroll"
      :classOption="defaultOption"
    >
      <div class="news-content" v-for="(item, index) in newsData" :key="index">
        <div class="news-item">
          <span> NO.{{ index + 1 }} {{ item.title }}</span>
          <div class="news-tag">
            <span>{{ item.num }}万</span>
            <img :src="item.img" alt="" />
          </div>
        </div>
        <section
          class="new-col"
          :style="{ width: (item.num / 100) * 100 + '%' }"
        ></section>
      </div>
    </vue-seamless-scroll>
  </div>
</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll";
import axios from "axios";
export default {
  name: "ReporterRank",
  components: {
    vueSeamlessScroll,
  },
  data() {
    return {
      max: 208.5,
      newsData: [],
      timer: null,
      randomImgList: ["wechat.png", "weibo.png", "baidu.png"],
    };
  },
  computed: {
    defaultOption() {
      return {
        singleHeight: 180,
        step: 5,
        waitTime: 2000, // 单步运动停止的时间(默认值1000ms)
        hoverStop: false,
        limitMoveNum: 10,
        // autoPlay: false
      };
    },
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    init() {
      // setTimeout(() => {
      //   this.$nextTick(() => {
      //   this.defaultOption.autoPlay = true
      //   console.log(this.defaultOption);
      //   this.$refs.seamlessScroll.reset()
      //   })
      // }, 2000);
      // axios.get("http://v.juhe.cn/toutiao/index", {
      //   params: {
      //     page: 1,
      //     page_size: 10,
      //     key: "eaddb4d9f969bd06071c8e964764d301"
      //   }
      // }).then(data => {
      //   const newsList = data.data.result.data
      //   console.log(newsList, ")))))))))((((((((");
      //   newsList.forEach((cur, index) => {
      //     this.newsData.push({
      //       title: cur.title,
      //       num: (Math.random() * 10 + (9 - index) * 10).toFixed(2),
      //       img: '/img/' + this.randomImgList[Math.floor((Math.random() * 10 + 5) % 3)]
      //     })
      //   })
      //   console.log(this.newsData);
      // })
      this.getData();
      this.timer = setInterval(() => {
        this.getData();
      }, 300000);
    },
    getData() {
      // axios.get("http://v.juhe.cn/toutiao/index", {
      //   params: {
      //     page: 1,
      //     page_size: 10,
      //     key: "eaddb4d9f969bd06071c8e964764d301"
      //   }
      // }).then(data => {
      this.$api.jinan_module.hotpotList().then(({ data }) => {
        // const newsList = data.data.result.data

        const newsList = data.dataList.map((cur) => cur.title);
        newsList.forEach((cur, index) => {
          this.$nextTick(() => {
            this.newsData.push({
              title: cur,
              num: (Math.random() * 10 + (9 - index) * 10).toFixed(2),
              img:
                "img/" +
                this.randomImgList[Math.floor((Math.random() * 10 + 5) % 3)],
            });
          });
        });
        setTimeout(() => {
          this.$refs.seamlessScroll.reset();
        }, 2800);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.report-rank {
  height: 950px;
  width: 1530px;
  margin-top: 100px;
}
.news-content {
  font-family: Songti SC;
  height: 185px;
  font-size: 64px;

  letter-spacing: 3.2px;
  position: relative;
  color: #ffffff;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 40px;
    top: 116px;
    z-index: 0;
    background: #00709b;
    box-shadow: 0px 0px 12px #00709b, inset 0px 0px 87px rgba(0, 112, 155, 0.1);
  }
}

.news-item {
  display: flex;
  justify-content: space-between;
  img {
    width: 64px;
    height: 64px;
    margin-left: 38px;
  }
  & > span {
    display: inline-block;
    width: 1100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.new-col {
  margin: 32px 0 50px;
  width: 1680px;
  height: 40px;
  position: relative;
  z-index: 10;
  background: rgba(0, 0, 0, 0.148246);
  box-shadow: 0px 0px 12px #00709b, inset 0px 0px 87px rgba(0, 112, 155, 0.1);
  background-image: linear-gradient(
    90deg,
    rgba(125, 246, 254, 1),
    rgba(43, 165, 212, 1)
  );
}
.news-tag {
  display: inline-flex;
  text-align: right;
  span {
    font-size: 60px;
    opacity: 0.8;
  }
}
.scroll-wrap {
  height: 935px;
  overflow: hidden;
}
</style>