<template>
  <div class="report-rank">
    <div class="scroll-wrap" ref="seamlessScroll">
      <div class="d1" ref="d1">
        <div
          class="news-content"
          v-for="(item, index) in newsData"
          :key="index"
          ref="newsContent"
          :class="index === tag ? 'highlight' : null"
        >
          <div class="news-item">
            <span> NO.{{ index + 1 }} {{ item.title }}</span>
            <div class="news-tag">
              <span>{{ item.num }}万</span>
              <img :src="item.img" alt="" />
            </div>
          </div>
          <section class="new-col" :style="{ width: (item.num / 100) * 100 + '%' }"></section>
        </div>
      </div>

      <div class="d2" ref="d2">
        <div
          class="news-content-mask"
          v-for="(item, index) in newsData"
          :key="index"
          ref="newsContent"
          :class="index === tag ? 'highlight' : null"
        >
          <div class="news-item">
            <span> NO.{{ index + 1 }} {{ item.title }}</span>
            <div class="news-tag">
              <span>{{ item.num }}万</span>
              <img :src="item.img" alt="" />
            </div>
          </div>
          <section class="new-col" :style="{ width: (item.num / 100) * 100 + '%' }"></section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
import axios from 'axios'
export default {
  name: 'ReporterRank',
  components: {
    vueSeamlessScroll,
  },
  data() {
    return {
      max: 208.5,
      newsData: [],
      timer: null,
      randomImgList: ['wechat.png', 'weibo.png', 'baidu.png'],
      items: [],
      tag: 0,
    }
  },
  computed: {
    defaultOption() {
      return {
        singleHeight: 188,
        step: 5,
        waitTime: 2000, // 单步运动停止的时间(默认值1000ms)
        hoverStop: false,
        limitMoveNum: 10,
        // autoPlay: false
      }
    },
  },
  mounted() {
    this.init()
  },
  created() {},
  beforeDestroy() {
    clearInterval(this.timer)
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
      this.getData()
      this.timer = setTimeout(() => {
        this.items = this.$refs.newsContent
        console.log(this.$refs.newsContent)
      }, 1000)

      const d1 = this.$refs.d1
      const d2 = this.$refs.d2
      d2.style.top = '1880px'
      setTimeout(() => {
        setInterval(() => {
          console.log(d2.style.top)
          // 上移
          d1.style.top = Number(d1.style.top.slice(0, -2)) - 188 + 'px'
          d2.style.top = Number(d2.style.top.slice(0, -2)) - 188 + 'px'

          if (Number(d1.style.top.slice(0, -2)) < 1880) {
            d1.style.transition = 'all 1s'
          }
          if (Number(d2.style.top.slice(0, -2)) < 1880) {
            d2.style.transition = 'all 1s'
          }
          // 控制bar动画
          if (d1.style.top === '-1880px') {
            d1.style.top = '1880px'
            d1.style.transition = 'unset'
          }
          if (d2.style.top === '-1880px') {
            d2.style.top = '1880px'
            d2.style.transition = 'unset'
          }

          // 控制bar对应颜色
          if (this.tag >= 9) {
            this.tag = 0
          } else {
            this.tag++
          }
          console.log(this.tag)
        }, 4000)
      }, 1000)

      // setInterval(() => {
      //   // this.items[0].style.top = 10px
      //   // let a = this.items[0].style.top
      //   // console.log(a.slice(0,-2));

      //   console.log(tag);
      //   if (tag == 4) {
      //     this.type = 1
      //     for (let index = 0; index < 5; index++) {
      //       const element = this.items[index];
      //       let top = Number(element.style.top.slice(0, -2))
      //       element.style.top = (top + 188 * 10) + 'px'
      //     }
      //   }

      //   if (tag == 9) {
      //     this.type = 0
      //     for (let index = 9; index > 4; index--) {
      //       const element = this.items[index];
      //       let top = Number(element.style.top.slice(0, -2))
      //       element.style.top = (top + 188 * 10) + 'px'
      //     }
      //     tag = -1
      //   }

      //   // for (let index = 0; index < 6; index++) {
      //   //   let activeIndex = (tag + index) > 9 ? (tag + index - 9) : (tag + index)
      //   //   const element = this.items[activeIndex];
      //   //   element.style.transition = "all 1s"
      //   //   console.log(activeIndex);
      //   // }

      //   this.items.forEach((cur, index) => {
      //     let top = Number(cur.style.top.slice(0, -2))
      //     console.log(top);
      //     // cur.style.transition = 'all 1s'
      //     cur.style.top = (top - 188) + 'px'
      //   })
      //   tag++
      // }, 2000);
    },
    getData() {
      // axios.get("http://v.juhe.cn/toutiao/index", {
      //   params: {
      //     page: 1,
      //     page_size: 10,
      //     key: "eaddb4d9f969bd06071c8e964764d301"
      //   }
      // }).then(data => {
      // this.$api.jinan_module.hotpotList().then(({ data }) => {
      // const newsList = data.data.result.data
      const mapDate = [
        {
          title: '黑龙江省绥化市望奎县在主动筛查中发现1名复阳人员',
          coordinates: [127.63333, 47.75],
          place: '黑龙江',
          views: 555,
        },
        {
          title: '中美“乒乓外交”50周年纪念活动在京举行',
          coordinates: [116.41667, 39.91667],
          place: '北京',
          views: 666,
        },
        {
          title: '南海舰队一次性入列的三型主战舰艇都是何等利器？',
          coordinates: [113.23333, 23.16667],
          place: '广东',
          views: 5550,
        },
        {
          title: '爸爸回应光腿光脚抱女儿看急诊：这是一个父亲应该做的[心]',
          coordinates: [113.65, 34.76667],
          place: '河南',
          views: 45,
        },
        {
          title: '新疆卡拉麦里生态图卷',
          coordinates: [87.68333, 43.76667],
          place: '新疆',
          views: 332,
        },
        {
          title: '南京高校无人机光影秀迎接“中国航天日”',
          coordinates: [119.78333, 32.05],
          place: '南京',
          views: 156,
        },
        {
          title: '福建，深藏Blue！',
          coordinates: [118.3, 26.08333],
          place: '福建',
          views: 37,
        },
        {
          title: '广西三江：侗画文创促增收',
          coordinates: [108.320004, 22.82402],
          place: '广西',
          views: 1,
        },
        {
          title: '河北大名|红色教育基地火爆，隆真精神代代传',
          coordinates: [115.48333, 38.03333],
          place: '河北',
          views: 888,
        },
        {
          title: '贵州台江：五彩粽、五彩饭飘香“姊妹节”',
          coordinates: [106.71667, 26.56667],
          place: '贵州',
          views: 222,
        },
      ]
      const newsList = mapDate.map((cur) => cur.title)
      newsList.forEach((cur, index) => {
        this.$nextTick(() => {
          this.newsData.push({
            title: cur,
            num: (Math.random() * 10 + (9 - index) * 10).toFixed(2),
            img: 'img/' + this.randomImgList[Math.floor((Math.random() * 10 + 5) % 3)],
          })
        })
      })
      // setTimeout(() => {
      //   this.$refs.seamlessScroll.reset()
      // }, 2800);
      // })
    },
  },
}
</script>
<style lang="scss" scoped>
.report-rank {
  height: 950px;
  width: 1530px;
  margin-top: 100px;
}
.news-content,
.news-content-mask {
  position: relative;
  // transition: all 1s;
  font-family: Songti SC;
  height: 188px;
  font-size: 64px;
  letter-spacing: 3.2px;
  // position: relative;
  color: #ffffff;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 40px;

    top: 116px;
    z-index: 0;
    background: #00709b;
    box-shadow: 0px 0px 12px #00709b, inset 0px 0px 87px rgba(0, 112, 155, 0.1);
  }
  &.highlight {
    color: yellow;
  }
}

.news-item {
  position: relative;
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
  background-image: linear-gradient(90deg, rgba(125, 246, 254, 1), rgba(43, 165, 212, 1));
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
  position: relative;
  height: 935px;
  overflow: hidden;
  .d1,
  .d2 {
    position: absolute;
    top: 0%;
    transition: all 1s;
  }
  .d2 {
    top: 1880px;
  }
}
</style>
