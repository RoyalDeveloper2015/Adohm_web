<template>
  <select class="form-control" v-model="val">
    <option value="none">None</option>
    <option value="order">On orders over</option>
    <option value="code">Promo code</option>
  </select>
</template>

<script>
  export default {
    name: 'PromotionDetail',
    data: function () {
      return {
        val: 'none'
      }
    }
  }
</script>
