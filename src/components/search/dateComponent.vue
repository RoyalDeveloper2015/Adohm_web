<template>
  <div style="display:inline">
    <input type="radio" id="date-none" value="none" v-model="type">
    <span for="date-none">None</span> <br>
    <input type="radio" id="date-sel" value="date" v-model="type">
    <span for="date-sel"><input type="date" class="form-control" style="width:80%" v-model="date"></span><br>
  </div>
</template>

<script>
  export default {
    name: 'DateComponent',
    data: function () {
      return {
        type: 'none',
        date: ''
      }
    },
    methods: {
      getDate: function () {
        if (this.type === 'none') {
          return 'none'
        } else {
          return this.date
        }
      }
    }
  }
</script>
