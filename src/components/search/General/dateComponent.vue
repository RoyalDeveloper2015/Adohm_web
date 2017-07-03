<template>
  <div >
    <form>
      <label class="radio-inline">
        <input type="radio" id="date-none" value="none" v-model="type"> None
      </label><br>
      <label class="radio-inline">
        <input type="radio" style="height:25px;" id="date-sel" value="date" v-model="type"> <input type="date" class="form-control" v-model="date">
      </label><br>
    </form>
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
