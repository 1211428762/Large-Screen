<template>
  <div class="center-middle">
    <section class="roll-bg"></section>
    <section class="stage">
      <!-- <figure ref="globe" class="ball flex">
        <div class="ball1"></div>
      </figure> -->
      <div
        ref="globe"
        style="width: 1544px; height: 1555px; margin-top: 180px"
      ></div>
      <img src="img/chassis.png" alt="" />
    </section>

    <div class="aidate1">
      <number
        :delay="400"
        class="number"
        
       v-if="dataList[0]"
        :endVal="dataList.reduce((pre, cur) => pre + cur)"
      ></number>

      <!-- <p >{{ dataList[0] }}</p> -->
      <img class="flash-1" src="img/fluorescent.gif" alt="" />
      <span>本周总生产</span>
    </div>
    <div class="aidate2">
      <number
        :delay="400"
        class="number"
        
        v-if="dataList[0]"
        :endVal="dataList[0]"
      ></number>

      <img class="flash-2" src="img/fluorescent.gif" alt="" />
      <span>视频生产</span>
    </div>
    <div class="aidate2">
      <number
        :delay="400"
        class="number"
        
        v-if="dataList[1]"
        :endVal="dataList[1]"
      ></number>

      <img class="flash-3" src="img/fluorescent.gif" alt="" />
      <span> 图文生产</span>
    </div>
    <div class="aidate2">
      <number
        :delay="400"
        class="number"
        
        v-if="dataList[2]"
        :endVal="dataList[2]"
      ></number>

      <img class="flash-4" src="img/fluorescent.gif" alt="" />
      <span>音频生产</span>
    </div>
    <ol class="centerMiddle-ol">
      <div class="col1">物联网</div>
      <div class="flex flexbetween">
        <div class="col2 flex">
          <figure class="aiImg-wrap">
            <img class="aiImg-map" src="img/aiotmap.png" alt="" />
            <img
              :style="location"
              class="aiImg-location "
              src="img/aiotmap-location.gif"
              alt=""
            />
          </figure>

          <ul class="flex flexcolumn">
            <li class="flexbetween">
              <span class="iotSpan">
                <img src="img/location.png" alt="" /> 当前位置
              </span>
              <div>融媒体中心</div>
            </li>
            <li class="flexbetween">
              <span class="iotSpan">
                <img src="img/thermometer.png" alt="" /> 26℃
              </span>
              <div class="water-span">
                <img src="img/water.png" alt="" /> 60%RH
              </div>
            </li>
            <li class="flexbetween">
              <span class="iotSpan"
                ><img src="img/heart.png" alt="" /> 健康状况
              </span>
              <div>张三 久坐</div>
            </li>
          </ul>
        </div>
        <div class="col2 flex">
          <figure class="hunman-status">
            <el-carousel height="380px" arrow="never" indicator-position="none">
              <el-carousel-item
                v-for="(item, index) in hunmanImg"
                :key="item + index"
              >
                <img :src="item" alt="" />
              </el-carousel-item>
            </el-carousel>
            <!-- <img src="img/aicamera1.png" alt="" /> -->
          </figure>
          <ul>
            <li class="flexbetween">
              <span class="iotSpan">
                <img src="img/abnormal.png" alt="" /> 人流量
              </span>
              <span>30</span>
            </li>
            <li class="flexbetween">
              <span class="iotSpan">
                <img
                  style="top: 0; width: 90px; height: 70px"
                  src="img/temperature.png"
                  alt=""
                />
                体温检测</span
              >
              <span>36.5℃</span>
            </li>
            <li class="flexbetween">
              <span class="iotSpan">
                <img src="img/abnormal.png" alt="" />异常情况</span
              >
              <span>0</span>
            </li>
          </ul>
        </div>
      </div>
    </ol>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-gl";
export default {
  data() {
    return {
      dataList: [],
      locationLeft: _.random(30, 70) + "%",
      locationTop: _.random(30, 70) + "%",
      hunmanImg: [
        "https://picsum.photos/id/5/300/300",
        "https://picsum.photos/id/6/300/300",
        "https://picsum.photos/id/7/300/300",
        "https://picsum.photos/id/8/300/300",
        "https://picsum.photos/id/9/300/300",
      ],
      videoSrc: "earth.mp4",
      index: 0,
    };
  },
  computed: {
    location() {
      return {
        left: this.locationLeft,
        top: this.locationTop,
      };
    },
  },
  created() {
    this.$api.jinan_module.productionStatistic().then(({ data }) => {
      if (data) {
        this.dataList = data.data.dataList;
      }
    });
  },
  mounted() {
    setInterval(() => {
      this.locationLeft = _.random(30, 70) + "%";
      this.locationTop = _.random(30, 70) + "%";
    }, 3000);
    this.renderGlobe();
  },
  methods: {
    videoIndex() {
      this.index++;
      if (this.index === 4) {
        this.index = 0;
      }
      let arr = ["earth.mp4", "video1.mp4", "video2.mp4", "video3.mp4"];
      this.videoSrc = arr[this.index];
    },
    renderGlobe() {
      let myChart = echarts.init(this.$refs["globe"]);

      let option = {
        globe: {
          baseTexture: "img/world.jpg",
          heightTexture: "img/world.jpg",
          realisticMaterial: {
            roughness: 0.9,
          },
          postEffect: {
            enable: true,
          },
          viewControl: {
            autoRotate: true,
            distance: 200,
            targetCoord: [123.38, 6.09],
          },
        },
        visualMap: [
          {
            show: false,
            type: "continuous",
            seriesIndex: 0,
            text: ["scatter3D"],
            textStyle: {
              color: "#fff",
            },
            calculable: true,
            max: 3000,
            inRange: {
              color: ["#87aa66", "#eba438", "#d94d4c"],
            },
          },
        ],
        series: [
          {
            name: "lines3D",
            type: "lines3D",
            coordinateSystem: "globe",
            effect: {
              show: true,
              period: 2,
              trailWidth: 3,
              trailLength: 0.5,
              trailOpacity: 1,
              trailColor: "#0087f4",
            },
            blendMode: "lighter",
            lineStyle: {
              // width: 2
              width: 1,
              color: "#0087f4",
              opacity: 0,
            },
            data: [],
            silent: false,
          },
        ],
      };
      for (let i = 0; i < 50; i++) {
        option.series[0].data = option.series[0].data.concat(this.rodamData());
      }
      myChart.setOption(option);
    },
    rodamData() {
      let name = "随机点" + Math.random().toFixed(5) * 100000;
      // let longitude = Math.random() * 62 + 73
      let longitude = 110.00;
      let longitude2 = Math.random() * 360 - 180;
      // let latitude = Math.random() * 50 + 3.52
      let latitude = 15.41; 
      let latitude2 = Math.random() * 180 - 90;
      return {
        coords: [
          [longitude2, latitude2],
          [longitude, latitude],
        ],
        value: (Math.random() * 3000).toFixed(2),
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.center-middle {
  font-size: 64px;
  text-align: center;
  color: white;
  position: relative;
  height: 100%;
}
.center-middle > div {
  position: absolute;
  width: 497px;
  height: 767px;
  background-image: url("../../../public/svg/aidatebg.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}

.center-middle > div:nth-of-type(2) {
  right: 0;
}

.center-middle > div:nth-of-type(3) {
  left: 205px;
  top: 840px;
}

.center-middle > div:nth-of-type(4) {
  right: 209px;
  top: 840px;
}
.centerMiddle-ol {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 5px 10px;
  width: 3657px;
  height: 545px;
  background-image: url("../../../public/svg/aioffice_center_bottomBg.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.center-middle > div > .number {
  font-size: 86px;
line-height: 140px;
  letter-spacing: 2px;
  text-shadow: 0px 0px 42px #00b8ff, 0px 0px 23px #00b8ff;
  padding: 40px;
  display: inline-block;
  text-align: center;
  margin-bottom: 330px;
  position: absolute;
  width: 100%;
  color: white;
  z-index: 999999;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  left: 0px;
  top: -10px;
}

.center-middle > div > span {
  color: #00e4ff;
  line-height: 96px;
  letter-spacing: 1px;
  width: 380px;
  position: absolute;
  bottom: 100px;
  left: 10%;
  // padding-left: 120px;
}
.ball {
  top: -108px;
  justify-content: center;
  display: inline-flex;
  height: 1931px;
  width: 1931px;
  margin: 0;
  border-radius: 50%;
  position: relative;
  transform-style: preserve-3d;
  background: url("../../../public/img/earth1.png") repeat-x;
  background-size: cover;
  animation: move-map 30s infinite linear;
  z-index: 3;
  justify-content: center;
  align-items: center;
}

.ball1 {
  width: 1600px;
  height: 1600px;
  margin: 0;
  border-radius: 50%;
  position: relative;
  transform-style: preserve-3d;
  background: url("../../../public/img/earth.png") repeat-x;
  background-size: cover;
  animation: move-map 30s infinite linear;
  z-index: -1;
}

.ball1:before {
  content: "";
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: -40px 10px 70px 10px rgba(0, 0, 0, 0.1) inset;
  z-index: 2;
}

.ball1:after {
  content: "";
  position: absolute;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  filter: blur(0);
  opacity: 0.2;
  background: radial-gradient(
    circle at 50% 80%,
    #81e8f6,
    #76deef 10%,
    #055194 66%,
    #062745 100%
  );
}

.stage {
  position: absolute;
  left: 900px;
  top: -90px;
  height: 1772px;
  width: 1931px;
  border-radius: 0px;
  display: flex;
  justify-content: center;
  margin: auto;
  pointer-events: none;
  // overflow: hidden;
  perspective: 1200px;
  perspective-origin: 50% 50%;
  img {
    position: absolute;
    bottom: -200px;
    // left: 100px;
  }
}

@keyframes move-map {
  0% {
    background-position: -3679px 0;
  }

  100% {
    background-position: 0 0;
  }
}

.col1 {
  background-image: linear-gradient(to right, #00709b, rgba(0, 0, 0, 0) 20%);
  line-height: 118px;
  padding-left: 75px;
  font-size: 82px;
  font-weight: bolder;
  text-align: left;
}

.col2 {
  height: 100%;
  padding-left: 100px;
  padding-right: 150px;
  font-size: 52px;
}

.col2 figure .aiImg-map {
  width: 668px;
  height: 380px;
  margin-top: 20px;
  margin-right: 100px;
}

.col2 > ul {
  li {
    margin-bottom: 77px;
    img {
      vertical-align: middle;
    }
  }
  // justify-content: space-between;
}

.col2 > ul svg {
  width: auto;
  max-width: 52px;
  height: 52px;
  vertical-align: -35px;
  margin-right: 15px;
}
.iotSpan {
  position: relative;
  padding-left: 80px;
  img {
    position: absolute;
    left: 0;
    top: -10px;
    height: 84px;
    vertical-align: middle;
  }
  font-size: 52px;
  color: #02a8db;
  padding-right: 35px;
}
.water-span {
  padding-left: 90px;
  position: relative;
  margin-right: 100px;
  img {
    position: absolute;
    width: 84px;
    left: 0;
    top: -10px;
  }
}
.aidate1,
.aidate2 {
  text-align: center;
  img {
    position: absolute;
    top: 180px;
    left: 75px;
    border-radius: 40%;
  }
}
.roll-bg {
  display: none;
  position: absolute;
  left: 920px;
  top: -160px;
  height: 1900px;
  width: 1900px;
  background: url("../../../public/img/earth-ring.png") no-repeat center;
  background-size: 100% 100%;
  animation: roll 5s infinite linear;
}
@keyframes roll {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.aiImg-wrap {
  position: relative;
  .aiImg-location {
    position: absolute;
  
    width: 50px;
    height: 100px;
  }
}
.floatArrow {
  animation: floatArrow 0.5s infinite alternate;
}
@keyframes floatArrow {
  0% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(10px);
  }
}
.hunman-status {
  margin-right: 150px;
  margin-bottom: 30px;
  width: 755px;
  height: 380px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>