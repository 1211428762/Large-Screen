import * as types from '../mutationTypes'

const state = {
  id: 0,
  name: '',
  time: ''
}

const getters = {}

const actions = {}

const mutations = {
  [types.UPDATE_USER_ID](state, {
    id
  }) {
    state.id = id
  },
  [types.UPDATE_USER_NAME](state, {
    name
  }) {
    state.name = name
  },
  [types.UPDATE_USER_LAST_LOGIN_TIME](state, {
    time
  }) {
    state.time = time
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}