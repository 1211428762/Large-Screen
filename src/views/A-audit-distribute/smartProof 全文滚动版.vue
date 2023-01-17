<template>
  <div class="smart-proof single-card">
    <section class="wrap">
      <p class="card-title">智能校对</p>
      <div class="title-detail">标题：{{ title }}</div>
      <!-- TODO 音轨 -->
      <div style="position: relative">
        <vue-seamless-scroll
          :data="Array.from(str)"
          class="scoll-warp-proof"
          :classOption="defaultOption"
        >
          <article class="card-text" ref="spans" v-html="str" v-cloak>
            <!-- <span
              class="word"
              :class="{ 'word-next': item === 'x' }"
              v-for="(item, index) in str"
              :key="index"
              >{{ item }}</span
            > -->
          </article>
        </vue-seamless-scroll>
        <div class="fix-part">
          <div
            class="fadeOut"
            v-for="(item, index) in wrongs.filter((cur) => cur.wrongs)"
            :key="index + item"
          >
            建议将<span class="word-wrong">{{ item.wrongs }}</span
            >改为<span class="word-correct">{{ item.right }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  data() {
    return {
      title: "济南轨交2号线两特色站率先亮相",
      str: `济南轨道交通2号线设站19座，其中12为特色车站，设有公共艺术品。作、先进、个性的艺术表达形式，记录泉城印记，讲述济南城市泉城印记，讲述济南12为特色车站，设有公共艺术品。作、先进、个性的艺术表达形式，记录泉城印记，讲述济南城市泉城印记，讲述济南12为特色车站，设有公共艺术品。作、先进、个性的艺术表达形式，记录泉城印记，讲述济南城市泉城印记，讲述济南12为特色车站，设有公共艺术品。作、先进、个性的艺术表达形式，记录泉城印记，讲述济南城市泉城印记，讲述济南12为特色车站，设有公共艺术品。作、先进、个性的艺术表达形式，记录泉城印记，讲述济南城市泉城印记，讲述济南12为特色车站，设有公共艺术品。作、先进、个性的艺术表达形式，记录泉城印记，讲述济南城市泉城印记，讲述济南12为特色车站，设有公共艺术品。作、先进、个性的艺术表达形式，记录泉城印记，讲述济南城市泉城印记，讲述济南12<span id='x1' >坐</span>为特色车站，设有公共艺术品。作、先进、个性的艺术表达形式，记录泉城印记，讲述济南城市泉城印记，讲述济南城市故事。<span id='x2'>纪</span>录泉城印记，讲述济南城市故事。`,
      listData: [
        `济南轨道交通2号线设站19座，其中12<span class="word-wrong" style='color: #f5a623;border: 4px solid #50e3c2;'>坐</span>为特色车站，设有公共艺术品。作为穿联济南山、水、城、市的主干线，各站点公共艺术品设计围绕“济脉通衢”主题通过时尚、先进、个性的艺术表达形式，记录泉城印记，讲述济南城市故事。记录泉城印记，讲述济南城市故事。。记录记录泉城印记。记录`,
      ],
      wrongs: [
        { wrongs: "", right: "座", id: "x1" },
        { wrongs: "", right: "记", id: "x2" },
      ],
      right: ["座", "纪"],
    };
  },
  components: {
    vueSeamlessScroll,
  },

  mounted() {
    this.$api.jinan_module.checkProofread().then(({ data }) => {
      if (data) {
        this.title = data.title;
        (data.wrongsWord || []).forEach((cur, index) => {
          this.$set(this.wrongs, index, cur);
        });
        this.str = data.paragraph;
      }
    });
    // this.listData = this.splitStr(this.str, 19);
    // console.log(this.listData);
    this.$nextTick(() => {
      // let wrongs = _.compact(
      //   _.map(Array.from(this.$refs.spans.children), (cur) => {
      //     if (cur.className.includes("word-next") && cur.nextElementSibling) {
      //       return cur.nextElementSibling;
      //     }
      //   })
      // );

      let wrongs = Array.from(this.$refs.spans.children, (cur) => {
        //  通过id判定
        if (cur.id) return cur;
        //  通过类名判定
        // if (cur.className.includes("word-wrong")) return cur;
      });
      console.log(wrongs);
      this.isViewPort(wrongs);
    });
  },
  computed: {
    defaultOption() {
      return {
        step: 2, // 数值越大速度滚动越快
        // limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: false, // 是否开启鼠标悬停stop
        singleHeight: 86, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        waitTime: 0, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },

  methods: {
    isViewPort(ele) {
      let wrongs = this.wrongs;
      var observer = new IntersectionObserver(
        (entries) => {
          // 如果不可见，就返回
          entries.forEach((cur) => {
            if (cur.isIntersecting) {
              wrongs.forEach((word) => {
                console.log(word.id, cur.target.id);
                if (word.id == cur.target.id)
                  word.wrongs = cur.target.innerHTML;
              });

              // 数组形式
              // if (!wrongs.includes(cur.target.innerHTML)) {
              //   wrongs.push(cur.target.innerHTML);
              // }
            } else {
              wrongs.forEach((word) => {
                if (word.id == cur.target.id) word.wrongs = "";
              });
              // _.remove(wrongs, (word) => word === cur.target.innerHTML);
            }
          });
          console.log(wrongs);
          // wrongs.forEach((cur, index) => {
          //   this.$set(this.wrongs, index, cur);
          // });
          // if (!wrongs.length) this.$set(this.wrongs, 0, "");
          // if (!wrongs.length) this.$set(this.wrongs, 0, "");
          console.log(wrongs.filter((cur) => cur.wrongs));
        },
        { threshold: 0.2 }
      );
      // 开始观察
      Array.from(ele, (x) => observer.observe(x));
    },
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
  },
};
</script>

<style lang="scss" scoped>
.smart-proof {
  margin-right: 170px;
  margin-top: 80px;
  width: 1700px;
}
.track {
  width: 100%;
  height: 300px;
  img {
    width: 100%;
    height: 100%;
  }
}

.card-text {

  width: 1115px;
  line-height: 90px;
  letter-spacing: 2px;
  text-align: justify;
  padding-left: 40px;
  font-size: 60px;
  overflow: hidden;
  color: white;
  height: 730px;
 line-height: 90px;
  overflow: hidden;
  margin-top: 25px;
}
.fix-part {
  position: absolute;
  right: 40px;
  top: 30px;
  width: 417.33px;
  box-sizing: border-box;
  font-size: 64px;
  & > div {
    color: white;
    letter-spacing: 8px;
    width: 417.33px;
    // height: 270.5px;
    margin-bottom: 30px;
    line-height: 90px;
    background: rgba(80, 227, 194, 0.3);
    mix-blend-mode: normal;
    white-space: normal;
    padding: 45px 10px 20px 30px;
  }
}
.word-wrong {
  color: #f5a623;
}
.word-correct {
  color: #50e3c2;
}
article .word-wrong {
  color: #f5a623;
}
.word-next {
  font-size: 0;
}
.word-next + span {
  color: #f5a623;
  border: 2px solid #50e3c2;
}
@keyframes fadeOut {
  100% {
    opacity: 1;
  }
}
.fadeOut {
  opacity: 0;
  animation: fadeOut 1s forwards ease-out;
}
</style>
<style lang="scss" >
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
}
</style>