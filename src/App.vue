<template>
  <!-- <div id="app" :style="bg"> -->
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      bg: {
        backgroundRepeat: "no-repeat",
      },
    };
  },
  mounted() {
    window.onpopstate = () => {
      history.go(1); //全局禁用返回按钮 ， 后期可根据router配置返回
    };
  },
};
</script>
 <style lang="" >
</style>
 <style>
@import "./assets/css/temp.css";
</style>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  /*border:1px solid red;*/
  word-break: break-all;
  box-sizing: border-box;
  font-family: Songti SC;
  font-style: normal;

}
body {
  user-select: none;
}
#app {
  width: 15360px;
  height: 3240px;
  overflow: hidden;
  box-sizing: border-box;
}
/*全局滚动条样式*/
::-webkit-scrollbar {
  width: 5px;
  height: 14px;
}

::-webkit-scrollbar-thumb {
  /* background-color: #01c8dc;
border-radius: 3px; */
  background-color: #b6b6b6;
}
/*全局滚动条样式结束*/

@import "./assets/css/common.scss";
</style>