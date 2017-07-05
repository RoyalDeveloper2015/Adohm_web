<template>
  <div class="row m-n p-n">
    <table class="table-bordered mb-n">
      <tbody>
        <tr>
          <td width="87%">
            <div class="col-sm-12">
              <span>Occasion&nbsp;<i class="fa fa-question-circle"></i></span>
            </div>
            <div class="col-sm-12" >
              <occation-type class="" style="width:40%"></occation-type>
              Choose an occasion or select a date range in the Advanced options below, Otherwise, this extension will be eligible to show continuosly.
              <a>Learn more</a>
            </div>
            <div class="col-sm-12" >
              <occation-type class="" style="width:40%"></occation-type>
              Choose an occasion or select a date range in the Advanced options below, Otherwise, this extension will be eligible to show continuosly.
              <a>Learn more</a>
            </div>
            <div class="col-sm-12">
              <input type="text" class="form-control input-sm mb-n" style="outline:none; border-radius:0px;" placeholder="Item">
              <span class="glyphicon glyphicon-search form-control-feedback" style="right:15px"></span>
              <span class="pull-right">0/20</span>
            </div>
            <div class="col-sm-12">
              <input type="text" class="form-control input-sm mb-n" style="outline:none; border-radius:0px;" placeholder="Final URL">
              <span class="glyphicon glyphicon-search form-control-feedback" style="right:15px"></span>
            </div>
            <div class="col-sm-12">
              <span>Promotion details &nbsp;<i class="fa fa-question-circle"></i></span>
              <div style="width:30%">
                <promotion-detail></promotion-detail>
              </div>
            </div>
            <div class="col-sm-12">
              <span>Promotion dates&nbsp;<i class="fa fa-question-circle"></i></span><br>
              <span>Show the dates of your promotion</span><br>
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
            <div class="col-sm-12 pl-n">
              <button class="btn btn-link form-control" style="text-align:left" v-on:click="showUrl()"><i class="fa " v-bind:class=" showUrlOption?'fa-chevron-up':'fa-chevron-down' "></i> URL options</button>
              <url-option v-if="showUrlOption"></url-option>
              <button class="btn btn-link form-control" style="text-align:left" v-on:click="showAdvance()"><i class="fa" v-bind:class=" showAdvanceOption?'fa-chevron-up':'fa-chevron-down' "></i> Advanced Options</button>
              <advance-option v-if="showAdvanceOption"></advance-option>
            </div>
          </td>
          <td width="13%" rowspan="2" class="bg-gray" style="text-align:center;vertical-align:middle">
            <p>PREVIEW</p>
          </td>
        </tr>
        <tr>
          <button class="btn btn-link" v-on:click="save">SAVE AND ADD</button>
          <button class="btn btn-link" v-on:click="cancel">CANCEL</button>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import occation from './occationComponent.vue'
  import currency from '../General/currencyTypeComponent.vue'
  import promotion from './promotionTypeComponent.vue'
  import detail from './promotionDetailTypeComponent.vue'
  import dateComponent from '../General/dateComponent.vue'
  import urlOption from '../General/expandUrlOptionComponent.vue'
  import advanceOption from './expandAdvanceOption.vue'
  export default {
    name: 'createPromotionExtension',
    data: function () {
      return {
        showUrlOption: false,
        showAdvanceOption: false
      }
    },
    methods: {
      showUrl: function () {
        this.showUrlOption = !this.showUrlOption
      },
      showAdvance: function () {
        this.showAdvanceOption = !this.showAdvanceOption
      },
      save: function () {
        this.$emit('save')
      },
      cancel: function () {
        this.$emit('cancel')
      }
    },
    components: {
      'occation-type': occation,
      'currency-type': currency,
      'promotion-type': promotion,
      'promotion-detail': detail,
      'date-sel': dateComponent,
      'url-option': urlOption,
      'advance-option': advanceOption
    }
  }
</script>
