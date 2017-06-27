<template>
  <div class="panel-body panel">
    <div class="col-sm-12">
      <h6>Extension scheduling</h6>
      <h7>Select when your ad extensions will be eligible to show</h7>
    </div>
    <div class="col-sm-4 col-md-4">
      <span>Start date</span><br>
      <input type="radio" class="" id="none" value="none" v-model="fOption">
      <label for="ofc" class="radio-inline"> None </label><br>
      <input type="radio" class="" id="fDay" value="specific" v-model="fOption">
      <label for="fDay" class="radio-inline"> <input type="date" class="form-control" v-model="fDate"/> </label><br>
    </div>
    <div class="col-sm-4 col-md-4">
      <span>End date</span><br>
      <input type="radio" class="" id="none" value="none" v-model="eOption">
      <label for="ofc" class="radio-inline"> None </label><br>
      <input type="radio" class="" id="fDay" value="specific" v-model="eOption">
      <label for="fDay" class="radio-inline"> <input type="date" class="form-control" v-model="eDate"/> </label><br>
    </div>
    <div class="col-sm-12 col-md-12">
      <p>Days and hours</p>
    </div>
    <div class="col-sm-12">
      <div v-for="item in dArray">
        <days-hours v-bind.days="dArray" v-bind.sel_option="item.sel_option" v-bind.fTime="item.fTime" v-bind.eTime="item.eTime"></days-hours>
      </div>
      <button class="btn btn-link " v-on:click="addDayTime">ADD</button>
      <timezone-string></timezone-string>
    </div>
  </div>
</template>

<script>
  import DaysAndHours from './daysAndHoursComponent.vue'
  import TimezoneString from './basedTimeZoneComponent.vue'
  export default {
    name: 'messageExtensionAdvancedOption',
    data: function () {
      return {
        dArray: [{
          sel_option: '',
          eDate: '',
          fDate: ''
        }]
      }
    },
    components: {
      'days-hours': DaysAndHours,
      'timezone-string': TimezoneString
    },
    methods: {
      addDayTime: function () {
        this.dArray.push({
          sel_option: '',
          eDate: '',
          fDate: ''
        })
      }
    }
  }
</script>
