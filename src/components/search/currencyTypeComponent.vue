<template>
  <select class="form-control" v-model="val">
    <option value="usd">USD</option>
    <option value="eur">EUR</option>
    <option value="jpy">JPY</option>
    <option value="inr">INR</option>
    <option value="aus">AUS</option>
  </select>
</template>

<script>
  export default {
    name: 'CurrencyType',
    data: function () {
      return {
        val: 'usd'
      }
    }
  }
</script>
