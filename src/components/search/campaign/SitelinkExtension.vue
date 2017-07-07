<template>
	<div>
		<div><span>Select or create campaign level sitelink extensions</span></div>
		<div class="margin-top-10"><span>Add at least 2 sitelink extensions</span></div>

		<!-- show sitelink extensions -->
		<table class="bordered margin-top-5 width-100" v-show="!new_state">
		<tr>
			<td class="width-40 bordered none-border-left none-border-top">
			<input type="text" class="bottom-line-input width-85 no-borders margin-left-0"
				placeholder="Search"
				v-model="searchkey"
				v-bind:value="searchkey"
				v-on:keyup="searchList($event, searchkey)">
			<span class="left-span no-borders"><i class="fa fa-search left-icon" aria-hidden="true"></i></span>
			</td>
			<td class="width-40 bordered none-border-left none-border-top">
			<div class="padding-top-10 padding-left-10 flex-row-10">
				<div class="flex-item-5"><span>{{newSiteLinkExtensions.length > 0 ? newSiteLinkExtensions.length : 'None'}} Selected</span></div>
				<div class="flex-item-5 right margin-right-10"><span class="blue cursor" v-on:click="loadSiteLinkExtenstions">Clear All</span></div>
			</div>
			</td>
			<td rowspan="4" class="bg-grey align-center">PREVIEW</td>
		</tr>
		<tr> 
			<td class="bordered none-border-left none-border-top">
			<span class="margin-left-10">{{searchResult.length > 0 ? searchResult[0].text : ''}}</span>
			</td>
			<td rowspan="2" class="bordered none-border-left none-border-top">
			<div class="margin-top-20 padding-left-10"
				v-for="newSiteLink in newSiteLinkExtensions"
				v-show="newSiteLinkExtensions.length > 0">
				<span>{{newSiteLink.text}}</span>
			</div>
			</td>
		</tr>
		<tr>
			<td class="bordered none-border-left none-border-top">
			<div class="margin-top-20 padding-left-10" v-for="sitelink in searchResult" v-show="searchResult.length > 0">
				<input type="checkbox" v-on:change="selectedOne(sitelink)" :checked="false">
				<span class="margin-left-10">{{sitelink.text}}</span>
			</div>
			</td>
		</tr>
		<tr>
			<td colspan="2">
			<i class="fa fa-plus-circle large-icon blue middle" aria-hidden="true"></i>
			<span class="blue cursor margin-left-5" v-on:click="new_state = true">NEW SITELNK EXTENSION</span>
			</td>
		</tr>
		</table>

		<!-- New sitelink extension -->
		<div class="flex-row-10 bordered" v-show="new_state">
		<div class="flex-item-8">
			<div class="padding-15">
			<div><span>Add new sitelink extension</span></div>
			<div><span class="font-size-smaller">Sitelink text</span></div>
			<div><input type="text" class="bottom-line-input width-100 margin-left-0" v-model="newSiteLinkExtension.text"></div>
			<div class="flex-row-10 margin-top-5">
				<div class="flex-item-8"><span class="font-size-smaller">Description line 1 (optional)</span></div>
				<div class="flex-item-2 right"><span class="font-size-smaller">{{newSiteLinkExtension.description_line_1.length}}/25</span></div>                  
			</div>
			<div><input type="text" class="bottom-line-input width-100 margin-left-0" v-model="newSiteLinkExtension.description_line_1"></div>
			<div class="flex-row-10 margin-top-5">
				<div class="flex-item-8"><span class="font-size-smaller">Description line 2 (optional)</span></div>
				<div class="flex-item-2 right"><span class="font-size-smaller">{{newSiteLinkExtension.description_line_2.length}}/35</span></div>                  
			</div>
			<div><input type="text" class="bottom-line-input width-100 margin-left-0" v-model="newSiteLinkExtension.description_line_2"></div>
			<div class="flex-row-10 margin-top-5">
				<div class="flex-item-8"><span class="font-size-smaller">Final URL</span></div>
				<div class="flex-item-2 right"><span class="font-size-smaller">{{newSiteLinkExtension.final_url.length}}/35</span></div>                  
			</div>
			<div>
				<input type="text" class="bottom-line-input width-96 margin-right-5-" v-model="newSiteLinkExtension.final_url">
				<span class="border-bottom"><i class="fa fa-question-circle left-icon" aria-hidden="true"></i></span>
			</div>
			<div class="margin-top-20">
				<i class="fa fa-angle-up trans ro-11 font-xlarge"></i>
				<span class="cursor vertical-top" v-on:click="expand('trans-11', 'ro-11')">Sitelink URL options</span>                  
				<div class="trans-11">
				<div class="margin-top-5">
					<input type="text" class="bottom-line-input width-96 margin-right-5-" v-model="newSiteLinkExtension.tracking_template" placeholder="Tracking template">
					<span class="border-bottom"><i class="fa fa-question-circle left-icon" aria-hidden="true"></i></span>
				</div>
				<div class="margin-top-20">
					<input type="checkbox">
					<span class="margin-left-10">Use a different final URL for mobile</span>
				</div>
				<div class="margin-top-5">
					<div><input type="text" class="bottom-line-input width-100 margin-left-0"
						v-model="newSiteLinkExtension.mo_final_url"
						placeholder="m.example.com">
					</div>
				</div>
				</div>
			</div>
			<div class="margin-top-20">
				<i class="fa fa-angle-up trans ro-12 font-xlarge"></i>
				<span class="cursor vertical-top" v-on:click="expand('trans-12', 'ro-12')">Advanced options</span>                  
				<div class="trans-12">
				<div class="margin-top-10">
					<span>Device preference</span>
					<i class="fa fa-question-circle" aria-hidden="true"></i>
				</div>
				<div class="margin-top-10">
					<input type="checkbox">
					<span class="margin-left-10">Mobile</span>
				</div>
				<div class="margin-top-10"><span>Extension scheduling</span></div>
				<div class="margin-top-5">
					<span class="font-size-smaller">Select when your ad extensions will be eligible to show</span>
				</div>
				<div class="margin-top-20 flex-row-10 width-100">
					<div class="flex-item-5">
					<div><span>Start date</span></div>
					<div class="margin-top-10">
						<input type="radio" name="site_link_extension_start"
							v-model="extension_start"
							:value="false"
							checked>
						<span class="margin-left-10">None</span>
					</div>
					<div class="margin-top-10">
						<input type="radio" name="site_link_extension_start" v-model="extension_start" :value="true">
						<span class="margin-left-10">Select a date</span>
					</div>
					<div class="margin-top-10 trans" v-show="extension_start">
						<input type="date" class="bottom-line-input width-80" placeholder="Select a date" v-model="newSiteLinkExtension.start_date">
					</div>
					</div>
					<div class="flex-item-5">
					<div><span>End date</span></div>
					<div class="margin-top-10">
						<input type="radio" name="site_link_extension_end"
							v-model="extension_end"
							:value="false"
							checked>
						<span class="margin-left-10">None</span>
					</div>
					<div class="margin-top-10">
						<input type="radio" name="site_link_extension_end" v-model="extension_end" :value="true">
						<span class="margin-left-10">Select a date</span>
					</div>
					<div class="margin-top-10 trans" v-show="extension_end">
						<input type="date" class="bottom-line-input width-80" placeholder="Select a date" v-model="newSiteLinkExtension.end_date">
					</div>
					</div>
				</div>
				</div>
			</div>
			</div>
			<div class="border-top padding-15">
			<span class="blue cursor" v-on:click="save(); new_state = false">SAVE AND ADD</span>
			<span class="blue cursor margin-left-25" v-on:click="new_state = false">CANCEL</span>
			</div>            
		</div>
		<div class="flex-item-2 bg-grey">
			<span class="blue cursor">PREVIEW</span>
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
        temp: [],
        new_state: false,
        extension_start: false,
        extension_end: false,
        newSiteLinkExtension: {
          text: '',
          description_line_1: '',
          description_line_2: '',
          final_url: '',
          mo_final_url: '',
          tracking_template: '',
          start_date: '',
          end_date: '',
          days_and_hours: []
        }
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
            return el.text.toLowerCase().indexOf(keywords.toLowerCase()) > -1
          })
        }
      },
      selectedOne (val) {
        this.temp.splice(this.temp.indexOf(val), 1)
        this.newSiteLinkExtensions.push(val)
      },
      save () {
        this.sitelink_extensions.push(this.newSiteLinkExtension)
        this.loadSiteLinkExtenstions()
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
  .flex-item-8 {
    flex: 8;
  }
  .flex-item-4 {
    flex: 4;
  }
  .flex-item-2 {
    flex: 2;
  }
  .width-85 {
    width: 90%;
  }
  .align-center {
    text-align: center;
  }
  .bordered {
    border: 1px solid rgba(0,0,0,0.16);
    border-collapse: collapse;
  }
  .width-15 {
    width: 10%;
  }
  .width-96 {
    width: 96%;
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
  .large-icon {
    font-size: large;
  }
  .padding-15 {
    padding: 15px;
  }
</style>
