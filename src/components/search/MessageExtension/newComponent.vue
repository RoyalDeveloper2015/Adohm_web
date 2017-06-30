<template>
  <div class="row m-n p-n bg-white">
    <table class="table-bordered mb-n">
        <tbody>
          <tr>
            <td>
              <div class="col-sm-12">
                <p>Add New message extension </p>
              </div>
              <div class="row ml-n">
                <div class="col-sm-5">
                  <country-list v-model:countryCode="sel_country" @change="onChangeCountry"></country-list>
                </div>
                <div class="col-sm-5 p-n" style="position:relative">
                  <input type="text" class="form-control mb-n my-border-radius-n bottom-border-no-outline" placeholder="Phone Number">
                  <span class="fa fa-question-circle form-control-feedback border-radius-n" style="line-height:34px"> </span>
                  <span class="pull-right my-gray">Example: ({{sel_country}}) 555-0123</span>
                </div>
              </div>
              <div class="col-sm-12">
                <span class="my-gray">Extension text</span>
              </div>
              <div class="col-sm-12 mb-10">
                <input class="form-control my-border-radius-n bottom-border-no-outline" v-model="strExtension">
              </div>
              <div class="col-sm-12 mb-10">
                <input class="form-control my-border-radius-n bottom-border-no-outline p-n" placeholder="Business Name" v-model="strBusiness">
              </div>
              <div class="col-sm-12">
                <span class="my-gray">Message text</span>
              </div>
              <div class="col-sm-12">
                <input class="form-control my-border-radius-n bottom-border-no-outline" v-model="strMessage">
              </div>
              <div class="col-sm-12 p-n">
                <button class="btn btn-link" v-on:click="advanceOption=!advanceOption">
                  <i class="fa" v-bind:class="advanceOption?'fa-chevron-up':'fa-chevron-down'"></i> Advacned Option
                </button>
              </div>
              <div class="col-sm-12 p-n">
                <advance-option v-if="advanceOption"></advance-option>
              </div>
            </td>
            <td rowspan="2" width="13%" class="bg-gray" style="text-align:center;vertical-align:middle">
              <span>PREVIEW</span>
            </td>
          </tr>
          <tr>
            <div class="col-sm-12">
              <button class="btn btn-link" v-on:click="save">SAVE AND ADD </button>
              <button class="btn btn-link" v-on:click="cancel">CANCEL </button>
            </div>
          </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
  import countryList from '../General/countryListComponent.vue'
  import Option from './advancedOption.vue'
  export default {
    name: 'createReview',
    data: function () {
      return {
        strExtension: '',
        strBusiness: '',
        strMessage: '',
        advanceOption: false,
        sel_country: '93'
      }
    },
    methods: {
      onChangeCountry: function (v) {
        this.sel_country = v
      },
      save: function () {
        this.$emit('save')
      },
      cancel: function () {
        this.$emit('cancel')
      }
    },
    components: {
      'country-list': countryList,
      'advance-option': Option
    }
  }
</script>
