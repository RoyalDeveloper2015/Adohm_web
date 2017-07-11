<template>
  <div class="row mr-n ml-n bg-white my-border-gray no-border-top my-border-solid  ">
    <div class="col-sm-12 my-gray">
      <p class="mb-5">Extension scheduling</p>
      <span>Select when your ad extensions will be eligible to show</span>
    </div>
    <div class="col-sm-12 pl-n">
      <div class="col-sm-5">
        <span>Start date</span><br>
        <date-sel></date-sel>
      </div>
      <div class="col-sm-5">
        <span>End date</span><br>
        <date-sel></date-sel>
      </div>
    </div>
    <div class="col-sm-12">
      <span class="my-gray">Days and hours</span><br>
      <days-hours v-for="item in dArray" v-model="dArray" v-bind:sel_option="item.sel_option" v-bind:fTime="item.fTime" v-bind:eTime="item.eTime"></days-hours>
      <button class="btn btn-link pl-n" v-on:click="onAddDayHour">ADD</button>
    </div>
  </div>
</template>

<script>
  import dateComponent from '../General/dateComponent.vue'
  import daysAndHours from '../General/daysAndHoursComponent.vue'
  export default {
    name: 'CallExtensionAdvanceOption',
    data: function () {
      return {
        dArray: [{
          sel_option: '',
          fTime: '',
          eTime: ''
        }]
      }
    },
    methods: {
      onAddDayHour: function () {
        this.dArray.push({
          sel_option: '',
          fTime: '',
          eTime: ''
        })
      }
    },
    components: {
      'date-sel': dateComponent,
      'days-hours': daysAndHours
    }
  }
</script>
