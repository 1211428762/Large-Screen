<template>
  <div class="contentAudit single-card">
    <section class="wrap">
      <p class="card-title">内容审核</p>
      <div class="title-detail">
        当前审核：第二届江苏发展大会暨全球首届
        <img src="img/videoPlay.png" alt="" />
      </div>
      <div class="video-wrap flex-start">
        <!-- <video
          ref="vContent"
          controls
          muted
          loop
          autoplay
          :src="pageData.videoUrl"
        ></video> -->
        <div id="audit-video"></div>
        <div class="analysis-results">
          <p><span>稿件来源：</span> {{ pageData.channel }}</p>
          <p><span>本次用时： </span>{{ pageData.timeCost }}</p>
          <article class="checkbox-wrap">
            <div
              v-for="(item, index) in pageData.checkList || checkList"
              :key="index"
            >
              {{ item.tag }}
              <div class="checkbox-status" @click="item.value = !item.value">
                <p class="checkbox" :class="{ checked: item.value }"></p>
                <span>
                  {{ item.value ? "通过" : "未通过" }}
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "contentAudit",
  data() {
    return {
      pageData: {},
      checkList: [
        { tag: "暴恐违禁", value: true },
        { tag: "政治敏感", value: false },
        { tag: "低俗色情", value: false },
      ],
    };
  },
  props: ["vContent"],
  mounted() {
    this.$api.jinan_module.checkContentAudit().then(({ data }) => {
      if (data) {
        console.log(data);
        this.pageData = data;
        let player = new Player({
          id: "audit-video",
          url: data.videoUrl,
          playsinline: true,
          height: "660",
          width: "890",
          autoplay: true,
          loop: true,
        });
        player.muted = true;
      }
    });
    this.$emit("update:vContent", this.$refs.vContent);
  },
};
</script>

<style lang="scss" scoped>
.contentAudit {
  margin-right: 220px;
  height: 1130px;
  width: 1700px;
}
.video-wrap {
  padding: 44px 70px 0 76px;

  #audit-video ::v-deep video {
        width: 890px;
    height: 660px;
    object-fit: fill !important;
  }
  video {
    width: 890px;
    height: 660px;
 
  }
}
.analysis-results {
  flex: 1;
  padding: 20px 0px 0 40px;
  font-size: 55px;
  color: white;
  & > p {
    margin-bottom: 55px;
  }
  span {
    font-weight: bold;
    color: #00e4ff;
  }
}
.checkbox {
  width: 50px;
  height: 50px;
  margin-right: 30px;
  display: inline-block;
  position: relative;
  background: #ffffff;
  box-shadow: 0px 0px 26px #00b8ff, 0px 0px 46px #00b8ff;
  transition: all 0.5s;
  &.checked::after {
    content: "√";
    position: absolute;
    left: 45%;
    top: 45%;
    transform: translate(-50%, -50%);
    color: #00b8ff;
    // box-shadow: 0px 0px 26px #00b8ff, 0px 0px 46px #00b8ff;
  }
}
.checkbox-wrap {
  margin-top: 100px;
  line-height: 1;
  display: flex;
  span {
    color: #00e4ff;
    opacity: 0.8;
    white-space: nowrap;
  }
  flex-flow: column;
  & > div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 75px;
  }
  .checkbox-status {
    display: flex;
    width: 270px;

    justify-content: flex-start;
  }
}
</style>