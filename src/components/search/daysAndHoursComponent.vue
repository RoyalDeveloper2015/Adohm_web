<template>
  <div class="row">
    <div class="col-sm-4 pr-n">
      <select class="form-control" v-model="sel_option" v-on:change="selChanged">
        <option disabled value=" ">Select one</option>
        <option value="all">All days</option>
        <option value="specific">Other</option>
      </select>
    </div>
    <div class="col-sm-4">
      <input type="time" class="form-control" v-bind="fTime">
    </div>
    <div class="col-sm-4">
      <input type="time" class="form-control" v-bind="eTime">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DaysAndHours',
    props: ['days', 'sel_option', 'fTime', 'eTime'],
    methods: {
      selChanged: function () {
        this.days = []
        this.days.push({
          sel_option: 'all',
          fTime: '',
          eTime: ''
        })
      }
    }
  }
</script>
