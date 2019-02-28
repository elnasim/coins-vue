import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currencies: [
      'RUB',
      'EUR',
      'USD',
    ],
    coinData: null,
  },
  mutations: {
    LOAD_DATA (state, payload) {
      state.coinData = payload
    },
  },
  actions: {
    async loadData ({ commit }) {
      try {
        let { data } = await axios({
          url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=rub',
        })
        commit('LOAD_DATA', data)
      } catch (e) {
        console.log('-->', e)
      }
    },
  },
})
