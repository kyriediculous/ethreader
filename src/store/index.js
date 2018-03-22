import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getContract from '../util/getContract'
import getWeb3 from '../util/getWeb3'


Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state,
  mutations: {
    registerContract (state, payload) {
      state.contractInstance = payload
    },
    registerWeb3Instance (state, payload) {
     let result = payload
     let web3Copy = state.web3
     web3Copy.coinbase = result.coinbase
     web3Copy.networkId = result.networkId
     web3Copy.balance = parseInt(result.balance, 10)
     web3Copy.isInjected = result.injectedWeb3
     web3Copy.web3Instance = result.web3
     state.web3 = web3Copy
   }
  },
  actions: {
    fetchContract ({commit}) {
      getContract
        .then(r => commit('registerContract', r))
        .catch(e => console.log('getContract action', e))
    },
    registerWeb3 ({commit}) {
      getWeb3.then(result => {
        commit('registerWeb3Instance', result)
      }).catch(e => {
        console.log('registerWeb3', e)
      })
    }
  }
})
