<template>
  <select class="form-control" v-model="val">
    <option value="monetary">Monetary discount</option>
    <option value="percent">Percent discount</option>
    <option value="umonetary">Up to monetary discount</option>
    <option value="upercent">Up to percent discount</option>
  </select>
</template>

<script>
  export default {
    name: 'PromotionType',
    data: function () {
      return {
        val: 'monetary'
      }
    }
  }
</script>
