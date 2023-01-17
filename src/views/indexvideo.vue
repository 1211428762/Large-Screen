<template>
  <div id="home" class="home">
    <!-- 顶部标题 -->
    <div class="top-title">
      <p>智能化编辑部</p>
    </div>
    <div class="left_title"></div>
    <div class="right_title"></div>
    <!-- 主内容 -->
    <main class="main">
      <!-- 新内容↓↓ ↓↓↓↓↓↓-->

      <!-- 地图和 两个采集分析  上下布局-->
      <section class="hotspot-collection">
        <!-- 地图 -->
        <div class="hotspot-wrap">
          <hotpotMap></hotpotMap>
          <hotpotBar></hotpotBar>
        </div>

        <!-- 两个采集分析 -->
        <div class="collection-wrap flexbetween">
          <voiceCollect></voiceCollect>
          <picCollect :vPic.sync="vPic"></picCollect>
        </div>
      </section>
      <!-- 智能生产 -->
      <section class="smart-produces cardBg">
        <!-- 两个智能生产 -->
        <smartProduce></smartProduce>
        <smartStatistic></smartStatistic>
      </section>
      <section class="main-map">
        <!-- 地图，后续细分 -->
        <middleEarth></middleEarth>
      </section>
      <section class="smart-analysis cardBg">
        <!-- 写作分析和生产分析 -->
        <smartTechnology></smartTechnology>
        <smartWrite></smartWrite>
      </section>
      <section class="audit-distribute flexbetween">
        <contentAudit :vContent.sync="vContent"></contentAudit>
        <distributeList></distributeList>
        <smartProof></smartProof> <spread></spread>
      </section>
      <!-- 新内容 ↑ ↑↑↑↑↑-->
    </main>
  </div>
</template>

<script>
// test
import hotpotMap from "@/views/A-left-map";
import hotpotBar from "@/views/A-left-bar";

// const
// import scroll from "@/views/test-scroll";
// 音频图像收集
import voiceCollect from "@/views/A-voice-collect";
import picCollect from "@/views/A-pic-collect";
// 分发审核
import contentAudit from "@/views/A-audit-distribute/contentAudit.vue";
import distributeList from "@/views/A-audit-distribute/distributeList.vue";
import smartProof from "@/views/A-audit-distribute/smartProof.vue";
import spread from "@/views/A-audit-distribute/spread.vue";

// 智能生产
import smartProduce from "@/views/A-smart-produce/smartProduce.vue";
import smartStatistic from "@/views/A-smart-produce/smartStatistic.vue";
// 智能技术生产
import smartTechnology from "@/views/A-smart-technology/smartTechnology.vue";
import smartWrite from "@/views/A-smart-technology/smarWriteCount.vue";
// 中间地球
import middleEarth from "@/views/A-earth/indexvideo";
export default {
  name: "home",
  components: {
    voiceCollect,
    picCollect,
    contentAudit,
    distributeList,
    smartProof,
    spread,
    smartProduce,
    smartStatistic,
    smartWrite,
    smartTechnology,
    middleEarth,
    hotpotMap,
    hotpotBar,
  },

  data() {
    return {
      vPic: {},
      vContent: {},
    };
  },
  created() {},
  mounted() {
    // video1.play(); 视频播放暂停
    //   video1.pause();
    console.log(this.vPic, this.vContent);
  },
  watch: {},
};
</script>
 
<style lang="scss" scoped>
$screenW: 15360px;
$screenH: 3240px;

$todayNewsWidth: 800px;
$todayNewsHeight: 300px;
$todayNewsLeft: ($screenW - $todayNewsWidth) * 0.5;

// 标题区域高度
$topTitleHeight: 420px;

// 主页面高
$mainH: $screenH - $topTitleHeight - 100px;

$hotWordW: 870px;
// 用户量运营
$mediaOperationW: 980px;

// 右侧整体
$layoutRightW: 1790px;

//  现场云 + 稿件运营
$layoutRightLeftW: 810px;
// 现场云高度 ，稿件运营为calc计算值
$liveCloudH: 570px;

// 直播 + ai合成主播
$layoutRightRightW: 930px;
// 现场直播
$liveVideoH: 640px;

// map
$middleMapWidth: 5120px - $hotWordW - $mediaOperationW - $layoutRightW;

// 单列高度
$colHeight: 2380px;
// 单个卡片高度
$cardHeight: 1210px;
// 修改了 背景图
#home {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #0a1665;
  background-image: linear-gradient(
      90deg,
      rgba(180, 180, 180, 0.1) 0%,
      rgba(0, 0, 0, 0) 5%
    ),
    linear-gradient(rgba(180, 180, 180, 0.1) 5%, rgba(0, 0, 0, 0) 0%);
  background-size: 94px 94px;
}
.home {
 padding-top: 62px;
  .top-title {
    position: relative;
    height: 420px;
    margin: 0 auto;
    width: 14955px;
     z-index: 99;
    background: url("../../public/img/top.png") no-repeat;
    background-size: 100% 100%;
    p {
      position: absolute;
      height: 304px;
      left: 6710px;
      top: 50px;
      font-family: Microsoft YaHei;
      font-style: normal;
      font-weight: bold;
      font-size: 200px;
      line-height: 304px;
      text-align: center;
      letter-spacing: 80px;
      color: #ffffff;
      text-shadow: 0px 0px 21px #00b8ff, 0px 0px 38px #00b8ff;
    }
  }

  .main {
    // visibility: hidden;
    & > section {
      box-sizing: border-box;
      height: $colHeight;
      margin-top: 130px;
      // background-color: plum;
    }
    // width: calc(100% - 220px);
    height: $mainH;
    display: flex;
    justify-content: flex-start;
    margin: 0 160px;
    .hotspot-collection {
      width: 3720px;
      // background: url("../../public/img/map-card.png") no-repeat;
      background-size: 100% 100%;
      margin-right: 280px;
    }
    .smart-produces {
      width: 1520px;
      background: url(../../public/img/left-border.png) no-repeat;
      background-size: 100% 100%;
      margin-right: 300px;
    }
    .main-map {
      margin-right: 280px;
    width: 3720px;
    }
    .smart-analysis {
      padding-left: 20px;
      width: 1500px;
        margin-right: 320px;
      background: url(../../public/img/right-border.png) no-repeat;
      background-size: 100% 100%;
    }
    .audit-distribute {
      width: 3640px;
      display: flex;
      flex-flow: wrap;
      justify-content: flex-start;
    }
  }
}
.hotspot-wrap {
  display: flex;
  height: 1110px;
  background: url("../../public/img/map-card.png") no-repeat;
  background-size: 100% 100%;
}
.collection-wrap {
  margin-top: 104px;
  height: $cardHeight;
}
// .cardBg {
//   background: url("../../public/img/cardBg.png") no-repeat;
//   background-size: 100% 100%;
// }
</style>
