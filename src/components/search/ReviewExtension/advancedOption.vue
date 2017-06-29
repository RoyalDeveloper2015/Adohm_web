<template>
  <div class="row mr-n ml-n bg-white">
    <div class="col-sm-12 my-gray">
      <span>Extension scheduling</span></br>
      <span><small>Select when your ad extensional will be eligible to show</small></span>
    </div>
    <div class="row ml-n">
      <div class="col-sm-5">
        <span class="my-gray">Start date</span><br>
        <date-sel></date-sel>
      </div>
      <div class="col-sm-5">
        <span class="my-gray">End date</span><br>
        <date-sel></date-sel>
      </div>
    </div>
    <div class="col-sm-12">
      <span class="my-gray">Days and hours</span><br>
      <div v-for="item in dArray">
        <days-hours v-bind.days="dArray" v-bind.sel_option="item.sel_option" v-bind.fTime="item.fTime" v-bind.eTime="item.eTime"></days-hours>
      </div>
      <button class="btn btn-link" v-on:click="addDayTime">ADD</button>
    </div>
    <div class="col-sm-12">
      <timezone-str></timezone-str>
    </div>
  </div>
</template>

<script>
  import dateComponent from '../dateComponent.vue'
  import daysAndHours from '../daysAndHoursComponent.vue'
  import timezoneString from '../basedTimeZoneComponent.vue'
  export default {
    name: 'advanceOption',
    data: function () {
      return {
        mobileType: false,
        dArray: [{
          sel_option: '',
          fTime: '',
          eTime: ''
        }]
      }
    },
    methods: {
      addDayTime: function () {
        this.dArray.push({
          sel_option: '',
          fTime: '',
          eTime: ''
        })
      }
    },
    components: {
      'date-sel': dateComponent,
      'days-hours': daysAndHours,
      'timezone-str': timezoneString
    }
  }
</script>
