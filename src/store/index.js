import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getContract from '../util/getContract'


Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state,
  mutations: {
    saveBuffer (state, payload) {
      state.fileBuffer = payload
    },
    registerContract (state, payload) {
      state.contractInstance = payload
    }
  },
  actions: {
    loadBuffer ({commit}, payload) {
      let buffer = Buffer.from(payload.result)
      commit('saveBuffer', buffer)
    },
    fetchContract ({commit}) {
      getContract
        .then(r => commit('registerContract', r))
        .catch(e => console.log('getContract action', e))
    }
  }
})
