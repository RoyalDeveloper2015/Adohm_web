<template>
<div>
	<div class="container-fluid">
		<div class="row page-title-div">
			<div class="col-sm-6">
				<h2 class="title">Campaign Editor</h2>
				<p class="sub-title">Create or edit campaigns</p>
			</div>
		</div>
		<div class="row breadcrumb-div">
			<div class="col-sm-6">
				<ul class="breadcrumb">
					<li><i class="fa fa-home"></i> Social </li>
					<li class="active"> <a href="/social/performance/">Campaigns</a></li>
					<li class="active">Editor</li>
				</ul>
			</div>
		</div>
	</div>
	<section class="section">
		<div class="container-fluid">
			<div v-if="currentStep" class="panel">
				<ul class="breadcrumb bg-white" style="margin-bottom: 0">
					<!--<li :class="{active: !steps.length}" @click="gotoStep('platform')">Platform </li>-->
					<li v-for="step in steps" :class="{active: currentStep === step}" :key="step"><a @click="gotoStep(step)">{{getData(details.steps, step, 'name', 'id')}}</a></li>
				</ul>
			</div>
			<div v-if="currentStep === 'platform'" class="panel">
				<div class="panel-heading">
					<h4 class="panel-title">Advertising platforms</h4>
				</div>
				<div class="panel-body">
					<div class="row mb-10">
						<div class="col-xs-12"> Choose a platform: </div>
					</div>
					<div class="grid-container">
						<div @click="$set($data, 'platform', 'facebook'), gotoStep('fb_objective')" class="panel bg-primary-700 grid">
							<strong>Facebook</strong>
						</div>
						<div @click="$set($data, 'platform', 'twitter')" class="panel bg-primary-300 grid">
							<strong>Twitter</strong>
						</div>
					</div>
				</div>
			</div>
			<div v-if="currentStep === 'fb_objective' && !item._id" class="panel">
				<!--<ul class="nav nav-tabs border-bottom border-primary" role="tablist">
					<li class="active"><a href="#facebook" data-toggle="tab">Facebook</a></li>
					<li> <a  href="#twitter" data-toggle="tab">Twitter</a></li>
				</ul>-->
				<div class="panel-heading">
					<h4 class="panel-title"> Campaign objective  </h4>
				</div>
				<!-- Tab panes -->
				<div class="tab-content bg-white p-15">
					<div  class="tab-pane active" id="facebook">
						<div class="mb-5">Select a campaign objective</div>
						<div class="grid-container">
							<div @click="$set(facebook.data, 'objective', 'CONVERSIONS'), gotoStep('fb_campaign')" class="panel bg-gray-700 grid">
								<strong>Conversions</strong>
							</div>
							<div @click="$set(facebook.data, 'objective', 'LEAD_GENERATION'), gotoStep('fb_campaign')" class="panel bg-gray-700 grid">
								<strong>Lead generation</strong>
							</div>
							<div @click="$set(facebook.data, 'objective', 'APP_INSTALLS'), gotoStep('fb_campaign')" class="panel bg-gray-700 grid">
								<strong>App installs</strong>
							</div>
							<div @click="$set(facebook.data, 'objective', 'LINK_CLICKS'), gotoStep('fb_campaign')" class="panel bg-gray-700 grid">
								<strong>Website traffic</strong>
							</div>
							<div @click="$set(facebook.data, 'objective', 'PRODUCT_CATALOG_SALES'), gotoStep('fb_campaign')" class="panel bg-gray-700 grid">
								<strong>Product catalog sales</strong>
							</div>
							<div @click="$set(facebook.data, 'objective', 'OFFER_CLAIMS'), gotoStep('fb_campaign')" class="panel bg-gray-700 grid">
								<strong>Store visits</strong>
							</div>
							<div @click="$set(facebook.data, 'objective', 'VIDEO_VIEWS'), gotoStep('fb_campaign')" class="panel bg-gray-700 grid">
								<strong>Video views</strong>
							</div>
							<div @click="$set(facebook.data, 'objective', 'BRAND_AWARENESS'), gotoStep('fb_campaign')" class="panel bg-gray-700 grid">
								<strong>Brand awareness</strong>
							</div>
							<div @click="$set(facebook.data, 'objective', 'REACH'), gotoStep('fb_campaign')" class="panel bg-gray-700 grid">
								<strong>Reach</strong>
							</div>
							<div @click="$set(facebook.data, 'objective', 'ENGAGEMENT')" class="panel bg-gray-700 grid">
								<strong>Engagement</strong>
							</div>
						</div>
						<div class="row mt-20" v-if="['ENGAGEMENT', 'POST_ENGAGEMENT', 'PAGE_LIKES', 'EVENT_RESPONSES'].includes(facebook.data.objective)">
							<div class="btn-group" style="width: 600px; margin: auto!important; display: block">
								<a @click="$set(facebook.data, 'objective', 'POST_ENGAGEMENT'), gotoStep('fb_campaign')" class="btn btn-lg btn-default" :class="{active: facebook.data.objective === 'POST_ENGAGEMENT'}">Post Engagement</a>
								<a @click="$set(facebook.data, 'objective', 'PAGE_LIKES'), gotoStep('fb_campaign')" class="btn btn-lg btn-default" :class="{active: facebook.data.objective === 'PAGE_LIKES'}">Page Likes</a>
								<a @click="$set(facebook.data, 'objective', 'EVENT_RESPONSES'), gotoStep('fb_campaign')" class="btn btn-lg btn-default" :class="{active: facebook.data.objective === 'EVENT_RESPONSES'}">Event Responses</a>
							</div>
						</div>
					</div>
					<div class="tab-pane" id="twitter">
					</div>
				</div>
			</div>
			<form @submit="submitCampaign" v-if="currentStep === 'fb_campaign' && facebook.data.objective">
				<div class="panel">
					<div class="panel-heading">
						<h4 class="panel-title">Basic details</h4>
					</div>
					<div class="panel-body">
						<div class="row form-group">
							<div class="col-xs-4 ">
								<label  class="control-label">Advertiser:</label>
							</div>
							<div class="col-xs-8 text-left">
								<multi-select 
									required 
									track-by="_id" 
									label="name"
									placeholder="Search advertiser"
									v-model="item.advertiser"
									:options="details.advertisers" 
									@search-change="search({
										url: '/api/advertisers',
										listTarget: [details, 'advertisers']
									})">
								</multi-select>
							</div>
						</div>
						<div class="row align-content">
							<div class="col-xs-4">
								<label class="control-label">Campaign Name</label>
							</div>
							<div class="col-xs-8">
								<input required type="text" class="form-control" v-model="item.name">
							</div>
						</div>
					</div>
				</div>
				<template v-show="item.name && item.advertiser && facebook.data.objective">
					<div class="panel" v-if="facebook.data.objective === 'CONVERSIONS'">
						<div class="panel-heading">
							<h4 class="panel-title">Conversion</h4>
						</div>
						<div class="panel-body">
							<div class="row">
								<div class="col-xs-4">
									<label for="" class="control-label">Conversion event</label>
								</div>
								<div class="col-xs-8">
									<multi-select required label="name"  track-by="id" v-model="facebook.data.custom_event_type" :options="details.conversion_events"></multi-select>
								</div>
							</div>
						</div>
					</div>
					<div class="panel" v-if="facebook.data.objective === 'APP_INSTALLS'">
						<div class="panel-heading">
							<h4 class="panel-title">App</h4>
						</div>
						<div class="panel-body">
							<div class="row">
								<div class="col-xs-4">
									App url
								</div>
								<div class="col-xs-8">
									<input type="url" v-model="facebook.data.promoted_object.object_store_url" class="form-control" placeholder="App url">
								</div>
							</div>
							<div class="row">
								<div class="col-xs-4">
									App Id
								</div>
								<div class="col-xs-8">
									<input type="text" v-model="facebook.data.promoted_object.application_id" class="form-control" required placeholder="App id">
								</div>
							</div>
						</div>
					</div>
					<div class="panel" v-show="item.name && item.advertiser && facebook.data.objective">
						<div class="panel-heading">
							<h4 class="panel-title">Audience</h4>
						</div>
						<div class="panel-body">
							<div class="row align-content">
								<div class="col-xs-4">
									<label class="control-label">Location</label>
								</div>
								<div class="col-xs-8">
									<label for="">Geo includes</label>
									<multi-select label="name" track-by="id" :required="!geo_excludes.length" :multiple="true" 
										v-model="item.targeting_rules.geo_includes" :options="details.geo" 
										@search-change="query => search({
											url: '/api/geo/suggestions?keyword={query}', 
											listTarget: [details, 'geo'],
											query
										})"
										placeholder="Type in a city, region or country (minimum 3 char)">
									</multi-select>
									<label for="">Geo excludes</label>
									<multi-select label="name" track-by="id" :required="!geo_includes.length" :multiple="true" v-model="item.targeting_rules.geo_excludes" :options="details.geo"
										@search-change="query => search({
											url: '/api/geo/suggestions?keyword={query}', 
											listTarget: [details, 'geo'],
											query
										})"
										placeholder="Type in a city, region or country (minimum 3 char)">
									</multi-select>
								</div>
							</div>
							<div class="row align-content">
								<div class="col-xs-4">
									<label class="control-label">Age</label>
								</div>
								<div class="col-xs-8">
									<div class="row">
										<div class="col-xs-6">
											<multi-select v-model="item.targeting_rules.age_min" :options="fb_age_list"></multi-select>
										</div>
										<div class="col-xs-6">
											<multi-select v-model="item.targeting_rules.age_max" :options="fb_age_list"></multi-select>
										</div>
									</div>
								</div>
							</div>
							<div class="row align-content">
								<div class="col-xs-4">
									<label class="control-label">Gender</label>
								</div>
								<div class="col-xs-8">
									<label class="box-label"> <input type="radio" v-model="item.targeting_rules.gender" :value="null"> All  </label>
									<label class="box-label"> <input type="radio" v-model="item.targeting_rules.gender" value="1"> Men  </label>
									<label class="box-label"> <input type="radio" v-model="item.targeting_rules.gender" value="2"> Women  </label>
								</div>
							</div>
							<div class="row align-content">
								<div class="col-xs-4">
									<label class="control-label">Languages</label>
								</div>
								<div class="col-xs-8">
									<multi-select placeholder="Search languages" 
										:options="details.locales" 
										label="name" track-by="key"
										@search-change="query => search({
											url: `${fbApi.baseUrl}/search?q={query}&type=adlocale&access_token=${fbApi.accessToken}`, 
											listTarget: [details, 'locales'],
											listSource: '.data',
											query
										})"
										v-model="facebook.data.locales" :multiple="true">
									</multi-select>
								</div>
							</div>
							<div class="row ">
								<div class="col-xs-4">
									<label class="control-label">Detailed targeting</label>
								</div>
								<div class="col-xs-8">
									<div class="form-group row" v-for="audience, idx in facebook.data.flexible_targeting">
										<div class="col-xs-12">
											<label class="control-label" v-if="idx > 0"> and MUST ALSO match at least ONE of the following </label>
										</div>
										<div :class="{'col-xs-11': idx > 0, 'col-xs-12': idx ===0}">
											<multi-select 
												label="name" track-by="id"
												v-model="facebook.data.flexible_targeting[idx]" 
												placeholder="Search audience types" 
												@search-change="query => search({
													url: `${fbApi.baseUrl}/act_${fbApi.accountId}/targetingsearch?q={query}&access_token=${fbApi.accessToken}`,
													listTarget: [details, 'flexible_targeting'],
													listSource: '.data',
													query
												})"
												:options="details.flexible_targeting"
												:multiple="true">
												<template slot="option" scope="props">
													<span tabindex="0" data-select="Press enter to select" data-selected="Selected" data-deselect="Press enter to remove" class="multiselect__option">
														<span>{{props.option.name}}</span> <br/> <small> {{props.option.path.join('>')}} </small>
													</span>
												</template>
											</multi-select>
										</div>
										<div v-if="idx > 0" class="col-xs-1">
											<a @click="facebook.data.flexible_targeting.splice(idx, 1)" class="btn btn-danger pull-right">
												<span class="glyphicon glyphicon-remove"></span>
											</a>
										</div>
									</div>
									<div class=" form-group">
										<a @click="narrowAudience()" v-if="facebook.data.flexible_targeting.length" class="btn btn-sm btn-info">
											<span class="glyphicon glyphicon-filter"></span> Narrow Audience </a>
										<!--<a class="btn btn-xs btn-default"> Exclude Audience </a>-->
									</div>
									<div>
										<label class="control-label"> EXCLUDE people who match at least ONE of the following </label>
									</div>
									<div class="form-group input-group">
										<span class="input-group-addon">Exclude</span>
										<multi-select 
											label="name" track-by="id"
											v-model="facebook.data.excludes" 
											@search-change="query => search({
												url: `${fbApi.baseUrl}/act_${fbApi.accountId}/targetingsearch?q={query}&access_token=${fbApi.accessToken}`, 
												listTarget: [details, 'flexible_targeting'],
												listSource: '.data',
												query
											})"
											placeholder="Search audience types" 
											:options="details.flexible_targeting" 
											:multiple="true">
											<template slot="option" scope="props">
												<span tabindex="0" data-select="Press enter to select" data-selected="Selected" data-deselect="Press enter to remove" class="multiselect__option">
													<span>{{props.option.name}}</span> <br/> <small> {{props.option.path.join('>')}} </small>
												</span>
											</template>
										</multi-select>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="panel" v-show="item.name && item.advertiser && facebook.data.objective">
						<div class="panel-heading">
							<h4 class="panel-title">Placements</h4>
						</div>
						<div class="panel-body">
							<div class="row align-content">
								<div class="col-xs-4">
									<label class="control-label">Placement method</label>
								</div>
								<div class="col-xs-8">
									<label class="box-label"> <input type="radio" v-model="facebook.data.placements.method" value="auto"> Automatic</label>
									<label class="box-label"> <input type="radio" v-model="facebook.data.placements.method" value="manual"> Manual</label>
								</div>
							</div>
							<div v-show="facebook.data.placements.method === 'manual'" class="row align-content">
								<div class="col-xs-4">
									<label class="control-label">Device type</label>
								</div>
								<div class="col-xs-8">
									<label class="box-label"> <input type="radio" v-model="facebook.data.placements.deviceType" name="deviceType" value="all"> All</label>
									<label class="box-label"> <input type="radio" v-model="facebook.data.placements.deviceType" name="deviceType" value="mobile"> Mobiles</label>
									<label class="box-label"> <input type="radio" v-model="facebook.data.placements.deviceType" name="deviceType" value="desktop"> Desktops</label>
									<label class="m-5"> Specific Mobile devices and Operating systems </label>
									<multi-select 
										v-model="facebook.data.user_os" placeholder="Select operating system" 
										label="platform" track-by="platform"
										:options="details.user_oses"
										@search-change="search({
											url: `${fbApi.baseUrl}/search?type=adTargetingCategory&class=user_os&access_token=${fbApi.accessToken}`,
											listTarget: [details, 'user_oses'],
											listSource: '.data'
										})">
									</multi-select>
									<label class="m-5">
										<input type="checkbox" v-model="facebook.data.wireless_carrier" value="Wifi">
										Only when connected to WiFi
									</label>
								</div>
							</div>
							<div v-show="facebook.data.placements.method === 'manual'" class="row align-content">
								<div class="col-xs-4">
									<label class="control-label">Platforms</label>
								</div>
								<div class="col-xs-8">
									<multi-select placeholder="Select multiple" :multiple="true" 
										id="platforms"
										v-model="facebook.data.placements.platforms" :options="platforms"
										group-label="platform"
										group-values="placements"
										label="name" track-by="id">
									</multi-select>
								</div>
							</div>
						</div>
					</div>
					<div class="panel" v-show="item.name && item.advertiser && facebook.data.objective">
						<div class="panel-heading">
							<h4 class="panel-title">Budget and Schedule</h4>
						</div>
						<div class="panel-body">
							<div class="row align-content">
								<div class="col-xs-4">
									<label class="control-label">Budget</label>
								</div>
								<div class="col-xs-8">
									<label class="box-label"> <input type="radio" v-model="facebook.data.budgetType" name="budgetType" value="daily"> Daily budget </label>
									<label class="box-label"> <input type="radio" v-model="facebook.data.budgetType" name="budgetType" value="lifetime"> Lifetime budget </label>
									<div class="input-group">
										<span class="input-group-addon">{{currency_symbol}}</span>
										<input v-if="facebook.data.budgetType === 'daily'" :required="!item.budget" type="number" min="0" class="form-control" placeholder="Enter daily budget" v-model="item.dailybudget">
										<input v-if="facebook.data.budgetType === 'lifetime'" :required="!item.dailybudget" type="number" min="0" class="form-control" placeholder="Enter lifetime budget" v-model="item.budget">
									</div>
								</div>
							</div>
							<div class="row align-content">
								<div class="col-xs-4">
									<label class="control-label">Schedule</label>
								</div>
								<div class="col-xs-8">
									<label class="box-label"> <input :disabled="facebook.data.budgetType === 'lifetime'" type="radio" v-model="facebook.data.scheduleType" name="scheduleType" value="default"> Run my ad set continuously starting today </label>
									<label class="box-label"> <input type="radio" v-model="facebook.data.scheduleType" name="scheduleType" value="custom"> Set a start and end date </label>
									<div class="row " v-show="facebook.data.scheduleType === 'custom'">
										<div class="col-xs-6"> <input type="date" v-model="item.date_start" class="form-control" placeholder="Start date"> </div>
										<div class="col-xs-6"> <input type="date" v-model="item.date_end" class="form-control" placeholder="End date"> </div>
									</div>
								</div>
							</div>
							<div class="row align-content">
								<div class="col-xs-4">
									<label class="control-label">Optimization for Ad Delivery</label>
								</div>
								<div class="col-xs-8">
									<multi-select required v-model="facebook.data.optimization_goal" :options="getOptimizationGoals()"
										label="name" track-by="id">
									</multi-select>
								</div>
							</div>
							<div class="row" v-if="facebook.data.optimization_goal.id === 'REACH'">
								<div class="col-xs-4">
									<label for="">Frequency cap</label>
								</div>
								<div class="col-xs-8">
									Number of days the ad shown to same user
									<input type="number" min="1" max="90" v-model="facebook.data.frequency_cap" class="form-control" required>
								</div>
							</div>
							<div class="row align-content" v-if="facebook.data.optimization_goal.id === 'OFFSITE_CONVERSIONS'" >
								<div class="col-xs-4">
									<label class="control-label">Conversion window</label>
								</div>
								<div class="col-xs-8">
									<multi-select v-model="facebook.data.attribution_window_days" :options="attribution_window_days"
										group-label="label"
										group-values="values"
										label="name" track-by="id">
									</multi-select>
								</div>
							</div>
							<div class="row align-content">
								<div class="col-xs-4">
									<label class="control-label">Bid amount</label>
								</div>
								<div class="col-xs-8">
									<div class="row">
										<div class="col-xs-6" v-show="facebook.data.objective !== 'BRAND_AWARENESS'">
											<label> <input type="radio" name="bidtype" value="auto" v-model="facebook.data.bidType"> Automatic </label>
											<label> <input type="radio" name="bidtype" value="manual" v-model="facebook.data.bidType"> Manual </label>
										</div>
										<div v-if="facebook.data.bidType === 'manual'" class="col-xs-6">
											<div class="input-group">
												<span class="input-group-addon">{{currency_symbol}}</span>
												<input required type="number" min="0" v-model="item.bid" class="form-control">
												<span class="input-group-addon">{{bid_unit}}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row mt-20">
						<div class="col-xs-4"></div>
						<div class="col-xs-8">
							<button class="btn btn-primary">Continue <span class="glyphicon glyphicon-chevron-right"></span></button>
						</div>
					</div>
				</template>
			</form>
			<form @submit="submit">
				<creative-editor v-if="currentStep === 'fb_ads'" :value.sync="facebook.data.ad" :meta="meta"></creative-editor>
			</form>
		</div>
	</section>
</div>
</template>
<script>
import Vue from 'vue'
import {mapGetters} from 'vuex'
import MultiSelect from 'vue-multiselect'
import {vUtils} from '@/components/Mixins'
import {request} from '@/config/default/request'
import CreativeEditor from './facebook/CreativeEditor'

export default {
	components: {MultiSelect, CreativeEditor},
	mixins: [vUtils],
	data: () => ({
		currentStep: 'platform',
		steps: ['platform'],
		platform: 'facebook',
		item: {
			_id: null,
			name: null,
			date_start: null,
			date_end: null,
			bid: null,
			bidtype: 'CPC',
			budget: null,
			dailybudget: null,
			advertiser: {},
			creatives: [],
			targeting_rules: {
				age_min: 13,
				age_max: 65,
				gender: null,
				freq: {},
				geo_includes: [],
				geo_excludes: [],
				weekdays: [],
				daytime: []
			},
			facebook: {
				enabled: true,
				data: {
					custom_event_type: 'LEAD',
					budgetType: 'daily',
					scheduleType: 'default',
					bidType: 'auto',
					optimization_goal: {},
					billing_event: {},
					attribution_window_days: 1,
					wireless_carrier: [],
					flexible_targeting: [[]],
					excludes: [],
					locales: [],
					objective: null,
					promoted_object: {object_store_url: null, application_id: null},
					user_os: [],
					frequency_cap: null,
					placements: {
						method: 'auto',
						deviceType: '',
						platforms: ''
					},
					ad: {
						campaign_id: null,
						objective: null,
						advertiser: {}
					}
				}
			}
		},
		details: {
			user_oses: [],
			advertisers: [],
			currency: {},
			locales: [],
			flexible_targeting: [],
			geo: [],
			steps: [
				{id: 'platform', name: 'Platform'},
				{id: 'fb_objective', name: 'Objective'},
				{id: 'fb_campaign', name: 'Campaign'},
				{id: 'fb_ads', name: 'Ads'}
			],
			optimization_goals: [
				{id: 'OFFSITE_CONVERSIONS', name: 'Conversions'},
				{id: 'LINK_CLICKS', name: 'Link Clicks'},
				{id: 'IMPRESSIONS', name: 'Impressions'},
				{id: 'REACH', name: 'Daily Unique Reach'},
				{id: 'APP_INSTALLS', name: 'App Installs'},
				{id: 'VIDEO_VIEWS', name: 'Video views'},
				{id: 'BRAND_AWARENESS', name: 'Brand awareness'},
				{id: 'LEAD_GENERATION', name: 'Lead generation'},
				{id: 'POST_ENGAGEMENT', name: 'Post Engagement'},
				{id: 'PAGE_LIKES', name: 'Page Likes'},
				{id: 'EVENT_RESPONSES', name: 'Event Responses'}
			],
			conversion_events: [{'id': 'CONTENT_VIEW', 'name': 'ViewContent'}, {'id': 'SEARCH', 'name': 'Search'}, {'id': 'ADD_TO_CART', 'name': 'AddToCart'}, {'id': 'ADD_TO_WISHLIST', 'name': 'AddToWishlist'}, {'id': 'INITIATED_CHECKOUT', 'name': 'InitiateCheckout'}, {'id': 'ADD_PAYMENT_INFO', 'name': 'AddPaymentInfo'}, {'id': 'PURCHASE', 'name': 'Purchase'}, {'id': 'LEAD', 'name': 'Lead'}, {'id': 'COMPLETE_REGISTRATION', 'name': 'CompleteRegistration'}]
		},
		options: {
			fbAccount: {},
			uploads: []
		}
	}),
	methods: {
		gotoStep(step) {
			if(!this.steps.includes(step)) this.steps.push(step);
			Vue.set(this, 'currentStep', step);
		},
		getEvent(e) {
			var url = e.currentTarget.value;
			request.get(this.fbApi.baseUrl + '/search', {params: {
				type: 'addestination',
				object_url: url,
				access_token: this.fbApi.accessToken
			}}).then(({data}) => {
				if(data.data && data.data[0]) {
					Vue.set(this.fbad, 'event', data.data[0]);
				}
			});
		},
		narrowAudience() {
			this.facebook.data.flexible_targeting.push([]);
		},
		fbCombineList(list) {
			debugger
			var fullList = [];
			for(var i in list) fullList = fullList.concat(list[i]);
			return fullList;
		},
		fbUpdateList(list, value) {
			debugger
			if(!value) return;
			if(!Array.isArray(value)) value = [value];
			value.forEach(item => {
				if(!list[item.type]) list[item.type] = [];
				if(!list[item.type].find(el => el.id === item._id)) list[item.type].push(item);
			});
		},
		getData(list, id, field, keyname = '_id') {
			var item = list.find((item) => item[keyname] === id);
			return item && item[field];
		},
		processList(list, detailedList, matchKey = 'id') {
			for(var i in list) list[i] = detailedList.find(el => el[matchKey] === list[i]);
			return list;
		},
		normalizeList(list, matchKey = 'id') {
			for(var i in list) list[i] = list[i][matchKey];
			return list;
		},
		handleResponse({data}) {
			if(data.success) {
				this.message('Success');
				// location.href = '/campaigns/';
			} else this.message('Error saving campaign', 'danger');
		},
		removeUnchangedFields(item, preserveFields) {
			var original = this.originalItem;
			for(var i in item) {
				if(JSON.stringify(item[i]) === JSON.stringify(original[i])) {
					if(Array.isArray(preserveFields) && preserveFields.includes(i)) continue;
					delete item[i];
				}
			}
			return item;
		},
		submitCampaign(event) {
			event.preventDefault();
			if(!event.currentTarget.checkValidity()) return;
			return this.gotoStep('fb_ads');
		},
		submit(event) {
			event.preventDefault();
			if(!event.currentTarget.checkValidity()) return;
			var campaign = clone(this.item);
			if(campaign._id) campaign = this.removeUnchangedFields(campaign, ['_id']);
			if (Object.keys(campaign).length <= 1) return this.message('Nothing changed', 'info');

			console.log(clone(campaign));
			if(campaign.services) {
				var facebook = campaign.facebook;
				if(facebook.enabled) {
					facebook.data.locales = this.processList(facebook.data.locales, this.details.locales, 'key');
				}
			}
			if(campaign._id)	{
				var campaignId = campaign._id;
				delete campaign._id;
				request.post(`/api/campaigns/${campaignId}`, campaign).then(this.handleResponse).catch(this.handleResponse);
			} else {
				request.post('/api/campaigns/', campaign).then(this.handleResponse).catch(this.handleResponse);
			}
		},
		updateList(list, value, key = 'id') {
			if(!value) return;
			if(!Array.isArray(value)) value = [value];
			value.forEach(item => {
				if(!list.find(el => el[key] === item[key])) list.push(item);
			});
		},
		getOptimizationGoals() {
			var goals = [];
			switch(this.facebook.data.objective) {
				case 'BRAND_AWARENESS':
					goals = ['BRAND_AWARENESS', 'REACH'];
					break;
				case 'REACH':
					goals = ['REACH', 'IMPRESSIONS'];
					break;
				case 'LINK_CLICKS':
					goals = ['LINK_CLICKS', 'REACH', 'IMPRESSIONS'];
					break;
				case 'VIDEO_VIEWS':
					goals = ['VIDEO_VIEWS', 'REACH'];
					break;
				case 'LEAD_GENERATION':
					goals = ['LEAD_GENERATION', 'LINK_CLICKS'];
					break;
				case 'CONVERSIONS':
					goals = ['OFFSITE_CONVERSIONS', 'LINK_CLICKS', 'IMPRESSIONS', 'REACH'];
					break;
				case 'APP_INSTALLS':
					goals = ['APP_INSTALLS', 'LINK_CLICKS', 'VIDEO_VIEWS', 'OFFSITE_CONVERSIONS'];
					break;
				case 'POST_ENGAGEMENT':
					goals = ['POST_ENGAGEMENT', 'IMPRESSIONS', 'REACH'];
					break;
				case 'PAGE_LIKES':
					goals = ['PAGE_LIKES'];
					break;
				case 'EVENT_RESPONSES':
					goals = ['EVENT_RESPONSES', 'POST_ENGAGEMENT', 'IMPRESSIONS', 'REACH'];
					break;
				case 'OFFER_CLAIMS':
				case 'PRODUCT_CATALOG_SALES':
			}
			return goals.map(goal => this.details.optimization_goals.find(el => el.id === goal));
		}
	},
	beforeMount() {
		this.gotoStep('platform');
		console.log('campaign editor');
		if(this.$route && this.$route.params.id) {
			request.get('/api/campaigns/' + this.$route.params.id).then(({data}) => {
				if(!data.result) return this.message('Error fetching campaign data');
				Vue.set(this, 'steps', ['fb_campaign', 'fb_ads']);
				this.gotoStep('fb_campaign');
				var campaign = data.result;
				var facebook = campaign.facebook;
				var targeting = campaign.targeting_rules;
				for (var i in {geo_includes:0, geo_excludes:0}) {
					this.details.geo = this.details.geo.concat(targeting[i]);
					// targeting[i] = targeting[i].map(item => item._id);
				}
				// this.details.advertisers = this.details.advertisers.concat(campaign.advertiser);
				// campaign.advertiser = campaign.advertiser._id;
				if(facebook.campaign_id && facebook.data) {
					facebook.enabled = true;
					Vue.set(this.details, 'locales', clone(facebook.data.locales || []));
					facebook.data.locales = this.normalizeList(facebook.data.locales, 'key');
				}

				this.originalItem = Object.assign({}, this.item, campaign);
				Vue.set(this, 'item', clone(this.originalItem));
			});
		}
		request.get('/api/currency').then(({data}) => {
			if(data.success) {
				Vue.set(this.details, 'currency', data.result);
			}
		});
	},
	computed: {
		...mapGetters('session', ['currency']),
		currency_symbol() {
			let currency = this.currency.find(el => el.name == this.item.advertiser.currency);
			return currency && currency.symbol || '';
		},
		facebook() {
			return this.item.facebook;
		},
		fbad() {
			return this.item.facebook.data.ad;
		},
		bid_unit() {
			switch(this.facebook.data.optimization_goal.id) {
				case 'OFFSITE_CONVERSIONS':
				case 'LEAD_GENERATION': return 'per result';
				case 'VIDEO_VIEWS': return 'per video view';
				case 'LINK_CLICKS': return 'per link click';
				case 'APP_INSTALLS': return 'per app install';
				case 'POST_ENGAGEMENT': return 'per post engagement';
				case 'PAGE_LIKES': return 'per page like';
				case 'EVENT_RESPONSES':
				case 'BRAND_AWARENESS':
				case 'IMPRESSIONS':
				case 'REACH': return 'per 1, 000 impressions';
			}
		},
		geo_includes() {return this.item.targeting_rules.geo_includes || [] },
		geo_excludes() {return this.item.targeting_rules.geo_excludes || [] },
		fb_age_list() {
			var ages = [];
			for(let i = 13; i <= 65; i++) ages.push(i);
			return ages;
		},
		platforms() {
			return [{
				platform: 'Facebook',
				placements: [
					{id: 'fb.feed', name: 'Feeds'},
					{id: 'fb.instant_article', name: 'Instant Articles'},
					{id: 'fb.instream_video', name: 'In-stream videos'},
					{id: 'fb.suggested_video', name: 'Suggested videos'},
					{id: 'fb.right_hand_column', name: 'Right Colum'}
				]
			}, {
				platform: 'Instagram',
				placements: [
					{id: 'instagram.stream', name: 'Instagram Feed'},
					{id: 'instagram.story', name: 'Instagram Stories'}
				]
			}, {
				platform: 'Other',
				placements: [
					{id: 'audience_network', name: 'Audience Network'}
				]
			}]
		},
		attribution_window_days() {
			return [{
				label: 'AFTER CLICKING AD',
				values: [
					{id:1, name: '1 day click'},
					{id:7, name: '7 days click'}
				]
			}, {
				label: 'AFTER CLICKING OR VIEWING AD',
				values: [
					{id: 'view_through:1', name: '1 day click or view'},
					{id: 'view_through:2', name: '7 days click or 1 day view'}
				]
			}];
		},
		meta() {
			return {
				campaign_id: this.item._id,
				objective: this.facebook.data.objective,
				advertiser: this.item.advertiser
			}
		}
	},
	watch: {
		'item.facebook.data.budgetType': {
			immediate: true,
			handler: function(value) {
				if(value === 'lifetime') {
					Vue.set(this.facebook.data, 'scheduleType', 'custom');
				}
			}
		},
		'item.facebook.data.optimization_goal': {
			handler: function(goal) {
				if(this.facebook.data.objective === 'BRAND_AWARENESS') {
					if(goal === 'BRAND_AWARENESS') Vue.set(this.facebook.data, 'bidType', 'auto');
					else Vue.set(this.facebook.data, 'bidType', 'manual');
				}
			}
		},
		'item.facebook.data.objective': {
			handler: function(objective) {
				if(objective === 'BRAND_AWARENESS') {
					if(this.facebook.data.optimization_goal === 'BRAND_AWARENESS') Vue.set(this.facebook.data, 'bidType', 'auto');
					else Vue.set(this.facebook.data, 'bidType', 'manual');
				}
			}
		},
		'fbad.page.id': {
			handler: function(pageId) {
				this.$forceUpdate();
			}
		},
		'item.advertiser': {
			deep: true,
			handler(data) {
				console.log(clone(data))
			}
		}
	}
}
</script>
