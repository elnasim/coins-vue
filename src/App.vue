<template>
  <div id="app">

    <div class="container">
      <h1>Coins prices</h1>

      <div class="loading" v-if="loading">Loading...</div>

      <div class="coins-wrapper" v-else>
        <input type="text" class="coins-search" placeholder="Поиск по названию..."
               v-model="searchData"
               @input="_filter"
        >
        <div class="coins">
          <div class="coins__table-title">
            <div>#</div>
            <div @click="_sort('name')">Name</div>
            <div @click="_sort('current_price')">Current Price</div>
            <div @click="_sort('low_24h')">Min Price 24h</div>
            <div @click="_sort('high_24h')">Max Price 24h</div>
            <div @click="_sort('last_updated')">Last Update</div>
          </div>
          <Coin v-for="item in filteredData" :key="item.id"
                :name="item.name"
                :currentPrice="item.current_price"
                :low24h="item.low_24h"
                :high24h="item.high_24h"
                :lastUpdate="item.last_updated"
                :image="item.image"
          />
        </div>
      </div>

    </div>

  </div>
</template>

<script>

  import Coin from './components/Coin'
  import { mapActions, mapState, mapGetters } from 'vuex'

  export default {
    name: 'app',
    components: { Coin },
    data () {
      return {
        searchData: '',
      }
    },
    methods: {
      ...mapActions(['loadData']),

      ...mapGetters(['search']),

      _sort (column) {
        this.$store.dispatch('sort', column)
      },

      _filter () {
        this.$store.dispatch('filter', this.searchData)
      },
    },
    computed: {
      ...mapState(['loading', 'filteredData']),
    },
    created () {
      this.loadData()
    },
  }
</script>

<style lang="scss">

  @import "assets/style";

  h1 {
    text-align: center;
    color: rgba(#000, .8);
  }

  .coins-wrapper {
    overflow-y: auto;
  }

  .coins {
    min-width: 1000px;
    overflow-x: auto;
  }

  .coins__table-title {
    display: grid;
    grid-template-columns: 1fr 2fr 2fr 2fr 2fr 2fr;
    > div {
      padding: 0 5px;
      cursor: pointer;
      &:hover {
        background-color: rgba(#000, .1);
      }
    }
  }

  .loading {
    text-align: center;
    font-weight: bold;
    font-size: 30px;
  }

  .coins-search {
    margin-bottom: 30px;
    width: 100%;
    padding: 10px;
    border-radius: 2px;
    border: 1px solid rgba(#000, .5);
    font-size: 20px;
  }


</style>
