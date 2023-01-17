<template>
  <div class="voice-collect single-card">
    <section class="wrap">
      <p class="card-title">声音采集分析</p>
      <div class="title-detail">
        标题： {{ title }}
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
      title: "",
      originWord:
        "孙立成说，澳门今日的繁荣稳定，是中央政府强大支持的结果，也是历任特首带领澳门各界同胞励精图治的结果，我们为此感到由衷的高兴，并对澳门的发展未来充满美好的期待。在特区政府的支持下，我们与澳门科技大学、山东中医山,孙立成说，澳门今日的繁荣稳定，是中央政府强大支持的结果，也是历任特首带领澳门各界同胞励精图治的结果，我们为此感到由衷的高兴，并对澳门的发展未来充满美好的期待。在特区政府的支持下，我们与澳门科技大学、山东中医山。在特区政府的支持下，我们与澳门科技大学、山东中医山",
      wordPage: 0,
      word: [],
    };
  },
  computed: {
    realword() {
      let word = this.word[this.wordPage];
      // 遇到特殊符号需要停顿,当前在，。, 间停顿，通过添加空格字符演唱渲染时间
      if (word) {
        word = word
          .replace(/，/g, "，        ")
          .replace(/。/g, "。         ")
          .replace(/、/g, "、         ")
          .replace(/:/g, ":         ")
          .replace(/;/g, ";         ")
          .replace(/,/g, ",           ");
      }
      return word;
    },
  },
  created() {},
  mounted() {
    let index = 0,
      dataList;
    this.$api.jinan_module.vioceCollection().then(({ data }) => {
      if (data) {
        dataList = data;
        this.originWord = data[index].content;
        this.title = data[index].title;
        this.word = this.splitStr(this.originWord, 105);
      }
    });
    setInterval(() => {
      this.wordPage++;
      if (this.wordPage >= this.word.length) {
        this.wordPage = 0;
      }
    }, 14000);
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
      let times = Math.ceil(word.length / interval);
      let index = 0;
      let arr = [];
      _.times(times, () => {
        arr.push(word.substring(index * interval, index * interval + interval));
        index++;
      });
      return arr;
    },
    symbol() {},
  },
};
</script>

<style lang="scss" scoped>
.voice-collect {
  margin-right: 80px;
}
.track {
  width: 96%;
  height: 300px;
  margin: 0 auto;

  background: url("../../../public/img/voice.png") repeat-x;
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