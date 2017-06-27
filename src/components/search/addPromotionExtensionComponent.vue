<template>
  <div class="row bg-white">
    <div class="col-sm-3">
      Promotion extensions
    </div>
    <div class="col-sm-9 mr-n pr-n">
      <p class="mb-10">Select or Create promotion extensions</P>
      <div class="row bg-gray">
        <div class="col-sm-9 pr-n bg-white">
          <div class="panel-body" style="border:1px solid gray">
            <p class="mb-10">Add new promotion extension</p>
            <div class="row">
              <div class="col-sm-12">
                <span>Occasion&nbsp;<i class="fa fa-question-circle"></i></span>
              </div>
              <div class="col-sm-12" >
                <occation-type class="" style="width:40%"></occation-type>
                Choose an occasion or select a date range in the Advanced options below, Otherwise, this extension will be eligible to show continuosly.
                <a>Learn more</a>
              </div>
              <div class="row ml-n mr-n">
                <div class="col-sm-3">
                  <span>Occasion&nbsp;<i class="fa fa-question-circle"></i></span>
                  <currency-type></currency-type>
                </div>
                <div class="col-sm-8 pl-n">
                  <div class="row">
                    <span class="col-sm-12">Promotion type &nbsp;<i class="fa fa-question-circle"></i></span>
                  </div>
                  <div class="row">
                    <div class="col-sm-7">
                      <promotion-type></promotion-type>
                    </div>
                    <div class="col-sm-2 pl-n">
                      <input type="number" class="form-control">
                    </div>
                  </div>
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
                <div class="col-sm-12">
                  <button class="btn btn-link form-control" style="text-align:left" v-on:click="showUrl()"><i class="fa " v-bind:class=" showUrlOption?'fa-chevron-up':'fa-chevron-down' "></i> URL options</button>
                  <url-option v-if="showUrlOption"></url-option>
                  <button class="btn btn-link form-control" style="text-align:left" v-on:click="showAdvance()"><i class="fa" v-bind:class=" showAdvanceOption?'fa-chevron-up':'fa-chevron-down' "></i> Advanced Options</button>
                  <advance-option v-if="showAdvanceOption"></advance-option>
                </div>
              </div>
            </div>
          </div>
          <div class="panel-footer" style="border:1px solid gray">
            <button class="btn btn-link">SAVE AND ADD</button>
            <button class="btn btn-link">CANCEL</button>
          </div>
        </div>
        <div class="col-sm-3 pl-n  text-center"><p>PREVIEW</p></div>
      </div>
    </div>
  </div>
</template>

<script>
  import occation from './occationComponent.vue'
  import currency from './currencyTypeComponent.vue'
  import promotion from './promotionTypeComponent.vue'
  import detail from './promotionDetailTypeComponent.vue'
  import dateComponent from './dateComponent.vue'
  import urlOption from './expandUrlOptionComponent.vue'
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
