<template>
  <div id="app">

    <div class="container">
      <h1>Coins prices</h1>

      <div class="coins-wrapper">
        <div class="coins">
          <div class="coins__table-title">
            <div>#</div>
            <div>Name</div>
            <div>Current Price</div>
            <div>Min Price 24h</div>
            <div>Max Price 24h</div>
            <div>Last Update</div>
          </div>
          <Coin v-for="item in _getDATA" :key="item.id"
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

  export default {
    name: 'app',
    components: { Coin },
    methods: {
      _loadData () {
        this.$store.dispatch('loadData')
      },
    },
    computed: {
      _getDATA () {
        return this.$store.state.coinData
      },
    },
    created () {
      this._loadData()
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
    padding: 0 10px;

    > div {
      padding: 0 5px;
    }
  }


</style>
