<template>
  <div class="search-detail">
    <div id="card" class="detail-pannel">
      <div class="top-card">
        <div class="col-md-3 align-left">
          <span class="type">Type:</span>
          <span class="title-content black">Search Network Campaign</span>
        </div>
        <div class="col-md-3 align-left">
          <span class="type margin-left-50">Goals:</span>
          <span class="title-content black">Visit your website</span>
        </div>
        <div class="col-md-6 right">
          <i class="fa fa-pencil" aria-hidden="true"></i>
        </div>
      </div>
		</div>
    <div id="card" class="detail-pannel margin-top-20">
      <div class="top-card padding-15">
        <div class="col-md-3">
          <span class="black">Campaign name</span>
        </div>
        <div class="col-md-3">
          <div class="trans-1">
            <input type="text" class="bottom-line-input width-100">
          </div>
        </div>
        <div class="col-md-6 right">
          <i class="fa fa-angle-up trans ro-1 font-xlarge"
            v-on:click="expand('trans-1', 'ro-1')"></i>
        </div>
      </div>
    </div>
    <div id="card" class="detail-pannel margin-top-20">
      <div class="top-card padding-15">

        <div class="col-md-3">
          <span class="black">Network</span>
        </div>

        <div class="col-md-8">
          <div class="trans-2">
            <div class="display-flex">
              <div class="image">
                <img class="display-block" src="static/images/social.png" />              
              </div>
              <div class="content margin-left-25">
                <div class="title display-block"><span class="bold">Seach Network</span></div>
                <div class="display-block margin-top-10">
                  <span>Ads can appear near Google Search results and other Google sites when people search for terms that are relevant to your keywords</span>
                </div>
                <div class="display-block margin-top-5">
                  <input type="checkbox" name="partner" class="margin-top-5" id="partner">
                  <span class="vertical margin-left-10">Include Googld Search Partners</span>
                  <i aria-hidden="true" class="fa fa-question-circle"></i>
                </div>
              </div>
            </div>

            <div class="display-flex margin-top-10">
              <div class="image">
                <img class="display-block" src="static/images/network.png" />              
              </div>
              <div class="content margin-left-25">
                <div class="title display-block">
                  <span class="bold">Add Display Network</span>
                  <i aria-hidden="true" class="fa fa-question-circle"></i>
                </div>
                <div class="display-block margin-top-10">
                  <span>Expand your reach by showing ads to relevant customers as they browse sites, videos, and apps across the Internet</span>
                </div>
                <div class="display-block margin-top-5">
                  <span>
                    <input type="radio" name="partner" class="margin-top-5" id="partner">
                    <span class="vertical">Yes</span>
                  </span>
                  <span class="margin-left-25">
                    <input type="radio" name="partner" class="margin-top-5" id="partner">
                    <span class="vertical">No</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-1 right">
          <i class="fa fa-angle-up trans ro-2 font-xlarge"
            v-on:click="expand('trans-2', 'ro-2')"></i>
        </div>

      </div>
    </div>
    <div id="card" class="detail-pannel margin-top-20">
      <div class="top-card padding-15">
        <div class="col-md-3">
          <span class="black">Devices</span>
        </div>
        <div class="col-md-9">
          <span>Ads will show on all eligible devices by default</span>
        </div>
      </div>
    </div>
    <div id="card" class="detail-pannel margin-top-20">
      <div class="top-card padding-15">
        <div class="col-md-3">
          <span class="black">Location</span>
        </div>
        <div class="col-md-8">
          <div class="trans-3">
            <div class="display-block">
              <span>Select location to target</span>
              <i aria-hidden="true" class="fa fa-question-circle"></i>
            </div>
            <div class="display-block margin-top-5">
              <span>
                <input type="radio" name="partner" class="margin-top-5" id="partner">
                <span class="vertical margin-left-10">All countries and territories</span>
              </span>
            </div>
            <div class="display-block margin-top-5">
              <span>
                <input type="radio" name="partner" class="margin-top-5" id="partner">
                <span class="vertical margin-left-10">India</span>
              </span>
            </div>
            <div class="display-block margin-top-5">
              <span>
                <input type="radio" name="partner" class="margin-top-5" id="partner">
                <span class="vertical margin-left-10">Enter another location</span>
              </span>
            </div>
            <div class="margin-top-20 margin-left-25">            
              <span class="left-span"><i class="fa fa-search left-icon" aria-hidden="true"></i></span>
              <input id="url" type="url" name="url" class="bottom-line-input width-40" placeholder="Enter a location to target or exclude">
              <span class="margin-left-25"><a class="blue">Advanced search</a></span>                   
            </div>
          </div>
        </div>
        <div class="col-md-1 right">
          <i class="fa fa-angle-up trans ro-3 font-xlarge"
            v-on:click="expand('trans-3', 'ro-3')"></i>
        </div>
      </div>
    </div>
    <div id="card" class="detail-pannel margin-top-20">
      <div class="top-card padding-15">
        <div class="col-md-3">
          <span class="black">Language</span>
        </div>        
        <div class="col-md-8">
          <div class="trans-4">
            <div class="display-block">
              <span>Select the languages your customers speak</span>
              <i aria-hidden="true" class="fa fa-question-circle"></i>
            </div>
            <div class="display-block margin-top-20">
              <multiselect class="" :options="languages" label="name"
                      track-by="dcId"
                      :multiple="true" :close-on-select="false"
                      :clear-on-select="false" :hide-selected="true" :option-height="10"
                      placeholder="Start tying or select a language">
              </multiselect>
            </div>
          </div>
        </div>
        <div class="col-md-1 right">
          <i class="fa fa-angle-up trans ro-4 font-xlarge"
            v-on:click="expand('trans-4', 'ro-4')"></i>
        </div>
      </div>
    </div>
    <div id="card" class="detail-pannel margin-top-20">
      <div class="top-card padding-15">
        <div class="col-md-3">
          <span>Bidding</span>
        </div>
        <div class="col-md-5">
          <div class="trans-5">
            <div class="display-block">
              <span>Select your bid strategy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'

  import {mapState, mapActions} from 'vuex'
  import Multiselect from 'vue-multiselect'

  export default {
    name: 'DetailNetwork',
    data: function () {
      return {
        expanded: false,
        network: false
      }
    },
    mounted: function () {
      this.loadLanguages()
    },
    components: {
      Multiselect
    },
    computed: {
      ...mapState([
        'languages'
      ])
    },
    methods: {
      ...mapActions({
        loadLanguages: 'LOAD_LANGUAGE_LIST'
      }),
      expand: function (tar1, tar2) {
        $('.' + tar1).slideToggle('slow')
        $('.' + tar2).toggleClass('rotate')
      }
    }
  }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
  .search-detail {
    width: 100%;
    padding: 40px;
  }
  .detail-pannel {
    display: block;
    width: 100%;
  }
  .type {
    color: rgba(0,0,0,0.5);
  }
  .title-content {
    padding-left: 3px;
  }
  .top-card {
    display: inline-flex;
    width: 100%;
    padding: 20px 20px;
  }
  .margin-left-50 {
    margin-left: 50px;
  }
  .margin-top-10 {
    margin-top: 10px;
  }
  .margin-top-20 {
    margin-top: 20px;
  }
  .margin-top-5 {
    margin-top: 5px;
  }
  .margin-left-25 {
    margin-left: 25px;
  }
  .margin-left-10 {
    margin-left: 10px;
  }
  .padding {
    padding: 20px 15px !important;
  }
  .align-left {
    text-align: left;
  }
  .right {
    text-align: right;
  }
  .trans-1, .trans-2, .trans-3, .trans-4 {
    display: none;
  }
  .font-xlarge {
    font-size: x-large;
  }
  .width-100 {
    width: 100%
  }
  .display-block {
    display: block;
  }
  .display-flex {
    display: inline-flex;
  }
  .bold {
    font-weight: bold;
  }
  .black {
    color: #000 !important;
  }
  .blue {
    color: #4285F4;
  }
  .vertical {
    vertical-align: top;
  }
  .content, .image {
    display: inline-block;
  }
  .trans {
    -webkit-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
  }  
  .rotate {
    -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
  }
  a {
    cursor: pointer;
  }
</style>
