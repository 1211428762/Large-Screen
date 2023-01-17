<template>
  <div class="pic-collect single-card">
    <section class="wrap">
      <p class="card-title">图像采集分析</p>
      <div class="title-detail">标题：品味济南古筝文化</div>
      <div class="video-wrap flex-start">
        <!-- <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
      >
      </video-player> -->
        <!-- <video
        ref="vPic"
        :src="picData.videoUrl"
        controls
        muted
        loop
        autoplay
      ></video> -->
        <div id="pic-video"></div>
        <div class="analysis-results flex-between">
          <p>
            <span>主题分析：</span>
            <b v-for="(word, index) in picData.theme" :key="index"> {{ word }}</b>
          </p>
          <p>
            <span>内容提取： </span><b v-for="(word, index) in picData.content" :key="index"> {{ word }}</b>
          </p>
          <p>
            <span> 场景分析：</span><b v-for="(word, index) in picData.scenes" :key="index"> {{ word }}</b>
          </p>
          <p>
            <span> 人物识别：</span>
            <b v-for="(word, index) in picData.character" :key="index"> {{ word }}</b>
          </p>
          <p>
            <span> 音频获取：</span>
            <b v-for="(word, index) in picData.interview" :key="index"> {{ word }}</b>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      picData: {},
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'video/mp4', // 类型
            src: 'https://v-cdn.zjol.com.cn/280443.mp4', // url地址
          },
        ],
        poster: '', // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true, // 是否显示全屏按钮
        },
      },
    }
  },
  props: ['vPic'],
  mounted() {
    this.$api.jinan_module.imgCollection().then(({ data }) => {
      if (data) {
        // this.picData = data;
        _.forOwn(data, (val, key) => {
          this.$set(this.picData, key, val)
        })
      }

      let player = new Player({
        id: 'pic-video',
        url: '1.mp4',
        playsinline: true,
        height: '550',
        width: '972',
        autoplay: true,
        loop: true,
      })
      player.muted = true
    })
    this.$emit('update:vPic', this.$refs.vPic)
  },
}
</script>

<style lang="scss" scoped>
.pic-collect {
  min-width: 1780px;
  * {
    box-sizing: border-box;
  }
  // margin-right: 80px;
}
.video-wrap {
  position: relative;
  height: 760px;
  box-sizing: border-box;
  padding: 67px 36px 0 36px;
  video {
    &:focus {
      outline: none;
    }
  }

  .video-player,
  #pic-video {
    min-width: 970px;
    min-height: 550px;
    ::v-deep video {
      object-fit: fill !important;
    }
  }

  .analysis-results {
    opacity: 0.8;
    max-height: 620px;
    padding: 20px 40px 0;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    p {
      font-size: 50px;
      color: white;
      line-height: 85px;
      margin-bottom: 40px;
      &:nth-last-of-type(1) {
        margin-bottom: 0;
      }
    }

    span {
      font-weight: bold;
      color: #00e4ff;
    }
  }
}
.analysis-results p:nth-of-type(1) {
  position: absolute;
  left: 70px;
  color: white;
  span {
    color: white !important;
  }
  text-shadow: 0px 0px 26px #00b8ff, 0px 0px 26px #00b8ff, 0px 0px 26px #00b8ff;
  bottom: 0;
}
</style>
<style>
/* .video-js .vjs-tech {
  min-height: 690px !important;
} */
b {
  font-style: normal;
  font-weight: normal;
}
</style>
