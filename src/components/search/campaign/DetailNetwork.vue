<template>
	<div class="search-detail">

		<!-- search network campaign -->
		<div id="card" class="detail-pannel">
			<div class="top-card">
				<div class="col-md-4 align-left">
					<span class="type">Type:</span>
					<span class="title-content black">Search Network Campaign</span>
				</div>
				<div class="col-md-4 align-left">
					<span class="type">Goals:</span>
					<span class="title-content black">Visit your website</span>
				</div>
				<div class="col-md-6 right">
					<i class="fa fa-pencil" aria-hidden="true"></i>
				</div>
			</div>
		</div>

		<!-- campaign name -->
		<div id="card" class="detail-pannel margin-top-20">
			<div class="top-card">
				<div class="col-md-3">
					<span class="black">Campaign name</span>
				</div>
				<div class="col-md-3">
					<div class="trans-1">
						<input v-model="item.name" type="text" class="bottom-line-input width-100" placeholder="Campaign name">
					</div>
				</div>
				<div class="col-md-6 right">
					<i class="fa fa-angle-up trans ro-1 font-xlarge"
						v-on:click="expand('trans-1', 'ro-1')"></i>
				</div>
			</div>
		</div>

		<!-- network -->
		<div id="card" class="detail-pannel margin-top-20">
			<div class="top-card">

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
									<label class="vertical no-style margin-left-10">
										<input type="checkbox" name="partner" class="margin-top-5" id="partner" v-model="item.networkSetting.targetSearchNetwork" :value="true">
										Include Google Search Partners
									</label>
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
										<label class="vertical no-style">
											<input v-model="item.networkSetting.targetContentNetwork" :value="true" type="radio" name="partner" class="margin-top-5" id="partner">
											Yes
										</label>
									</span>
									<span class="margin-left-25">
										<label class="vertical no-style">
											<input v-model="item.networkSetting.targetContentNetwork" :value="false" type="radio" name="partner" class="margin-top-5" id="partner">
											No
										</label>
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

		<!-- device -->
		<div id="card" class="detail-pannel margin-top-20">
			<div class="top-card">
				<div class="col-md-3">
					<span class="black">Devices</span>
				</div>
				<div class="col-md-9">
					<span>Ads will show on all eligible devices by default</span>
				</div>
			</div>
		</div>

		<!-- location -->
		<div id="card" class="detail-pannel margin-top-20">
			<div class="top-card">
				<div class="col-md-3">
					<span class="black">Location</span>
				</div>
				<div class="col-md-8">
					<div class="trans-3">
						<div>
							<span>Select location to target</span>
							<i aria-hidden="true" class="fa fa-question-circle"></i>
						</div>
						<div class="margin-top-5">
							<span>
								<label class="no-style vertical margin-left-10">
									<input v-model="item.locations.setting" value="All" type="radio" name="location" class="margin-top-5" id="partner">
									All countries and territories
								</label>
							</span>
						</div>
						<div class="margin-top-5">
							<span>
								<label class="no-style vertical margin-left-10">
									<input v-model="item.locations.setting" value="Home" type="radio" name="location" class="margin-top-5" id="partner">
									India
								</label>
							</span>
						</div>
						<!--<div class="margin-top-5">
							<span>
								<label class="no-style vertical margin-left-10">
									<input v-model="item.locations.setting" value="custom" type="radio" name="location" class="margin-top-5" id="partner">
									Enter another location
								</label>
							</span>
						</div>
						<div class="margin-top-20 margin-left-25">						
							<multi-select v-model="item.locations.targeted" :options="details.locations" label="name"
								track-by="id"
								@search-change="query => search({
									url: baseURL + '/get_location/' + encodeURI(query),
									listSource: '',
									listTarget: [details, 'locations']
								})"
								:multiple="true" :close-on-select="false"
								:clear-on-select="false" :hide-selected="true" :option-height="10"
								placeholder="Enter a location to target or exclude">
							</multi-select>
							<span class="margin-left-25"><a class="blue">Advanced search</a></span>									 
						</div>-->
					</div>
				</div>
				<div class="col-md-1 right">
					<i class="fa fa-angle-up trans ro-3 font-xlarge"
						v-on:click="expand('trans-3', 'ro-3')"></i>
				</div>
			</div>
		</div>

		<!-- language -->
		<div id="card" class="detail-pannel margin-top-20">
			<div class="top-card">
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
							<multi-select v-model="item.languages" :options="details.languages" label="name"
								track-by="id"
								@search-change="search({
									url: baseURL + '/get_language',
									listSource: '',
									listTarget: [details, 'languages']
								})"
								:multiple="true" :close-on-select="false"
								:clear-on-select="false" :hide-selected="true" :option-height="10"
								placeholder="Start tying or select a language">
							</multi-select>
						</div>
					</div>
				</div>
				<div class="col-md-1 right">
					<i class="fa fa-angle-up trans ro-4 font-xlarge"
						v-on:click="expand('trans-4', 'ro-4')"></i>
				</div>
			</div>
		</div>

		<!-- Bidding -->
		<bidding :value.sync="item.bidStrategy"></bidding>

		<!-- Daily budget -->
		<div id="card" class="detail-pannel margin-top-20">
			<div class="top-card">
				<div class="col-md-3">
					<span class="black">Daily budget</span>
				</div>
				<div class="col-md-5">
					<div class="trans-6">
						<div><span>Enter a daily budget</span></div>					
						<div class="margin-top-10">						
							<span class="left-span"><i class="fa fa-inr left-icon" aria-hidden="true"></i></span>
							<input v-model="item.budget.amount" type="number" min="0" class="bottom-line-input width-40">								 
						</div>
						<div class="margin-top-20"><span class="cursor blue">Apply from Shared library</span></div>
						<div class="margin-top-20">
							<i class="fa fa-angle-up trans ro-7 font-xlarge"></i>
							<span class="cursor blue vertical-top" v-on:click="expand('trans-7', 'ro-7')">Delivery method</span>
							<div class="trans-7 margin-top-20">
								<div>
									<label class="no-style margin-left-10">
										<input v-model="item.budget.deliveryMethod" value="standard" type="radio" name="daily-bid-mode">
										Standard
									</label>
								</div>
								<div class="margin-top-20">
									<label class="no-style margin-left-10">
										<input v-model="item.budget.deliveryMethod" value="accelerated" type="radio" name="daily-bid-mode">
										Accelerated
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-4 row margin-right-0">
					<div class="col-md-10 padding-right-0 font-size-smaller">
						<div class="trans-6">
							<div class="padding-left-10 left-border">
								<span>Your daily budget is the most you`re willign to spend each day on your campaign.
										 Actual daily spend may vary.</span>
								<i class="fa fa-question-circle" aria-hidden="true"></i>
							</div>
							<div class="padding-left-10 left-border margin-top-50 padding-bottom-30 trans-7">
								<span>Standard: spend your budget evenly over time</span>
							</div>
						</div>
					</div>
					<div class="col-md-2 right padding-right-0">
						<i class="fa fa-angle-up trans ro-6 font-xlarge"
							v-on:click="expand('trans-6', 'ro-6')"></i>
					</div>
				</div>
			</div>
		</div>

		<!-- Select and start date -->
		<div id="card" class="detail-pannel margin-top-20">
			<div class="top-card">
				<div class="col-md-3">
					<span class="black">Start and end dates</span>
				</div>
				<div class="col-md-5">
					<div class="trans-8">
						<div><span>Start date</span></div>					
						<div class="margin-top-10">
							<input v-model="item.startDate" type="date" class="bottom-line-input width-40" placeholder="Start date">
						</div>
						<div class="margin-top-20">
							<label class="no-style margin-left-10">
								<input type="radio" name="select_end_date"
									v-model="select_end_date"
									v-bind:value="false"
									checked>
								None
							</label>
						</div>
						<div class="margin-top-20">
							<label class="no-style margin-left-10">
								<input type="radio" name="select_end_date"
									v-model="select_end_date"
									v-bind:value="true"
									checked>
								Select a date
							</label>
						</div>
						<div class="margin-top-10" v-show="select_end_date">
							<input v-model="item.endDate" type="date" class="bottom-line-input width-40">								 
						</div>
					</div>
				</div>
				<div class="col-md-4 row margin-right-0">
					<div class="col-md-10 padding-right-0 font-size-smaller">
						<div class="trans-8">
							<div class="padding-left-10 left-border margin-top-50 padding-bottom-30 trans-7">
								<span>Your ads will continue to run unless you specify an end date.</span>
							</div>
						</div>
					</div>
					<div class="col-md-2 right padding-right-0">
						<i class="fa fa-angle-up trans ro-8 font-xlarge"
							v-on:click="expand('trans-8', 'ro-8')"></i>
					</div>
				</div>
			</div>
		</div>

		<!-- Dynamic Search Ads -->
		<div id="card" class="detail-pannel margin-top-20">
			<div class="top-card">
				<div class="col-md-3">					
					<span class="black">Dynamic Search Ads</span>
				</div>
				<div class="col-md-5">
					<div class="trans-9">
						<div>
							<label class="no-style">
								<input type="checkbox">
								Enable Dynamic Search Ads for this campaign
							</label>
							<i class="fa fa-question-circle" aria-hidden="true"></i>
						</div>					 
						<div class="margin-top-20">
							<div>
								<span>Enter the domain</span>
								<i class="fa fa-question-circle" aria-hidden="true"></i>
							</div>
							<div class="margin-top-10">
								<input type="url" class="bottom-line-input width-40" placeholder="www.example.com">								 
							</div>
						</div>
						<div class="margin-top-20">
							<div><span>Select the language of this Dynamic Search Ad campaign</span></div>
							<div class="margin-top-10">
								<select class="form-control">
									<!--<option v-for="language in languages" value="language.dcId">{{language.name}}</option>-->
								</select>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-4 row margin-right-0">
					<div class="col-md-10 padding-right-0 font-size-smaller">
						<div class="trans-9">
							<div class="padding-left-10 left-border padding-bottom-30 trans-7">
								<div><span>Dynamic Search Ads target relevant searches automatically based on your 
										website, then use headlines automatically customized to people`s actual searches.</span></div>
								<div class="margin-top-20"><span class="cursor blue">Learn more</span></div>
							</div>
						</div>
					</div>
					<div class="col-md-2 right padding-right-0">
						<i class="fa fa-angle-up trans ro-9 font-xlarge"
							v-on:click="expand('trans-9', 'ro-9')"></i>
					</div>
				</div>
			</div>
		</div>

		<extension-view extension="sitelink-extension" label="Site link extensions"></extension-view> 
		<extension-view extension="callout-extension" label="Callout extensions"></extension-view>
		<extension-view extension="call-extension" label="Call extensions"></extension-view> 
		<extension-view extension="app-extension" label="App extensions"></extension-view> 
		<extension-view extension="ad-schedule" label="Ad schedule"></extension-view>
		<extension-view extension="ad-rotation" label="Ad rotation"></extension-view> 
		<extension-view extension="message-extension" label="Messages extension"></extension-view>
		<extension-view extension="review-extension" label="Review extension"></extension-view>
		<extension-view extension="snippet-extension" label="Snippet extension"></extension-view> 
		<extension-view extension="promotion-extension" label="Promotion extension"></extension-view>
	</div>
</template>
<script>
	import $ from 'jquery'

	import {mapState, mapActions} from 'vuex'
	import MultiSelect from 'vue-multiselect'
	import Bidding from './Bidding.vue'
	import {baseURL} from '@/config/adwords/request'
	import {vUtils} from '@/components/Mixins'
	import ExtensionView from './ExtensionView.vue'

	export default {
		name: 'DetailNetwork',
		mixins: [vUtils],
		data: () => ({
			expanded: false,
			network: false,
			selected: '',
			select_end_date: false,
			details: {
				languages: [],
				locations: []
			},
			baseURL
		}),
		mounted: function () {
			this.loadLanguages();
			for(var i = 1; i < 11; i++) this.expand('trans-' + i, 'row-' + i);
		},
		components: {
			MultiSelect,
			Bidding,
			ExtensionView
		},
		computed: {
			...mapState('adwords/campaign', ['item']),
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
	
	.margin-left-50 {
		margin-left: 50px;
	}
	.margin-top-10 {
		margin-top: 10px;
	}
	
	.margin-top-30 {
		margin-top: 30px;
	}
	.margin-top-50 {
		margin-top: 50px;
	}
	.padding-bottom-30 {
		padding-bottom: 30px;
	}
	.margin-top-5 {
		margin-top: 5px;
	}
	.margin-left-25 {
		margin-left: 25px;
	}
	.margin-right-0 {
		margin-right: 0px;
		padding-right: 0px;
	}
	.margin-right-10 {
		margin-right: 10px;
	}
	.padding-right-0 {
		padding-right: 0px;
	}
	.padding-left-10 {
		padding-left: 10px;
	}
	.padding-top-10 {
		padding-top: 10px;
	}
	.padding {
		padding: 20px 15px !important;
	}
	.align-left {
		text-align: left;
	}
	.vertical-top {
		vertical-align: top;
	}
	.trans-1,
	.trans-2,
	.trans-3,
	.trans-4,
	.trans-5,
	.trans-6,
	.trans-8,
	.trans-9,
	.trans-10,
	.trans-11,
	.trans-12 {
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
	.bold {
		font-weight: bold;
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
	.left-border {
		border-left: 1px solid rgba(0,0,0,0.5);
	}
	.bottom-line-input:focus {
		outline: 0;
		border-bottom: solid 2px #4285f4;
	}
</style>
