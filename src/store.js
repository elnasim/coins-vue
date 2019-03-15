import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import lodash from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    coinData: null,
    filteredData: null,
    loading: false,
    nameDirection: null,
    current_priceDirection: null,
    low_24hDirection: null,
    high_24hDirection: null,
    last_updatedDirection: null,
  },

  mutations: {
    LOAD_DATA (state, payload) {
      state.coinData = payload
      state.filteredData = payload
    },

    LOADING (state, payload) {
      state.loading = payload
    },

    SORT (state, payload) {
      let column = payload + 'Direction'
      if (state[column] === null || state[column] === false) {
        state[column] = true
        let data = lodash.sortBy(state.filteredData, payload)
        state.filteredData = data
      } else if (state[column]) {
        state[column] = false
        let data = lodash.sortBy(state.filteredData, payload).reverse()
        state.filteredData = data
      }
    },

    FILTER (state, payload) {
      payload.toLowerCase()
      if (!payload) {
        state.filteredData = state.coinData
      } else {
        let data = lodash.filter(state.coinData, function (item) {
          return item.name.toLowerCase().includes(payload)
        })
        state.filteredData = data
      }
    },

  },

  actions: {
    async loadData ({ commit }) {
      commit('LOADING', true)
      try {
        let { data } = await axios({
          url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=rub',
        })
        commit('LOAD_DATA', data)
      } catch (e) {
        console.log('-->', e)
      }
      commit('LOADING', false)
    },

    sort ({ commit }, payload) {
      commit('SORT', payload)
    },

    filter ({ commit }, payload) {
      commit('FILTER', payload)
    },
  },

})
