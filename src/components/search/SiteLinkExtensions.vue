<template>
  <!-- Site link extensions -->
  <div id="card" class="detail-pannel margin-top-20">
    <div class="top-card padding-15">
      <div class="col-md-3">
        <span class="black">Sitelink extensions</span>
      </div>
      <div class="col-md-8">
        <div class="trans-10">
          <div><span>Select or create campaign level sitelink extensions</span></div>
          <div class="margin-top-10"><span>Add at least 2 sitelink extensions</span></div>
          <div class="margin-top-5 row">
          <div class="col-md-6 bordered">
            <div class="border-bottom-line">             
              <input type="text" class="bottom-line-input width-85 no-borders margin-left-0" placeholder="Search">
              <span class="left-span no-borders"><i class="fa fa-search left-icon" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="col-md-5"></div>
          <div class="col-md-1"></div>
          </div>
        </div>
      </div>
      <div class="col-md-1 right">
        <i class="fa fa-angle-up trans ro-10 font-xlarge"
            v-on:click="expand('trans-10', 'ro-10')"></i>
      </div>
    </div>
  </div>
  
</template>
<script>
  import $ from 'jquery'

  export default {
    name: 'SiteLinkExtensions',
    methods: {
      expand: function (tar1, tar2) {
        $('.' + tar1).slideToggle()
        $('.' + tar2).toggleClass('rotate')
      }
    }
  }
</script>
<style>
  .no-borders {
   border-bottom: 0px;
   margin-left: 0px;
  }
  .width-85 {
    width: 90%;
  }
  .bordered {
    border: 1px solid rgba(0,0,0,0.5);
    padding: 5px 0px 5px 0px;
    z-index: 10;
  }
  .width-15 {
    width: 10%;
  }
  .border-bottom-line {
    border-bottom: 1px solid rgba(0,0,0,0.3);
  }
  .middle {
    vertical-align: middle;
  }
  .display-inline-block {
    display: inline-block;
  }
  .margin-left-0: {
    margin-left: 0px;
  }
</style>
