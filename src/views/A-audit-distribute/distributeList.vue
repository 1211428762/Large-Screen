<template>
  <div class="distributeList single-card">
    <section class="wrap">
      <p class="card-title">分发列表</p>
      <vue-seamless-scroll
        :data="listData"
        ref="seamlessScroll"
        class="scroll-wrap endless-scorll"
        :classOption="defaultOption"
      >
        <!-- <section
        class="endless-scorll"
        :style="{ transform: ' translateY(-200px)' }"
      > -->
        <section class="flex-start" v-for="(item, index) in listData" :key="index + item">
          <img :src="item.img || item.titleUrl" alt="" />
          <div>
            <p class="scroll-title">{{ item.title }}</p>
            <p class="scroll-tag">
              <span>首发：{{ item.start }}</span>
              <span>转载：{{ item.reship }}</span>
            </p>
          </div>
        </section>
        <!-- </section> -->
      </vue-seamless-scroll>
    </section>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'

export default {
  name: 'distributeList',
  data() {
    return {
      imgList: [
        'https://picsum.photos/id/22/200',
        'https://picsum.photos/id/23/200',
        'https://picsum.photos/id/24/200',
      ],
      listData: [
        {
          img: 'https://picsum.photos/id/22/200',
          title: '《国家生态文明试验区（海南）实施生》',
          start: '爱济南',
          reship: '新华社',
        },
        {
          img: 'https://picsum.photos/id/20/200',
          title: '《国家生态文明试验区（海南）实施生》',
          start: '爱济南',
          reship: '新华社',
        },
        {
          img: 'https://picsum.photos/id/23/200',
          title: '《国家生态文明试验区（海南）实施生》',
          start: '爱济南',
          reship: '新华社',
        },
      ],
    }
  },
  components: {
    vueSeamlessScroll,
  },
  mounted() {
    // this.$api.jinan_module.checkDistributeList().then(({ data }) => {
    // if (data) {
    // data.dataList.forEach((cur, index) => {
    //   cur.img = `https://picsum.photos/id/${index + 20 * index}/200`;
    // });
    let data = [
      {
        reprintMedia: '2021-08-03 11:48:44',
        source: '新黄河',
        title: '盛夏流火！“西兴”槐荫活力涌',
        titleUrl:
          'https://jinan-daping-test.oss-cn-beijing.aliyuncs.com/dapingtest/20210804/115d5e81f35d4191b26b0cde119f37ee.png',
      },
      {
        reprintMedia: '2021-08-03 16:40:26',
        source: '济南时报',
        title: '“学党史传承精神 办实事为民服务——2021夏日送清凉”公益活动启动',
        titleUrl:
          'https://jinan-daping-test.oss-cn-beijing.aliyuncs.com/dapingtest/20210804/5107f69f9e5e4aa5b083347c118fda77.png',
      },
      {
        reprintMedia: '2021-08-02 16:57:08',
        source: '济南日报',
        title: '别扎堆！济南：楼盘举行50人以上聚集性活动，提前3个工作日报备',
        titleUrl:
          'https://jinan-daping-test.oss-cn-beijing.aliyuncs.com/dapingtest/20210804/643e0c4ade0b448e849b6804ebdacc6c.png',
      },
      {
        reprintMedia: '2021-08-03 06:08:20',
        source: '济南日报',
        title: '山东：符合条件的新就业无房职工可领住房租赁补贴',
        titleUrl:
          'https://jinan-daping-test.oss-cn-beijing.aliyuncs.com/dapingtest/20210804/ea08f3a0d2d440f8a2e33cadd1707209.png',
      },
      {
        reprintMedia: '2021-08-02 16:45:48',
        source: '济南日报',
        title: '山东发布2021年企业工资指导线 企业职工货币工资增长基准线为7%',
        titleUrl:
          'https://jinan-daping-test.oss-cn-beijing.aliyuncs.com/dapingtest/20210804/8bb52ebd62d3484eaf199d60a9997537.png',
      },
      {
        reprintMedia: '2021-08-03 06:03:56',
        source: '济南日报',
        title: '济南纳入管理1214人均为阴性陆续解除隔离！机场全面恢复正常运转',
        titleUrl:
          'https://jinan-daping-test.oss-cn-beijing.aliyuncs.com/dapingtest/20210804/9581fdaeb09049b5ac579752ae0dabf3.png',
      },
      {
        reprintMedia: '2021-08-02 13:44:07',
        source: '济南时报',
        title: '济南公布SC8868航班疑似阳性人员调查处置情况',
        titleUrl:
          'https://jinan-daping-test.oss-cn-beijing.aliyuncs.com/dapingtest/20210804/fb13474e009e4c5ea7c3299aa290b9fe.png',
      },
    ]
    // this.listData = data.dataList;
    let source = ['新华社', '央视新闻', '爱济南', '今日头条', '百家号']
    this.listData = this.shuffle(data)
    this.listData.forEach((cur) => {
      cur.start = source[_.random(0, 4)]
      cur.reship = source[_.random(0, 4)]
      if (cur.start == cur.reship) {
        cur.reship = source[_.random(0, 4)]
      }
    })
    setTimeout(() => {
      this.$refs.seamlessScroll.reset()
    }, 4000)
    console.log(this.listData)
    // }
    // })
  },
  computed: {
    defaultOption() {
      return {
        step: 5,
        hoverStop: false,
        waitTime: 4000, // 单步运动停止的时间(默认值1000ms)
        singleHeight: 270, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        limitMoveNum: 2,
      }
    },
  },
  methods: {
    shuffle(arr) {
      const result = []
      let random
      if (arr) {
        while (arr.length > 0) {
          random = Math.floor(Math.random() * arr.length)
          result.push(arr[random])
          arr.splice(random, 1)
        }
      }

      return result
    },
  },
}
</script>

<style lang="scss" scoped>
.distributeList {
  height: 1130px;
}
.scroll-wrap {
  margin-top: 35px;
  padding: 0px 75px 0 65px;
  // height: 800px;
  overflow: hidden;
  box-sizing: border-box;
}

.scroll-wrap > div {
  img {
    height: 230px;
    min-width: 270px;
    border: none;
    margin-right: 33px;
  }
  .scroll-title {
    font-size: 64px;
    color: white;
    overflow: hidden;
    white-space: nowrap;
    margin-bottom: 40px;
    opacity: 0.8;
  }
  .scroll-tag {
    font-size: 48px;
    color: white;
    opacity: 0.7;
    display: flex;
    // justify-content: space-evenly;
    letter-spacing: 5px;
    span {
      margin-left: 120px;
    }
  }
}
.endless-scorll {
  height: 780px;
  overflow: hidden;
  margin-top: 60px;
  section.flex-start {
    width: 100%;
    height: 270px;
    transform: scale(1);
    img {
      width: 270px;
      height: 220px;
    }
    > div {
      width: calc(100% - 300px);
      p {
        width: 95%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    // &:nth-of-type(1) {
    //   animation: fadeOut 3s infinite ease-out forwards;
    //   animation-delay: 3s;
    // }

    // &:not(:nth-of-type(1)) {
    // animation-delay: 10s;
    // animation: moveUp 3s infinite ease-out;
    // }
  }
}
@keyframes fadeOut {
  100% {
    transform: translateX(1500px);
    opacity: 0;
  }
}
@keyframes moveUp {
  100% {
    transform: translateY(-200px);
  }
}
</style>
