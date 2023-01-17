import Vue from 'vue'
import App from './App.vue'

// element
import ElementUI from 'element-ui' //注册element
import 'element-ui/lib/theme-chalk/index.css' //注册element

// vue-video-player
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

import api from './api' //添加axios接口api
import store from './store' //添加vuex
import router from './router' //添加router
import echarts from 'echarts'
// import * as echarts from 'echarts';
import global from './utils/global';
import '@/icons' //引入svg

Vue.config.productionTip = false
Vue.use(ElementUI); //注册element
Vue.use(api); //添加axios接口api
Vue.prototype.$echarts = echarts
Vue.prototype.$public = "http://127.0.0.1:5500/dist/"

import _ from 'lodash'
Vue.prototype._ = _
import myfunc from './utils/base.js';//引入定义全局方法的js;
 
Vue.use(myfunc);
Vue.use(global); // 挂载到this
new Vue({
  router,
  store,
  methods: {
    
  },
  render: h => h(App)
}).$mount('#app')