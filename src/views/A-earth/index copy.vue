<template>
  <div class="center-middle">
    <section class="roll-bg"></section>
    <section class="stage">
      <figure class="ball flex">
        <div class="ball1"></div>
      </figure>
    </section>

    <div class="aidate1">
      <p>596</p>
      <img class="flash-1" src="img/fluorescent.gif" alt="" />
      <span>本周总生产</span>
    </div>
    <div class="aidate2">
      <p>596</p>
      <img class="flash-2" src="img/fluorescent.gif" alt="" />
      <span>视频生产</span>
    </div>
    <div class="aidate2">
      <p>596</p>
      <img class="flash-3" src="img/fluorescent.gif" alt="" />
      <span> 图文生产</span>
    </div>
    <div class="aidate2">
      <p>596</p>
      <img class="flash-4" src="img/fluorescent.gif" alt="" />
      <span>音频生产</span>
    </div>
    <ol class="centerMiddle-ol">
      <div class="col1">物联网</div>
      <div class="flex flexbetween">
        <div class="col2 flex">
          <img width="710" height="400" src="img/aiotmap.png" alt="" />
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
          <img style="margin-right: 150px" src="img/aicamera1.png" alt="" />
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
export default {};
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
.center-middle > div > p {
  font-size: 86px;
  line-height: 120px;
  letter-spacing: 2px;
  text-shadow: 0px 0px 42px #00b8ff, 0px 0px 23px #00b8ff;
  padding: 40px;
  text-align: center;
  margin-bottom: 330px;
}

.center-middle > div > span {
  color: #00e4ff;
  line-height: 96px;
  letter-spacing: 1px;
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
  overflow: hidden;
  perspective: 1200px;
  perspective-origin: 50% 50%;
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

.col2 > img {
  width: 710px;
  height: 400px;
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
</style>