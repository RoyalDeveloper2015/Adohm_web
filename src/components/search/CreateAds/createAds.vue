<template>
  <div class="container">
    <h5>Create ads</h5>
    <p>For each ad group, we recoomend you create at least three ads that closely relate to the theme of your keywords</p>
    <div class="panel p-20 mb-n">
      <div class="">
        <div>Ad group:<b>test</b></div>
        <p>Keywords:<b>hourses for sale</b></p>
      </div >
      <div class="row">
        <div class="col-sm-3">
          <button v-on:click="showNewAd=!showNewAd" class="btn btn-default form-control" style="height: 150px; font-size: large; color:blue"><i class="fa fa-plus-circle"> NEW AD</i></button>
        </div>
      </div>
    </div>
    <add-new-component v-if="showNewAd" @save="onAddNew" @cancel="onCancelNew"></add-new-component>
    <div class="panel mt-20 p-20">
      <div class="">
        <div><b>Improve your ads by adding extensions to this campaign</b></div>
        <p>Adding at least one extension to your campaign may boost your ads'click through rate by 5-15%.</p>
      </div>
      <div class="panel p-20">
        <div class="form-group mb-20">
          <label class="col-sm-2 control-label" for="text1">Sitelink extensions</label>
          <div class="col-sm-10 input-group">
            <input type="text" id="sitelink_extension" placeholder="Add additional links to your ad" class="form-control">
            <span class="input-group-addon"><i class="fa fa-angle-down"></i></span>
          </div>
        </div>
        <div class="form-group mb-20">
          <label class="col-sm-2 control-label" for="text1">Callout extensions</label>
          <div class="col-sm-10 input-group">
            <input type="text" id="callout_extension" class="form-control">
            <span class="input-group-addon"><i class="fa fa-angle-down"></i></span>
          </div>
        </div>
        <div class="form-group mb-20">
          <label class="col-sm-2 control-label" for="text1">Call extensions</label>
          <div class="col-sm-10 input-group">
            <input type="text" id="call_extension" placeholder="Add a phone number to your ad" class="form-control">
            <span class="input-group-addon"><i class="fa fa-angle-down"></i></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import newAdComponent from './createAds/newAdComponent.vue'
  export default {
    name: 'createAds',
    data: function () {
      return {
        showNewAd: false
      }
    },
    components: {
      'add-new-component': newAdComponent
    },
    methods: {
      onAddNew: function () {
        this.showNewAd = false
      },
      onCancelNew: function () {
        this.showNewAd = false
      }
    }
  }
</script>
