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
import * as echarts from 'echarts'
// import "echarts-gl";
// import "echarts/map/js/china.js";
// import deepClone from "./deepClone";

export default {
  name: 'mapMiddle',
  components: {},
  props: [],
  data() {
    return {
      mapDelay: null, //地图轮播定时器
      inPoint: false,
      queryParam: '',
      callDialog: false,
      callType: '视频通话',
      nextCallType: '视频通话',
      callingPerson: [
        {
          name: '张1',
          avatar: 'https://picsum.photos/300/200',
          status: 'normal', //状态  "access"正在接入 "missed" 未接通    "off"挂断   // normal 正常接听
        },
      ],
      isSingle: true,
      map2option: {},
      base64img: [],
      _map2data: [],
      map1Echarts: null,
      _echarts2: '',
      user: [],
      timerIndex: 0,
      timerObj: null,
      isCalling: false,
      isChecked: false,
      nextName: '',
      nextAvatar: '',
      nextStatus: '',
      nextIsSingle: false,
      mapDate: [
        // {
        //   name: "山东",
        //   value: [117.000923,36.675807],
        //   highlight: true,
        // },
        // {
        //   name: "内蒙古",
        //   value: [111.670801,40.818311],
        //   highlight: false,
        // },
        // {
        //   name: "西藏",
        //   value: [91.132212,29.660361],
        //   highlight: false,
        // },
        // {
        //   name: "新疆",
        //   value: [87.617733,43.792818],
        //   highlight: false,
        // },
        // {
        //   name: "湖北",
        //   value: [114.298572,30.584355],
        //   highlight: false,
        // },
      ],
    }
  },
  watch: {},
  computed: {},
  mounted() {
    this.init()
    const that = this

    // window.clickSingleAudio = function (name, avatar, status) {
    //   that.clickSingleAudio(name, avatar, status);
    // };

    // window.clickSingleVideo = function (name, avatar, status) {
    //   that.clickSingleVideo(name, avatar, status);
    // };
  },
  methods: {
    init() {
      // this.$api.jinan_module.hotpotList().then(({ data }) => {
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
      mapDate.forEach((cur, index) => {
        this.mapDate.push({
          value: cur.coordinates,
          highlight: index === 0 ? true : false,
          name: cur.place,
        })
      })
      this.renderMap1()
      // })

      // this.renderMap2();
      // this._echarts2 = echarts.init(this.$refs["layer2"]);
    },
    renderMap1() {
      // console.log(this.mapDate);
      let option = require('../../../public/json/map-middle-map1.json')
      option.visualMap = {
        type: 'piecewise',
        min: 0,
        max: 100,
        splitNumber: 4,
        itemWidth: 52,
        inverse: true,
        // realtime: false,
        //     calculable : true,
        text: ['高', '低'],
        textGap: 26,
        itemGap: 26,
        orient: 'horizontal',
        itemHeight: 52,
        // seriesIndex: 1,

        bottom: 50,
        textStyle: {
          fontSize: 36,
          color: '#748AA1',
        },
        inRange: {
          color: ['#0082D2', '#00AAE1', '#00D7E1', '#00D2AA'],
        },
      }
      option.geo = {
        map: 'china',
        // aspectScale: 0.75, //长宽比
        zoom: 1,
        top: 65,
        left: 0,
        layoutCenter: ['50%', '65%'],
        layoutSize: 1200,
        roam: false,
        silent: true,
        itemStyle: {
          normal: {
            areaColor: '#044d87',
            // shadowColor: "#182f68",
            // shadowOffsetX: 0,
            // shadowOffsetY: 25,
          },
          emphasis: {
            borderWidth: 0,
            label: {
              show: false,
            },
          },
        },
        label: {
          normal: {
            show: false,
          },
          emphasis: {
            show: false,
          },
        },
      }
      option.animationDuration = 500
      let symbolImg = 'image://' + require('../../../public/img/scatter-symbol.png')
      let symbolHighlightImg = 'image://' + require('../../../public/img/scatter-symbol-highlight.png')
      let partoption = {
        type: 'scatter',
        coordinateSystem: 'geo',
        geoIndex: 0,
        // symbol: symbolImg,
        symbol: (value, param) => {
          // console.log(value, param);
          if (param.data.highlight) {
            return symbolHighlightImg
          } else {
            return symbolImg
          }
        },
        symbolSize: () => {
          return [82, 106]
        },
        symbolOffset: [0, '-50%'],
        itemStyle: {
          normal: {
            color: '#ffff',
            shadowBlur: 10,
            shadowColor: '#333',
          },
        },
        // emphasis: {
        //   itemStyle: {
        //     color: "red"
        //   }
        // },
        data: this.mapDate,
      }
      option.series.push(partoption)
      this.map1Echarts = echarts.init(this.$refs['map-layer-1'])

      // console.log(partoption.data, partoption.data.length)
      let chinaJson = require('../../../public/json/china.json')
      echarts.registerMap('china', chinaJson)
      // console.log(option, "option");
      this.map1Echarts.setOption(option)
      // _echarts.dispatchAction({
      //   type: 'highlight',
      //   seriesIndex: 0,
      //   // dataIndex: 1 + 1
      //   name: '山西'
      // });
      // setTimeout(() => {
      //   this.map1Echarts.dispatchAction({
      //     type: 'highlight',
      //     seriesIndex: 1,
      //     dataIndex: 1,
      //   });
      //   option.series[1].data[1].highlight = true
      //   console.log(option);
      //   this.map1Echarts.setOption(option);
      // }, 2000);
      let maxlength = option.series[1].data.length
      let dataIndex = 0
      setInterval(() => {
        if (dataIndex < maxlength) {
          // this.map1Echarts.dispatchAction({
          //   type: 'highlight',
          //   seriesIndex: 1,
          //   dataIndex: dataIndex,
          // });
          option.series[1].data.map((i) => {
            i.highlight = false
          })
          // option.series[1].data[dataIndex].highlight = true
          // console.log(option.series[1].data);
          this.map1Echarts.setOption(option)
          setTimeout(() => {
            option.series[1].data[dataIndex].highlight = true
            this.map1Echarts.setOption(option)
          }, 600)
        }
        dataIndex++
        if (dataIndex >= maxlength) {
          dataIndex = 0
        }
      }, 4000)
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
}
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
