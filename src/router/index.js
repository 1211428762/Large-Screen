import Vue from 'vue'
import Router from 'vue-router'

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有开发环境使用懒加载
const _import = require('./importFunction'); //todo 测出需要修改 ;
import Cookies from 'js-cookie'

Vue.use(Router)

// 路由定义使用说明:
// 1. 代码中路由统一使用name属性跳转.
// 2. 开放path属性用做简短路由, 比如: '/a1', 访问地址: www.renren.io/#/a1


const routes = [{
  path: '/login',
  component: _import('login/login'),
  name: 'login',
  desc: '登录'
},
{
  path: '/',
  component: _import('index'),
  name: 'index',
  desc: '大屏',

},
{
  path: '/earth',
  component: _import('indexvideo'),
  name: 'indexvideo',
  desc: '大屏',

}

]

const router = new Router({
  routes
})



export default router