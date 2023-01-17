import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import mutations from './mutations'
import * as actions from './actions'
import user from './modules/user'

Vue.use(Vuex)

const state = {
    // 页面文档可视高度(随窗口改变大小)
    documentClientHeight: 0,
    // 页面文档可视高度(随窗口改变大小)
    documentClientWidth: 0,
     
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        user
    },
    strict: process.env.NODE_ENV !== 'production'
})
