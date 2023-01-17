import * as types from './mutationTypes'

export default {

  [types.UPDATE_DOCUMENT_CLIENT_HEIGHT](state, {
    height
  }) {
    state.documentClientHeight = height
  },

  [types.UPDATE_DOCUMENT_CLIENT_WIDTH](state, {
    width
  }) {
    state.documentClientWidth = width
  }

}