/**
 *  将组件注册到全局
 *  直接在iconClass中输入svg名称
 *  在svg源码中，修改fill属性--->fill='currentColor' or fill=''
 * 
 *  */



import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' // svg组件

// 注册到全局
Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)