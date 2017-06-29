<template>
  <div class="row mr-n ml-n bg-white my-border-gray my-border-solid border-1">
    <div class="col-sm-12">
      <h6 class="mt-10">Add new call extension</h6>
    </div>
    <div class="row ml-n">
      <div class="col-sm-5">
        <country-list v-model:countryCode="sel_country" @change="onChangeCountry"></country-list>
      </div>
      <div class="col-sm-5 p-n" style="position:relative">
        <input type="text" class="form-control mb-n" placeholder="Phone Number">
        <span class="fa fa-question-circle form-control-feedback border-radius-n" style="line-height:34px"> </span>
        <span class="pull-right my-gray">Example: ({{sel_country}}) 555-0123</span>
      </div>
    </div>
    <div class="col-sm-12">
      <span class="my-gray">Call reporting&nbsp;<i class="fa fa-question-circle"></i></span>
    </div>
    <div class="col-sm-12">
      <div class="col-sm-4 pl-n">
        <div class="radio radio-primary">
          <input type="radio" v-model="flgReport" value="on">
          <label>On</label>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="radio radio-primary">
          <input type="radio" v-model="flgReport" value="off">
          <label>Off</label>
        </div>
      </div>
    </div>
    <div class="col-sm-12 my-gray">
      <span>Device preference &nbsp;<i class="fa fa-question-circle"></i></span>
    </div>
    <div class="col-sm-12">
      <div class="d-flex align-items-center line-adjust pull-left">
        <div class="checkbox checkbox-primary my-gray">
          <input id="reportconversion" class="styled" type="checkbox">
          <label for="reportconversion">Count conversions as</label>
        </div>
      </div>
      <div class="col-sm-4">
        <select class="form-control none-border border-1-bottom my-border-solid my-border-radius-n">
          <option value="1">Calls from ads</option>
        </select>
      </div>
    </div>
    <div class="col-sm-12">
      <span class="my-gray">Device preference &nbsp; <i class="fa fa-question-circle"></i></span>
    </div>
    <div class="col-sm-12">
      <div class="d-flex align-items-center line-adjust pull-left">
        <div class="checkbox checkbox-primary">
          <input id="mobilecheck" class="styled" type="checkbox">
          <label for="mobilecheck">Mobile</label>
        </div>
      </div>
    </div>
    <div class="col-sm-12 pl-n">
      <button class="btn btn-link" v-on:click="showAdvance"><i class="fa" v-bind:class="flgAdvanceOpt?'fa-chevron-up':'fa-chevron-down'"></i>Advanced Option</button>
    </div>
    <div class="col-sm-12 m-n p-n">
      <advance-option v-if="flgAdvanceOpt"></advance-option>
    </div>
    <div class="col-sm-12 pl-n my-border-solid border-1 border-gray">
      <button class="btn btn-link" v-on:click="onSave"> SAVE AND ADD</button>
      <button class="btn btn-link" v-on:click="onCancel"> CANCEL </button>
    </div>
  </div>
</template>

<script>
  import countryList from '../countryListComponent.vue'
  import advanceOpt from './advanceOption.vue'
  export default {
    name: 'NewCallExtension',
    data: function () {
      return {
        sel_country: '93',
        flgReport: 'on',
        flgAdvanceOpt: false
      }
    },
    components: {
      'country-list': countryList,
      'advance-option': advanceOpt
    },
    methods: {
      onChangeCountry: function (v) {
        this.sel_country = v
      },
      showAdvance: function () {
        this.flgAdvanceOpt = !this.flgAdvanceOpt
      },
      onSave: function () {
        this.$emit('save', this)
      },
      onCancel: function () {
        this.$emit('cancel')
      }
    }
  }
</script>
