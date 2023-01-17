<template>
  <div class="voice-collect single-card">
    <section class="wrap">
      <p class="card-title">声音采集分析</p>
      <div class="title-detail">
        标题： 济南机关内部“一次办成”改革成效初显
        <!-- 孙述涛主持召开市政府常务会议 -->
      </div>
      <!-- TODO 音轨 -->
      <div class="track">
        <!-- <img src="img/voice.png" alt="" /> -->
      </div>

      <article class="card-text overflow-five">
        <span
          class="fadeInSpan"
          v-for="(span, index) in realword"
          :style="{ animationDelay: index * 0.075 + 's' }"
          :key="index + span"
          >{{ span }}</span
        >
      </article>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      originWord:
        '孙立成说，澳门今日的繁荣稳定，是中央政府强大支持的结果，也是历任特首带领澳门各界同胞励精图治的结果，我们为此感到由衷的高兴，并对澳门的发展未来充满美好的期待。在特区政府的支持下，我们与澳门科技大学、山东中医山,孙立成说，澳门今日的繁荣稳定，是中央政府强大支持的结果，也是历任特首带领澳门各界同胞励精图治的结果，我们为此感到由衷的高兴，并对澳门的发展未来充满美好的期待。在特区政府的支持下，我们与澳门科技大学、山东中医山。在特区政府的支持下，我们与澳门科技大学、山东中医山',
      wordPage: 0,
      word: [],
    }
  },
  computed: {
    realword() {
      let word = this.word[this.wordPage]
      // 遇到特殊符号需要停顿,当前在，。, 间停顿，通过添加空格字符演唱渲染时间
      if (word) {
        word = word
          .replace(/，/g, '，        ')
          .replace(/。/g, '。         ')
          .replace(/、/g, '、         ')
          .replace(/:/g, ':         ')
          .replace(/;/g, ';         ')
          .replace(/,/g, ',           ')
      }
      return word
    },
  },
  created() {},
  mounted() {
    let index = 0,
      dataList
    // this.$api.jinan_module.vioceCollection().then(({ data }) => {
    // if (data) {
    //   dataList = data
    this.originWord =
      '济南市机关内部“一次办成”服务平台上线后，上述材料改由线上提交。活动中心还推出临时活动证，系统内置流程机器人自动加盖电子章，自动生成3个月有效期限，临时证在家就能打印，当天就能使用。正式证件可邮寄到家，也可参加活动时在活动中心凭临时证换取。在大数据及新一代信息技术数字赋能下，办理离退休干部活动证由线下批量集中办理改为线上个人即时办理，申报材料由5份减为4份;申报内容由18个减为5个;办理过程由5个环节减为2个环节;办理时限缩至1-2个工作日;全程网办，实现了“零跑腿”。'
    // this.title = data[index].title
    this.word = this.splitStr(this.originWord, 105)
    // }
    // })
    setInterval(() => {
      this.wordPage++
      if (this.wordPage >= this.word.length) {
        this.wordPage = 0
      }
    }, 14000)
    // setInterval(() => {
    //   if (index > 1) {
    //     index = 0;
    //   } else {
    //     index++;
    //   }
    //   this.originWord = dataList[index].content;
    //   this.title = dataList[index].title;
    //   this.word = this.splitStr(this.originWord, 105);
    // }, 42000);
    // 出一个字的时间 大于为 .15  不考虑渲染时间，实际时间要比这个长
    // 刷新一屏的时间是
  },

  methods: {
    splitStr(word, interval = 100) {
      let times = Math.ceil(word.length / interval)
      let index = 0
      let arr = []
      _.times(times, () => {
        arr.push(word.substring(index * interval, index * interval + interval))
        index++
      })
      return arr
    },
    symbol() {},
  },
}
</script>

<style lang="scss" scoped>
.voice-collect {
  margin-right: 80px;
}
.track {
  width: 96%;
  height: 300px;
  margin: 0 auto;

  background: url('../../../public/img/voice.png') repeat-x;
  animation: voice 10s infinite linear;
  background-size: cover;
  img {
    width: 100%;
    height: 100%;
  }
}
.fadeInSpan {
  display: inline-block;
  opacity: 0;
  animation: typing 0.15s forwards;
}
.fadeInSpan:empty {
  font-size: 0;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-100px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
@keyframes typing {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
@keyframes voice {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 1500px;
  }
}
</style>
