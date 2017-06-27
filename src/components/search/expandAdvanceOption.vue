<template>
  <div class="col-sm-12">
    <div class="row ml-n">
      <span>Device preference <i class="fa fa-question-circle"></i></span></br>
      <div class="row ml-n" style="display:inline-flex">
        <input type="checkbox"  id="mobile_check">
        <label for="mobile_check">Mobile</label>
      </div>
    </div>
    <div class="row ml-n">
      <span>Extension scheduling</span></br>
      <span>Select when your ad extension will be eligible to show</span>
    </div>
    <div class="row ml-n">
      <div class="col-sm-5">
        <span>Start date</span><br>
        <date-sel></date-sel>
      </div>
      <div class="col-sm-5">
        <span>End date</span><br>
        <date-sel></date-sel>
      </div>
    </div>
    <div class="row ml-n">
      <div class="col-sm-12">
        <span>Days and hours </span>
      </div>
      <div class="col-sm-12">
        <div v-for="item in dArray">
          <days-hours v-bind.days="dArray" v-bind.sel_option="item.sel_option" v-bind.fTime="item.fTime" v-bind.eTime="item.eTime"></days-hours>
        </div>
        <button class="btn btn-link" v-on:click="addDayTime">ADD</button>
        <timezone-string></timezone-string>
      </div>
    </div>
  </div>
</template>

<script>
  import dateComponent from './dateComponent.vue'
  import dayshours from './daysAndHoursComponent.vue'
  import TimezoneString from './basedTimeZoneComponent.vue'
  export default {
    name: 'ExpandAdvanceOption',
    data: function () {
      return {
        sSel: '',
        sDate: '',
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
      'days-hours': dayshours,
      'timezone-string': TimezoneString
    }
  }
</script>
