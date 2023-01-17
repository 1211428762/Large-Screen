<template>
  <div class="map-stacks">
    <div class="wrapper" ref="wrapper">
      <div><p class="card-title">实时热点</p></div>
      <div id="map-layer-1" class="map-layer" ref="map-layer-1"></div>
      <!-- <div id="map-layer-2" ref="layer2" class="map-layer"></div> -->
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
// import "echarts-gl";
// import "echarts/map/js/china.js";
// import deepClone from "./deepClone";

export default {
  name: "mapMiddle",
  components: {},
  props: [],
  data() {
    return {
      mapDelay: null, //地图轮播定时器
      inPoint: false,
      queryParam: "",
      callDialog: false,
      callType: "视频通话",
      nextCallType: "视频通话",
      callingPerson: [
        {
          name: "张1",
          avatar: "https://picsum.photos/300/200",
          status: "normal", //状态  "access"正在接入 "missed" 未接通    "off"挂断   // normal 正常接听
        },
      ],
      isSingle: true,
      map2option: {},
      base64img: [],
      _map2data: [],
      map1Echarts: null,
      _echarts2: "",
      user: [],
      timerIndex: 0,
      timerObj: null,
      isCalling: false,
      isChecked: false,
      nextName: "",
      nextAvatar: "",
      nextStatus: "",
      nextIsSingle: false,
      mapDate: [
        {
          name: "内蒙古",
          value: [101.65, 40.82, 16],
        },
        {
          name: "西藏",
          value: [89.11, 27.97, 40],
        },
        {
          name: "山东",
          value: [119, 36.65, 63],
        },
        {
          name: "新疆",
          value: [80.68, 42.77, 63],
        },
      ],
    };
  },
  watch: {},
  computed: {},
  mounted() {
    this.init();
    const that = this;

    window.clickSingleAudio = function (name, avatar, status) {
      that.clickSingleAudio(name, avatar, status);
    };

    window.clickSingleVideo = function (name, avatar, status) {
      that.clickSingleVideo(name, avatar, status);
    };
  },
  methods: {
    init() {
      this.renderMap1();
      // this.renderMap2();
      // this._echarts2 = echarts.init(this.$refs["layer2"]);
    },
    renderMap1() {
      let option = require("../../../public/json/map-middle-map1.json");
      option.visualMap = {
        min: 0,
        max: 100,
        splitNumber: 4,
        itemWidth: 52,
        inverse: true,
        text: ["高", "低"],
        textGap: 26,
        itemGap: 26,
        orient: "horizontal",
        itemHeight: 52,
        seriesIndex: 1,
        type: "piecewise",
        bottom: 50,
        textStyle: {
          fontSize: 36,
          color: "#748AA1",
        },
        inRange: {
          color: ["#0082D2", "#00AAE1", "#00D7E1", "#00D2AA"],
        },
      };
      option.geo = {
        map: "china",
        // aspectScale: 0.75, //长宽比
        // zoom: 1.1,
        top: 85,
        left: 400,
        zoom: 1.1,
        roam: false,
        itemStyle: {
          normal: {
            areaColor: "#013C62",
            shadowColor: "#182f68",
            shadowOffsetX: 0,
            shadowOffsetY: 25,
          },
          emphasis: {
            areaColor: "#2AB8FF",
            borderWidth: 0,
            color: "green",
            label: {
              show: false,
            },
          },
        },
      };

      let partoption = {
        type: "effectScatter",
        coordinateSystem: "geo",
        showEffectOn: "render",
        rippleEffect: {
          period: 15,
          scale: 4,
          brushType: "fill",
        },
        // hoverAnimation: true,
        itemStyle: {
          normal: {
            color: "#ffff",
            shadowBlur: 10,
            shadowColor: "#333",
          },
        },
        data: this.mapDate,
      };
      option.series.push(partoption);

      let chinaJson = require("../../../public/json/china.json");
      echarts.registerMap("china", chinaJson);

      this.map1Echarts = echarts.init(this.$refs["map-layer-1"]);
      this.map1Echarts.setOption(option);
      // _echarts.dispatchAction({
      //   type: 'highlight',
      //   seriesIndex: 0,
      //   // dataIndex: 1 + 1
      //   name: '山西'
      // });
    },
    // renderMap2() {
    //   const that = this;
    //   let option = require("../../../public/json/map-middle-map2.json");
    //   let _data = require("../../../public/json/map-middle-map2-data.json");

    //   option.series[0].data = _data.data;

    //   // console.log(_data.data);

    //   this.user = deepClone(_data.data);

    //   this._map2data = _data.data;
    //   this._map2data.forEach((cur, index) => {
    //     that.getCircleImgBase64(cur.avatar, index);
    //   });
    //   option.series[0].data = this._map2data.data;
    //   option.series[0].tooltip.formatter = function (params) {
    //     const _data = params.data;
    //     const label =
    //       `
    //       <div class='tooltip-container'>
    //         <div class='top-container'>
    //           <span>${_data.name}</span>
    //           <img src='img/call.png' class='video' onclick="clickSingleVideo(\'` +
    //       _data.name +
    //       `\',\' ` +
    //       _data.avatar +
    //       `\',\' ` +
    //       _data.status +
    //       `\')" />
    //           <img src='img/maike.png' class='audio' onclick="clickSingleAudio(\'` +
    //       _data.name +
    //       `\',\' ` +
    //       _data.avatar +
    //       `\',\' ` +
    //       _data.status +
    //       `\')" />
    //         </div>
    //         <div class='detail-container'>
    //           <p>位置：${_data.location}</p>
    //           <p>待办任务数：${_data.todo}</p>
    //           <p>涉及选题数：${_data.topic}</p>
    //           <p>今日报道数：${_data.report}</p>
    //         </div>
    //       </div>
    //       `;
    //     return label;
    //   }.bind(that);
    //   (option.series[0].symbol = function (val, params) {
    //     console.log(val, params);
    //     if (params.data.avatar) {
    //       return params.data.avatar;
    //     } else {
    //       return "image://https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2508276534,666547796&fm=26&gp=0.jpg";
    //     }
    //   }),
    //     (this.map2option = option);

    //   this._echarts = echarts.init(this.$refs["layer2"]);
    //   // 鼠标进入散点时下面对应地图高亮
    //   this._echarts.on("mousemove", (e) => {
    //     // console.log(e,"**********************");

    //     that.map1Echarts.dispatchAction({
    //       type: "highlight",
    //       seriesIndex: 0,
    //       name: e.data.province,
    //     });
    //   });

    //   // 轮播tip
    //   this.timer();
    //   // 鼠标移入取消定时器

    //   this._echarts.getZr().on("mousemove", () => {
    //     // 取消高亮地图
    //     that.map1Echarts.dispatchAction({
    //       type: "downplay",
    //       seriesIndex: 0,
    //     });

    //     if (!that.inPoint) {
    //       that._echarts.dispatchAction({
    //         type: "downplay",
    //         seriesIndex: 0,
    //       });
    //     }
    //     clearInterval(that.timerObj);
    //     that.timerObj = null;
    //     that.timerIndex = 0;
    //   });

    //   this._echarts.getZr().on("mouseout", (e) => {
    //     that.inPoint = false;
    //   });

    //   this._echarts.getZr().on("mouseover", (e) => {
    //     that.inPoint = true;
    //     const idx = e.target.dataIndex;
    //     that._echarts.dispatchAction({
    //       type: "highlight",
    //       seriesIndex: 0,
    //       dataIndex: idx,
    //     });
    //   });

    //   // 鼠标移除加定时器
    //   this._echarts.getZr().on("globalout", () => {
    //     if (!that.timerObj) {
    //       that.timer();
    //     }
    //   });
    // },
    // // 定时任务
    // timerFunc() {
    //   const that = this;
    //   // 取消散点高亮
    //   that._echarts.dispatchAction({
    //     type: "downplay",
    //     seriesIndex: 0,
    //   });
    //   // 取消高亮地图
    //   that.map1Echarts.dispatchAction({
    //     type: "downplay",
    //     seriesIndex: 0,
    //   });
    //   this.hightlight(this.timerIndex);
    // },
    // timer() {
    //   const that = this;
    //   let index = 0;
    //   that.timerObj = setInterval(() => {
    //     that.timerFunc(that.timerIndex);
    //     that.timerIndex++;
    //     if (that.timerIndex === that.map2option.series[0].data.length) {
    //       that.timerIndex = 0;
    //     }
    //   }, 2000);
    //   return that.timerObj;
    // },
    // // 图片处理
    // getCircleImgBase64(param, index) {
    //   const that = this;
    //   const image = new Image();
    //   image.src = param;
    //   image.style = "width: 140px; height: 170px";
    //   image.crossOrigin = "Anonymous";
    //   image.onload = function () {
    //     let src = that.circle_image_v2(image, index);
    //   };
    // },

    // // 图片切圆
    // circle_image_v2(img, index) {
    //   let type = 1;
    //   let radius, diameter, canvas, ctx, natural;
    //   // if (type) {
    //   //     if (img.naturalWidth > img.naturalHeight) {
    //   //         radius = img.naturalHeight / 2 ;
    //   //     } else {
    //   //         radius = img.naturalWidth / 2 ;
    //   //     }
    //   // } else {
    //   //     if (img.width > img.height) {
    //   //         radius = img.height / 2;
    //   //     } else {
    //   //         radius = img.width / 2;
    //   //     }
    //   //     if (img.naturalWidth > img.naturalHeight) {
    //   //         natural = img.naturalHeight;
    //   //     } else {
    //   //         natural = img.naturalWidth;
    //   //     }
    //   // }
    //   radius = 70;
    //   diameter = radius * 2;
    //   canvas = document.createElement("canvas");
    //   if (!canvas.getContext) {
    //     // 判断浏览器是否支持canvas，如果不支持在此处做相应的提示
    //     console.log("您的浏览器版本过低，暂不支持。");
    //     return false;
    //   }
    //   canvas.width = diameter;
    //   canvas.height = diameter + 30;
    //   let contex = canvas.getContext("2d");

    //   contex.clearRect(0, 0, diameter, diameter + 30);
    //   contex.save();
    //   contex.beginPath();
    //   contex.arc(
    //     radius,
    //     radius,
    //     radius - 10,
    //     (Math.PI * 5) / 9,
    //     (Math.PI * 4) / 9,
    //     false
    //   );
    //   contex.lineTo(radius, radius * 2);
    //   // contex.lineTo(10, radius)

    //   contex.closePath();
    //   contex.lineWidth = 10;
    //   contex.strokeStyle = "#34ABFF";
    //   contex.shadowBlur = 11;
    //   contex.shadowColor = "#00B8FF";
    //   contex.stroke();
    //   contex.clip();

    //   if (type) {
    //     contex.drawImage(img, 0, 0, diameter, diameter + 30);
    //   }
    //   // else {
    //   //     contex.drawImage(img, 0, 0, natural, natural, 0, 0, diameter, diameter);
    //   // }

    //   contex.restore();
    //   // TODO: 处理异步方法
    //   this.setNewImg(canvas.toDataURL("image/png"), index);
    // },
    // // 赋值 重绘
    // setNewImg(img, index) {
    //   this.base64img.push(this._map2data[index].name);
    //   this._map2data[index].symbol = "image://" + img;
    //   // console.log(this._map2data[index]);
    //   this.map2option.series[0].data = this._map2data;
    //   if (this.base64img.length === this._map2data.length) {
    //     this._echarts.setOption(this.map2option, true);
    //   }
    // },
    // // 高亮散点及对应地图
    // hightlight(index) {
    //   // 展示搜索到的散点信息
    //   this._echarts.dispatchAction({
    //     type: "showTip",
    //     seriesIndex: 0,
    //     dataIndex: index,
    //   });
    //   // 高亮散点
    //   this._echarts.dispatchAction({
    //     type: "highlight",
    //     seriesIndex: 0,
    //     dataIndex: index,
    //   });
    //   // 高亮散点对应地区地图
    //   this.map1Echarts.dispatchAction({
    //     type: "highlight",
    //     seriesIndex: 0,
    //     name: this._map2data[index].province,
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
.map-stacks {
  position: relative;
  margin-right: 336px;
}
.search-btn {
  position: absolute;
  width: 100px;
  height: 100px;
  cursor: pointer;
  top: 10%;
  right: 0;
}

.wrapper {
  position: relative;
  overflow: hidden;
  width: 1480px;
  height: 1006px;
  //   margin-top: 159px;
}

.map-layer {
  width: 1380px;
  height: 990px;
  margin: 48px 336px auto 76px;
  position: absolute;
  top: 0;
  left: 0;
}

#map-layer-2 {
  transform-origin: center;
  transform: translate(-50%, -50%);
  top: 45%;
  left: 50%;
}
</style>
<style lang="scss">
.tooltip-container {
  width: 540px;
  height: 466px;
  word-wrap: break-word;
  // background-image: url("../../../public/img/cardbg.png");
  background-size: contain;

  .top-container {
    padding-top: 43px;
    margin-left: 37px;
    height: 67px;
    font-size: 48px;
    line-height: 67px;
    letter-spacing: 1px;
    text-shadow: 0px 0px 37px #00b8ff, 0px 0px 21px #00b8ff;
    font-family: PingFangSC-Medium, PingFang SC;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    .video {
      margin-left: 240px;
      width: 56px;
      height: 51px;
      // background: #ffffff;
      // box-shadow: 0px 0px 37px 0px #00b8ff, 0px 0px 21px 0px #00b8ff;
      pointer-events: auto;
    }
    .audio {
      margin-left: 33px;
      width: 38px;
      height: 56px;
      // background: #ffffff;
      // box-shadow: 0px 0px 37px 0px #00b8ff, 0px 0px 21px 0px #00b8ff;
      pointer-events: auto;
    }
  }

  .detail-container {
    margin-top: 21px;
    margin-left: 37px;
    margin-right: 37px;
    margin-bottom: 43px;
    width: 466px;
    // height: 272px;
    font-size: 36px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    text-shadow: 0px 0px 37px #00b8ff, 0px 0px 21px #00b8ff;
    word-wrap: break-word;
    box-sizing: border-box;
    text-overflow: ellipsis;
    white-space: pre-wrap;

    p:first-child {
      line-height: 50px;
    }
  }
}
</style>