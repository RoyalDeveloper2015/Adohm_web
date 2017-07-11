<template>
  <div>
    <p>Based on account time zone: (UTC {{ offset > 0 ? '+' : '-'}} {{offset}}) </P>
  </div>
</template>


<script>
  export default {
    name: 'TimeZoneString',
    data: function () {
      return {
        timezone: '',
        offset: 0
      }
    },
    created: function () {
      this.offset = new Date().getTimezoneOffset() / -60
    }
  }
</script>
