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
          <div class="margin-top-5 row flex-row-10">
            <div class="bordered flex-item-4">
              <div class="border-bottom-line padding-top-10">             
                <input type="text" class="bottom-line-input width-85 no-borders margin-left-0"
                    placeholder="Search"
                    v-model="searchkey"
                    v-bind:value="searchkey"
                    v-on:keyup="searchList($event, searchkey)">
                <span class="left-span no-borders"><i class="fa fa-search left-icon" aria-hidden="true"></i></span>
              </div>
              <div class="margin-top-20 border-bottom-line padding-left-10">              
                <span class="margin-left-10">{{searchResult.length > 0 ? searchResult[0].name : ''}}</span>
              </div>
              <div class="margin-top-20 padding-left-10" v-for="sitelink in searchResult" v-show="searchResult.length > 0">
                <input type="checkbox" v-on:change="selectedOne(sitelink)" :checked="false">
                <span class="margin-left-10">{{sitelink.name}}</span>
              </div>
            </div>
            <div class="bordered flex-item-4 none-border-left">
              <div class="border-bottom-line padding-top-10 padding-left-10 flex-row-10">
                <div class="flex-item-5"><span>{{newSiteLinkExtensions.length > 0 ? newSiteLinkExtensions.length : 'None'}} Selected</span></div>
                <div class="flex-item-5 right margin-right-10"><span class="blue cursor" v-on:click="loadSiteLinkExtenstions">Clear All</span></div>
              </div>
              <div class="margin-top-20 padding-left-10"
                  v-for="newSiteLink in newSiteLinkExtensions"
                  v-show="newSiteLinkExtensions.length > 0">
                <span>{{newSiteLink.name}}</span>
              </div>
            </div>
            <div class="col-md-1 flex-item-2 bg-grey align-center">
              <span>Preview</span>
            </div>
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
  import { mapState } from 'vuex'

  export default {
    name: 'SiteLinkExtensions',
    data: function () {
      return {
        searchkey: '',
        searchResult: [],
        newSiteLinkExtensions: [],
        temp: []
      }
    },
    computed: {
      ...mapState([
        'sitelink_extensions'
      ])
    },
    mounted: function () {
      this.loadSiteLinkExtenstions()
    },
    methods: {
      expand (tar1, tar2) {
        $('.' + tar1).slideToggle()
        $('.' + tar2).toggleClass('rotate')
      },
      loadSiteLinkExtenstions () {
        this.temp = []
        for (let item of this.sitelink_extensions) {
          this.temp.push(item)
        }
        this.searchResult = this.temp
        this.newSiteLinkExtensions = []
      },
      searchList (event, keywords) {
        if (event.keyCode === 13) {
          this.newSiteLinkExtensions.push(this.searchResult[0])
          this.temp.splice(this.temp.indexOf(this.searchResult[0]), 1)
          this.searchResult.pop()
        } else {
          this.searchResult = this.temp.filter(function (el) {
            return el.name.toLowerCase().indexOf(keywords.toLowerCase()) > -1
          })
        }
      },
      selectedOne (val) {
        this.temp.splice(this.temp.indexOf(val), 1)
        this.newSiteLinkExtensions.push(val)
      }
    }
  }
</script>
<style>
  .no-borders {
   border-bottom: 0px;
   margin-left: 0px;
  }
  .none-border-left {
    border-left: 0px !important;
  }
  .none-border-top {
    border-top: 0px !important;
  }
  .flex-row-10 {
    display: flex;
    flex-direction: row;
    flex: 10;
  }
  .flex-item-4 {
    flex: 4;
  }
  .flex-item-2 {
    flex: 2;
  }
  .flex-item-5 {
    flex: 5;
  }
  .width-85 {
    width: 90%;
  }
  .align-center {
    text-align: center;
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
  .bg-grey {
    background-color: rgba(0,0,0,0.3);
  }
</style>
