<template>
  <div class="smartTechnology">
    <p class="card-title">智能技术应用</p>
    <div class="title-detail">智能图像修复</div>
    <div class="img-wrap">
      <div class="img-scan">
        <div class="line"></div>
      </div>
      <div
        class="img-filter"
        :style="{
          '--toPlain': toPlain,
          '--plained': plained,
        }"
      >
        <div class="line"></div>
      </div>

      <!-- <img src="img/aioffice_aipic.png" alt="" class="aipic" /> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toPlain: '',
      plained: '',
      repaired: './repair.png',
      toRepair: './repair.png',
    }
  },
  created() {
    // this.$api.jinan_module.smartTechnology().then(({ data }) => {
    //   if (data) {
    //     this.repaired = `url(${data.repaired})`;
    //     this.toRepair = `url(${data.toRepair})`;
    //     this.toPlain = `url(${data.toPlain})`;
    //     this.plained = `url(${data.plained})`;
    //   }
    // });
  },
}
</script>

<style lang="scss" scoped>
.img-wrap {
  // text-align: center;
  position: relative;
  margin-left: 42px;
  height: 545px;
  margin-top: 100px;
}
.img-filter,
.img-scan {
  position: relative;
  width: 715px;
  height: 100%;
  display: inline-block;
  overflow: hidden;
  &::after,
  &::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
}
.img-scan {
  &::after,
  &::before {
    background-position: center center;
  }
  &::before {
    z-index: 10;
    background-image: url('../../../public/img/to-repair.png');
    // background-image: var(--toRepair);
  }
  &::after {
    z-index: 15;
    animation: clip 3s infinite alternate linear;
    background-size: auto;
    background-image: url('../../../public/img/repair.png');
    // background-image: var(--repaired);
  }
}
.img-filter {
  &::before {
    z-index: 10;
    filter: blur(5px);
    background-image: url('../../../public/img/to-repair.png');
    // background-image: var(--toPlain);
  }
  &::after {
    z-index: 15;
    // transform: scale(2);
    animation: clip 3s infinite alternate linear;
    background-image: url('../../../public/img/repair.png');
    // background-image: var(--plained);
  }
}
.aipic {
  width: 98%;
  height: 545px;
  margin: 70px auto 0;
}
.smartTechnology {
  margin-bottom: 100px;
}
.line {
  width: 30px;
  height: 100%;
  position: absolute;
  background: url('../../../public/img/1.png') no-repeat;
  background-size: 100% 100%;
  animation: back 3s infinite alternate linear;
  top: 0;
  z-index: 20;
}
@keyframes back {
  0% {
    transform: translateX(200px);
  }
  100% {
    transform: translateX(415px);
  }
}
@keyframes clip {
  0% {
    clip-path: polygon(30% 0, 100% 0, 100% 100%, 30% 100%);
  }

  100% {
    clip-path: polygon(60% 0, 100% 0, 100% 100%, 60% 100%);
  }
}
.card-title {
  padding-top: 80px;
  &::before {
    top: 87px;
  }
}
.title-detail {
  margin-left: 40px;
}
</style>
