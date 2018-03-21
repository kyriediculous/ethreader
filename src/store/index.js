import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state,
  mutations: {
    saveBuffer (state, payload) {
      state.fileBuffer = payload
    }
  },
  actions: {
    loadBuffer ({commit}, payload) {
      let buffer = Buffer.from(payload.result)
      commit('saveBuffer', buffer)
    }
  }
})
