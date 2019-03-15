<template>
  <div class="b-coin">
    <img :src="image" alt="" class="b-coin__image b-coin-sell">
    <div class="b-coin__name b-coin-sell">{{name}}</div>
    <div class="b-coin__price b-coin-sell">{{_roundPrice(currentPrice)}} RUB</div>
    <div class="b-coin__change-24h b-coin-sell">{{_roundPrice(low24h)}} RUB</div>
    <div class="b-coin__change-7d b-coin-sell">{{_roundPrice(high24h)}} RUB</div>
    <div class="b-coin__last-update b-coin-sell">{{_lastUpdate}}</div>
  </div>
</template>

<script>
  export default {
    name: 'Coin',
    props: [
      'name',
      'currentPrice',
      'low24h',
      'high24h',
      'lastUpdate',
      'image',
    ],
    methods: {
      _roundPrice (currentPrice) {
        let price = Math.round(currentPrice)
        return price
      },
    },
    computed: {
      _lastUpdate () {
        let day = this.lastUpdate.slice(8, 10)
        let mounth = this.lastUpdate.slice(5, 7)
        let year = this.lastUpdate.slice(0, 4)
        let hour = +this.lastUpdate.slice(11, 13) + 3
        let min = this.lastUpdate.slice(14, 16)
        return `${hour}:${min} ${day}-${mounth}-${year}`
      },
    },
  }
</script>

<style scoped lang="scss">

  .b-coin {
    display: grid;
    grid-template-columns: 1fr 2fr 2fr 2fr 2fr 2fr;
    border: 1px solid rgba(#000, .4);
    border-bottom: none;
    padding: 10px;

    &:last-child {
      border-bottom: 1px solid rgba(#000, .4);
    }
  }

  .b-coin__image {
    width: 30px;
    height: auto;
  }

  .b-coin-sell {
    padding: 0 5px;
  }

</style>
