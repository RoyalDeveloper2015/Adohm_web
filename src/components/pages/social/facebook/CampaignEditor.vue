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
					<li v-for="step in steps" :class="{active: currentStep === step}"><a @click="gotoStep(step)" href="#">{{getData(details.steps, step, 'name', 'id')}}</a></li>
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
						<div @click="$set($data, 'platform', 'facebook'); gotoStep('fb_objective')" class="panel bg-primary-700 grid">
							<strong>Facebook</strong>
						</div>
						<div @click="$set($data, 'platform', 'twitter');" class="panel bg-primary-300 grid">
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
							<div @click="$set(facebook.data, 'objective', 'CONVERSIONS'); gotoStep('fb_campaign')" class="panel bg-gray-700 grid">
								<strong>Conversions</strong>
							</div>
							<div @click="$set(facebook.data, 'objective', 'LEAD_GENERATION'); gotoStep('fb_campaign')" class="panel bg-gray-700 grid">
								<strong>Lead generation</strong>
							</div>
							<div @click="$set(facebook.data, 'objective', 'APP_INSTALLS'); gotoStep('fb_campaign')" class="panel bg-gray-700 grid">
								<strong>App installs</strong>
							</div>
							<div @click="$set(facebook.data, 'objective', 'LINK_CLICKS'); gotoStep('fb_campaign')" class="panel bg-gray-700 grid">
								<strong>Website traffic</strong>
							</div>
							<div @click="$set(facebook.data, 'objective', 'PRODUCT_CATALOG_SALES'); gotoStep('fb_campaign')" class="panel bg-gray-700 grid">
								<strong>Product catalog sales</strong>
							</div>
							<div @click="$set(facebook.data, 'objective', 'OFFER_CLAIMS'); gotoStep('fb_campaign')" class="panel bg-gray-700 grid">
								<strong>Store visits</strong>
							</div>
							<div @click="$set(facebook.data, 'objective', 'VIDEO_VIEWS'); gotoStep('fb_campaign')" class="panel bg-gray-700 grid">
								<strong>Video views</strong>
							</div>
							<div @click="$set(facebook.data, 'objective', 'BRAND_AWARENESS'); gotoStep('fb_campaign')" class="panel bg-gray-700 grid">
								<strong>Brand awareness</strong>
							</div>
							<div @click="$set(facebook.data, 'objective', 'REACH'); gotoStep('fb_campaign')" class="panel bg-gray-700 grid">
								<strong>Reach</strong>
							</div>
							<div @click="$set(facebook.data, 'objective', 'ENGAGEMENT');" class="panel bg-gray-700 grid">
								<strong>Engagement</strong>
							</div>
						</div>
						<div class="row mt-20" v-if="['ENGAGEMENT', 'POST_ENGAGEMENT', 'PAGE_LIKES', 'EVENT_RESPONSES'].includes(facebook.data.objective)">
							<div class="btn-group" style="width: 600px; margin: auto!important; display: block">
								<a @click="$set(facebook.data, 'objective', 'POST_ENGAGEMENT'); gotoStep('fb_campaign')" class="btn btn-lg btn-default" :class="{active: facebook.data.objective === 'POST_ENGAGEMENT'}">Post Engagement</a>
								<a @click="$set(facebook.data, 'objective', 'PAGE_LIKES'); gotoStep('fb_campaign')" class="btn btn-lg btn-default" :class="{active: facebook.data.objective === 'PAGE_LIKES'}">Page Likes</a>
								<a @click="$set(facebook.data, 'objective', 'EVENT_RESPONSES'); gotoStep('fb_campaign')" class="btn btn-lg btn-default" :class="{active: facebook.data.objective === 'EVENT_RESPONSES'}">Event Responses</a>
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
								<selectize  required placeholder="Search advetiser" @data="value=>updateList(details.advertisers, value)" v-model="item.advertiser" :data="details.advertisers" :options='{preload: true, ajax: {url: "/api/advertisers/"}}'></selectize>
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
									<selectize required v-model="facebook.data.custom_event_type">
										<option value="CONTENT_VIEW">ViewContent</option>
										<option value="SEARCH">Search</option>
										<option value="ADD_TO_CART">AddToCart</option>
										<option value="ADD_TO_WISHLIST">AddToWishlist</option>
										<option value="INITIATED_CHECKOUT">InitiateCheckout</option>
										<option value="ADD_PAYMENT_INFO">AddPaymentInfo</option>
										<option value="PURCHASE">Purchase</option>
										<option value="LEAD">Lead</option>
										<option value="COMPLETE_REGISTRATION">CompleteRegistration</option>
									</selectize>
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
									<selectize :required="!geo_excludes.length" :multiple="true" v-model="item.targeting_rules.geo_includes" :data="details.geo" :options='{valueField: "id", ajax: {url: "/api/geo/suggestions?keyword={query}"}}'
											placeholder="Type in a city, region or country (minimum 3 char)" @data="data => updateList(details.geo, data)">
									</selectize>
									<label for="">Geo excludes</label>
									<selectize :required="!geo_includes.length" :multiple="true" v-model="item.targeting_rules.geo_excludes" :data="details.geo"  :options='{valueField: "id", ajax: {url: "/api/geo/suggestions?keyword={query}"}}'
											placeholder="Type in a city, region or country (minimum 3 char)" @data="data => updateList(details.geo, data)">
									</selectize>
								</div>
							</div>
							<div class="row align-content">
								<div class="col-xs-4">
									<label class="control-label">Age</label>
								</div>
								<div class="col-xs-8">
									<div class="row">
										<div class="col-xs-6">
											<selectize v-model="item.targeting_rules.age_min">
												<option value="13">13</option>
												<option :value="13+n" v-for="n in 52">{{n+13}}</option>
											</selectize>
										</div>
										<div class="col-xs-6">
											<selectize v-model="item.targeting_rules.age_max">
												<option value="13">13</option>
												<option :value="13+n" v-for="n in 51">{{n+13}}</option>
												<option value="65">65+</option>
											</selectize>
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
									<selectize placeholder="Search languages" :data="details.locales" @data="value => updateList(details.locales, value, 'key')" v-model="facebook.data.locales" :multiple="true" :options="{valueField: 'key', listPath: 'data', ajax:{url: options.fbApi.baseUrl + '/search?q={query}&type=adlocale&access_token=' + options.fbApi.accessToken}}">
									</selectize>
								</div>
							</div>
							<div class="row ">
								<div class="col-xs-4">
									<label class="control-label">Detailed targeting</label>
								</div>
								<div class="col-xs-8">
									<div class="form-group row" v-for="audience,idx in facebook.data.flexible_targeting">
										<div class="col-xs-12">
											<label class="control-label" v-if="idx > 0"> and MUST ALSO match at least ONE of the following </label>
										</div>
										<div :class="{'col-xs-11': idx > 0, 'col-xs-12': idx ===0}">
											<selectize :value="fbCombineList(audience).map(el=>el.id)" placeholder="Search audience types" :data="fbCombineList(audience)" @data="item => fbUpdateList(audience, item)" :multiple="true" :options="{descriptionField: 'type', listPath: 'data', ajax: {url: options.fbApi.baseUrl + '/act_' + options.fbApi.accountId + '/targetingsearch?q={query}&access_token=' + options.fbApi.accessToken}}"></selectize>
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
										<selectize :value="fbCombineList(facebook.data.excludes).map(el=>el.id)" placeholder="Search audience types" :data="fbCombineList(facebook.data.excludes)" @data="item => fbUpdateList(facebook.data.excludes, item)" :multiple="true" :options="{descriptionField: 'type', listPath: 'data', ajax: {url: options.fbApi.baseUrl + '/act_' + options.fbApi.accountId + '/targetingsearch?q={query}&access_token=' + options.fbApi.accessToken}}"></selectize>
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
									<label class="box-label">	<input type="radio" v-model="facebook.data.placements.method" value="auto"> Automatic</label>
									<label class="box-label">	<input type="radio" v-model="facebook.data.placements.method" value="manual"> Manual</label>
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
									<selectize v-model="facebook.data.user_os" placeholder="Select operating system" :data="details.user_oses" @data="item => updateList(details.user_oses, item, 'platform')"
										:options="{listPath: 'data', labelField: 'platform', valueField: 'platform', preload: true, ajax: {url: options.fbApi.baseUrl + '/search?q={query}&type=adTargetingCategory&class=user_os&access_token=' + options.fbApi.accessToken}}"></selectize>
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
									<selectize placeholder="Select multiple" :multiple="true" v-model="facebook.data.placements.platforms">
										<optgroup label="Facebook">
											<option value="facebook.feed">Feeds</option>
											<option value="facebook.instant_article">Instant Articles</option>
											<option value="facebook.instream_video">In-stream videos</option>
											<option value="facebook.suggested_video">Suggested videos</option>
											<option value="facebook.right_hand_column">Right Column</option>
										</optgroup>
										<optgroup label="Instagram">
											<option value="instagram.stream">Instagram Feed</option>
											<option value="instagram.story">Instagram Stories</option>
										</optgroup>
										<option value="audience_network">Audience network</option>
										<!--<option value="messenger">Messenger</option>-->
									</selectize>
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
										<div class="col-xs-6"> <input type="text" data-toggle="datepicker" v-model="item.date_start" class="form-control" placeholder="Start date"> </div>
										<div class="col-xs-6"> <input type="text" data-toggle="datepicker" v-model="item.date_end" class="form-control" placeholder="End date"> </div>
									</div>
								</div>
							</div>
							<div class="row align-content">
								<div class="col-xs-4">
									<label class="control-label">Optimization for Ad Delivery</label>
								</div>
								<div class="col-xs-8">
									<selectize required v-model="facebook.data.optimization_goal" :data="getOptimizationGoals()" :options="{valueField: 'id'}">
									</selectize>
								</div>
							</div>
							<div class="row" v-if="facebook.data.optimization_goal === 'REACH'">
								<div class="col-xs-4">
									<label for="">Frequency cap</label>
								</div>
								<div class="col-xs-8">
									Number of days the ad shown to same user
									<input type="number" min="1" max="90" v-model="facebook.data.frequency_cap" class="form-control" required>
								</div>
							</div>
							<div class="row align-content" v-if="facebook.data.optimization_goal === 'OFFSITE_CONVERSIONS'" >
								<div class="col-xs-4">
									<label class="control-label">Conversion window</label>
								</div>
								<div class="col-xs-8">
									<selectize v-model="facebook.data.attribution_window_days" :data="details.attribution_window_days">
										<optgroup label="AFTER CLICKING AD">
											<option value="1">1 day click</option>
											<option value="7">7 days click</option>
										</optgroup>
										<optgroup label="AFTER CLICKING OR VIEWING AD">
											<option value="view_through:1">1 day click or view</option>
											<option value="view_through:2">7 days click or 1 day view</option>
										</optgroup>
									</selectize>
								</div>
							</div>
							<div class="row align-content">
								<div class="col-xs-4">
									<label class="control-label">Bid amount</label>
								</div>
								<div class="col-xs-8">
									<div class="row">
										<div class="col-xs-6">
											<selectize :disabled="facebook.data.objective === 'BRAND_AWARENESS'" v-model="facebook.data.bidType">
												<option value="auto">Automatic</option>
												<option value="manual">Manual</option>
											</selectize>
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
			<template v-if="currentStep === 'fb_ads'">
				<form v-if="facebook.data.adformat" @submit="submit">
					<div class="panel"  v-if="!item._id">
						<div class="panel-heading">
							<h4 class="panel-title">Ads</h4>
						</div>
						<div class="panel-body">
							<div class="mb-10"> Select an ad type</div>
							<div class="grid-container" >
								<div v-if="getSupportedAdFormats().includes('CAROUSEL')" @click="$set(facebook.data, 'adformat', 'carousel')" class="panel bg-gray-700 grid">
									<strong>Carousel</strong>
								</div>
								<div v-if="getSupportedAdFormats().includes('IMAGE')" @click="$set(facebook.data, 'adformat', 'image')" class="panel bg-gray-700 grid">
									<strong>Single Image</strong>
								</div>
								<div v-if="getSupportedAdFormats().includes('VIDEO')" @click="$set(facebook.data, 'adformat', 'video')" class="panel bg-gray-700 grid">
									<strong>Single Video</strong>
								</div>
								<div v-if="getSupportedAdFormats().includes('SLIDESHOW')" @click="$set(facebook.data, 'adformat', 'slideshow')" class="panel bg-gray-700 grid">
									<strong>Slideshow</strong>
								</div>
							</div>
						</div>
					</div>
					<template v-if="['POST_ENGAGEMENT'].includes(facebook.data.objective)">
						<div class="panel">
							<div class="panel-heading">
								<h4 class="panel-title">Page & Post</h4>
							</div>
							<div class="panel-body" v-if="!item._id">
								<div class="row">
									<div class="col-xs-4">
										<label class="control-label">Facebook Page</label>
									</div>
									<div class="col-xs-8" v-if="options.fbAccount.accessToken">
										<selectize class="mb-10" name="page" required :value="fbad.page.id"
											:options="{preload: true, fields: 'id,name,access_token', listPath: 'data', valueField: 'id',  ajax: { url: `${options.fbApi.baseUrl}/${options.fbAccount.id}/accounts/?limit=50&access_token=${options.fbAccount.accessToken}`}}"
											:data="fbad.page"
											@data="data => $set(fbad, 'page', data)"></selectize>
									</div>
								</div>
								<div class="row">
									<div class="col-xs-4">
										<label>Post</label>
									</div>
									<div class="col-xs-8">
										<selectize class="mb-10" name="page" required :value="fbad.post.id" :options="{preload: true, listPath: 'data', ajax: { url: options.fbApi.baseUrl + '/' + fbad.page.id + '/promotable_posts/?fields=name,id,type&limit=50&access_token=' + fbad.page.access_token}}"
											:data="fbad.post"
											@data="data => $set(fbad, 'post', data)"></selectize>
									</div>
								</div>
							</div>
						</div>
					</template>
					<template v-else="">
						<fb-carousel-ad v-if="facebook.data.adformat === 'carousel'" :value="facebook.data.ad" @data="data => $set(facebook, 'ad', data)"></fb-carousel-ad>
						<div v-else class="panel">
							<div class="panel-heading">
								<h4 class="panel-title">{{facebook.data.adformat  | humanize}}</h4>
							</div>
							<div class="panel-body">
								<div class="row">
									<div class="col-xs-8">
										<div v-if="facebook.data.adformat === 'slideshow'" class="row">
											<div class="col-xs-4"><label class="text-right" for="">Image duration (ms)</label></div>
											<div class="col-xs-8">
												<input type="number" min="0" class="form-control" v-model="fbad.slideshow.duration_ms">
											</div>
										</div>
										<div v-if="facebook.data.adformat === 'slideshow'" class="row">
											<div class="col-xs-4"><label class="text-right" for="">Transition (ms)</label></div>
											<div class="col-xs-8">
												<input type="number" min="0" class="form-control" v-model="fbad.slideshow.transition_ms">
											</div>
										</div>
										<div class="row" v-if="facebook.data.adformat != 'canvas'">
											<div class="col-xs-4">
												<uploader @upload-complete="handleUpload">
													<div class="panel grid bg-gray-700 upload-btn">
														<strong>Upload {{['image', 'video'].includes(facebook.data.adformat) ? facebook.data.adformat : 'Image' | humanize}}</strong>
													</div>
												</uploader>
											</div>
											<div class="col-xs-4" v-if="['image', 'video'].includes(facebook.data.adformat)">
												<div class="grid bg-gray-700 panel">
													<template v-if="!fbad.upload.uploadId">
														<strong>Preview</strong>
													</template>
													<template v-else="">
														<div class="text-center">
															<span @click="$set(fbad, 'upload', {})" class="glyphicon glyphicon-remove" style="position: absolute; top: 3px; right: 40px"></span>
															<template v-if="facebook.data.adformat === 'image'">
																<img :src="fbad.upload.thumbnail_url" style="width: calc(100% - 5px)">
															</template>
															<template v-else-if="facebook.data.adformat === 'video'">
																<video :src="fbad.upload.thumbnail_url" style="width: calc(100% - 5px)" controls="controls"></video>
															</template>
														</div>
													</template>
												</div>
											</div>
											<div v-if="facebook.data.adformat === 'slideshow'" v-for="upload in fbad.slideshow.images" class="col-xs-4">
												<div class="panel grid bg-gray-500">
													<template v-if="!upload.uploadId">
														<strong class="text-center">Preview</strong>
													</template>
													<template v-else="">
														<div class="text-center">
															<span @click="fbad.slideshow.images.splice(fbad.slideshow.images.findIndex(el => el.uploadId === upload.uploadId), 1)" class="glyphicon glyphicon-remove" style="position: absolute; top: 5px; right: 5px"></span>
															<template v-if="['image', 'slideshow'].includes(facebook.data.adformat)">
																<img :src="upload.thumbnail_url" style="width: calc(100% - 5px)">
															</template>
															<template v-else-if="facebook.data.adformat === 'video'">
																<video :src="upload.thumbnail_url" style="width: calc(100% - 5px)" controls="controls"></video>
															</template>
														</div>
													</template>
												</div>
											</div>
										</div>
									</div>
									<div class="col-xs-4">
										<div v-if="facebook.data.adformat === 'image'">
											<label for="">Recommended Image Specs</label>
											<p>Recommended image size:</p>
											1,200 x 628 pixels
											<p>Image ratio: 1.91:1</p>
											To maximize ad delivery, use an image that contains little or no overlaid text.
										</div>
										<div v-if="facebook.data.adformat === 'video'">
											<label> Recommended Video Specs </label>
											<ul>
												<li> Resolution: at least 720p </li>
												<li> Format: .MOV, .MP4 or .GIF files </li>
												<li> Recommended aspect ratio: widescreen (16:9) </li>
												<li> File size: 2.3 GB max </li>
												<li> Instagram Feed: 60 seconds max </li>
												<li> Facebook: 60 minutes max </li>
											</ul>
										</div>
										<div v-if="facebook.data.adformat === 'slideshow'">
											<label> Recommended Slideshow Specs </label>
											<ul>
												<li>Use high resolution images or a video file to create a slideshow</li>
												<li>Recommended aspect ratio: widescreen (16:9)</li>
												<li>Facebook and Instagram: 50 seconds max</li>
												<li>5 seconds min duration</li>
												<li>Slideshows will loop</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
						<template v-if="facebook.data.objective === 'EVENT_RESPONSES'">
							<div class="panel">
								<div class="panel-heading">
									<h4 class="panel-title">Event Details</h4>
								</div>
								<div class="panel-body">
									<!--<div class="row">
										<div class="col-xs-4">
											<label class="control-label">Event</label>
										</div>
										<div class="col-xs-8" v-if="options.fbAccount.accessToken">
											<selectize class="mb-10" required :value="fbad.event.id" :options="{preload: true, listPath: 'data', ajax: { url: options.fbApi.baseUrl + '/' + options.fbAccount.id + '/promotable_events/?fields=name,id,owner,picture,link&limit=50&access_token=' + options.fbAccount.accessToken}}"
												:data="fbad.post"
												@data="data => $set(fbad, 'post', data)"></selectize>
										</div>
									</div>-->
									<div class="row">
										<div class="col-xs-4">
											<label class="control-label">Event Url</label>
										</div>
										<div class="col-xs-8">
											<input type="text" class="form-control" required @change="getEvent" v-if="!fbad.event.id">
											<div v-if="fbad.event.name">
												<input disabled type="text" class="form-control" :value="fbad.event.name">
												<div @click="$set(fbad, 'event', {})" style="position: relative; top: -33px; left: -10px; " class="close"> &times; </div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</template>
						<div v-if="facebook.data.objective != 'POST_ENGAGEMENT'" id="ad-params" class="panel">
							<div class="panel-heading">
								<h4 class="panel-title">Page & Links</h4>
							</div>
							<div class="panel-body">
								<div class="row">
									<div class="col-xs-4">
										<label class="control-label">Facebook Page</label>
									</div>
									<div class="col-xs-8" v-if="options.fbAccount.accessToken">
										<selectize class="mb-10" name="page" required :value="fbad.page.id"
											:options="{preload: true, fields: 'id,name,access_token', listPath: 'data', valueField: 'id', ajax: { url: `${options.fbApi.baseUrl}/${options.fbAccount.id}/accounts/?fields=name,description,link,access_token&limit=50&access_token=${options.fbAccount.accessToken}`}}"
											:data="fbad.page"
											@data="data => $set(fbad, 'page', data)"></selectize>
									</div>
								</div>
								<div class="row" v-if="!['APP_INSTALLS'].includes(facebook.data.objective)">
									<div class="col-xs-4"><label for="">Website URL</label></div>
									<div class="col-xs-8">
										<input required type="text" class="form-control" required v-model="fbad.object_story_spec.link_data.link">
									</div>
								</div>
								<div class="row"   v-if="facebook.data.adformat != 'carousel'">
									<div class="col-xs-4"><label for="">Headline</label></div>
									<div class="col-xs-8">
										<input required type="text" class="form-control" required v-model="fbad.object_story_spec.link_data.name">
									</div>
								</div>
								<div class="row">
									<div class="col-xs-4"><label for="">Text</label></div>
									<div class="col-xs-8">
										<input required type="text" class="form-control" required v-model="fbad.object_story_spec.link_data.message">
									</div>
								</div>
								<div class="row" v-if="facebook.data.objective != 'VIDEO_VIEWS'">
									<div class="col-xs-4"><label for="">Call To Action</label></div>
									<div class="col-xs-8">
										<selectize class="mb-10" v-model="fbad.object_story_spec.link_data.call_to_action.type" :data="getCallToAction()"  :options="{valueField: 'id'}">
											<option value="0">None</option>
										</selectize>
									</div>
								</div>
								<div class="row"  v-if="facebook.data.adformat != 'carousel'">
									<div class="col-xs-4"><label for="">News Feed Link Description<small>(Optional) </small></label></div>
									<div class="col-xs-8">
										<textarea class="form-control" v-model="fbad.object_story_spec.link_data.description"></textarea>
									</div>
								</div>
								<div class="row"  v-if="facebook.data.adformat != 'carousel'">
									<div class="col-xs-4"><label for="">Display Link <small>(Optional) </small></label></div>
									<div class="col-xs-8">
										<input type="text" class="form-control" v-model="fbad.object_story_spec.link_data.caption">
									</div>
								</div>
								<div class="row">
									<div class="col-xs-4"><label for="">URL Parameters <small>(Optional) </small></label></div>
									<div class="col-xs-8">
										<input type="text" class="form-control" v-model="fbad.url_tags">
									</div>
								</div>
							</div>
						</div>
						<div class="panel" v-if="facebook.data.objective === 'LEAD_GENERATION'">
							<div class="panel-heading">
								<h4 class="panel-title">Lead form</h4>
							</div>
							<div class="panel-body">
								<leadgenform-editor v-model="fbad.form.id" :page="fbad.page"></leadgenform-editor>
							</div>
						</div>
					</template>
					<div class="row mt-20">
						<div class="col-xs-4"></div>
						<div class="col-xs-8"><button class="btn btn-success">Submit</button></div>
					</div>
				</form>
			</template>
		</div>
	</section>
</div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
	mixins: [vFilters],
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
			advertiser: null,
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
					adformat: 'image',
					custom_event_type: 'LEAD',
					budgetType: 'daily',
					scheduleType: 'default',
					bidType: 'auto',
					optimization_goal: null,
					billing_event: null,
					attribution_window_days: 1,
					wireless_carrier: [],
					flexible_targeting: [{}],
					excludes: {},
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
						slideshow: {
							images: [],
							duration_ms: null,
							transition_ms: null
						},
						object_story_spec: {
							link_data: {
								call_to_action: {
									type: 'LINK_CLICKS',
									value: {}
								},
								child_attachments: [],
								name: null, // heading
								message: null, // message
								description: null, // news feed
								link: null,
								caption: null,
								picture: null
							},
							page_id: null
						},
						object_story_id: null,
						object_type: null,
						url_tags: null,
						upload: {},
						form: {id: null, name: null},
						page: {id: null, name: null},
						post: {id: null, name: null},
						event: {id: null, name: null}
					}
				}
			}
		},
		details: {
			user_oses: [],
			fb_posts: [],
			creatives: [],
			advertisers: [],
			currency: {},
			locales: [],
			detailed_targeting: [],
			geo: [],
			forms: [],
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
			calltoaction: [{'id':'OPEN_LINK', 'name':'Open link'}, {'id':'LIKE_PAGE', 'name':'Like page'}, {'id':'SHOP_NOW', 'name':'Shop now'}, {'id':'PLAY_GAME', 'name':'Play game'}, {'id':'INSTALL_APP', 'name':'Install app'}, {'id':'USE_APP', 'name':'Use app'}, {'id':'INSTALL_MOBILE_APP', 'name':'Install mobile app'}, {'id':'USE_MOBILE_APP', 'name':'Use mobile app'}, {'id':'BOOK_TRAVEL', 'name':'Book travel'}, {'id':'LISTEN_MUSIC', 'name':'Listen music'}, {'id':'LEARN_MORE', 'name':'Learn more'}, {'id':'SIGN_UP', 'name':'Sign up'}, {'id':'DOWNLOAD', 'name':'Download'}, {'id':'WATCH_MORE', 'name':'Watch more'}, {'id':'NO_BUTTON', 'name':'No button'}, {'id':'CALL_NOW', 'name':'Call now'}, {'id':'APPLY_NOW', 'name':'Apply now'}, {'id':'BUY_NOW', 'name':'Buy now'}, {'id':'GET_OFFER', 'name':'Get offer'}, {'id':'GET_OFFER_VIEW', 'name':'Get offer view'}, {'id':'GET_DIRECTIONS', 'name':'Get directions'}, {'id':'MESSAGE_PAGE', 'name':'Message page'}, {'id':'MESSAGE_USER', 'name':'Message user'}, {'id':'SUBSCRIBE', 'name':'Subscribe'}, {'id':'SELL_NOW', 'name':'Sell now'}, {'id':'DONATE_NOW', 'name':'Donate now'}, {'id':'GET_QUOTE', 'name':'Get quote'}, {'id':'CONTACT_US', 'name':'Contact us'}, {'id':'RECORD_NOW', 'name':'Record now'}, {'id':'VOTE_NOW', 'name':'Vote now'}, {'id':'REGISTER_NOW', 'name':'Register now'}, {'id':'REQUEST_TIME', 'name':'Request time'}, {'id':'SEE_MENU', 'name':'See menu'}, {'id':'EMAIL_NOW', 'name':'Email now'}, {'id':'OPEN_MOVIES', 'name':'Open movies'}]
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
			$.get(this.options.fbApi.baseUrl + '/search', {
				type: 'addestination',
				object_url: url,
				access_token: this.options.fbApi.accessToken
			}).done(response => {
				if(response.data && response.data[0]) {
					Vue.set(this.fbad, 'event', response.data[0]);
				}
			});
		},
		narrowAudience() {
			this.facebook.data.flexible_targeting.push({});
		},
		fbCombineList(list) {
			var fullList = [];
			for(var i in list) fullList = fullList.concat(list[i]);
			return fullList;
		},
		fbUpdateList(list, value) {
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
		handleResponse(res, status, xhr) {
			if(res.success) {
				return vApp.message('Success');
				// location.href = '/campaigns/';
			} else vApp.message('Error saving campaign', 'danger');
		},
		removeUnchangedFields(item, preserveFields) {
			var original = this.originalItem;
			for(var i in item) {
				if(JSON.stringify(item[i]) === JSON.stringify(original[i])) {
					if(Array.isArray(preserveFields) && preserveFields.includes(i)) continue;
					delete item[i];
				}
			}
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
			if(campaign._id) this.removeUnchangedFields(campaign, ['id']);
			if (Object.keys(campaign).length <= 1) return vApp.message('Nothing changed', 'info');
			console.log(clone(campaign));
			if(campaign.services) {
				var facebook = campaign.facebook;
				if(facebook.enabled) {
					facebook.data.locales = this.processList(facebook.data.locales, this.details.locales, 'key');
					// facebook.data.detailed_targeting = this.processList(facebook.data.detailed_targeting, this.details.detailed_targeting);
					// if(facebook.ad.post)
					// 	facebook.ad.object_type = this.details.fb_posts.find(el => el.id === facebook.ad.object_story_id).type;
				}
			}
			if(campaign._id)	{
				var campaignId = campaign._id;
				delete campaign._id;
				$.ajax({
					url: '/api/campaigns/' + campaignId,
					type: 'post',
					data: JSON.stringify(campaign),
					processData: false,
					headers: {'Content-type': 'application/json'}
				}).always(this.handleResponse);
			} else {
				delete campaign._id;
				$.ajax({
					url: '/api/campaigns/',
					type: 'post',
					data: JSON.stringify(campaign),
					processData: false,
					headers: {'Content-type': 'application/json'}
				}).always(this.handleResponse)
			}
		},
		updateList(list, value, key = 'id') {
			if(!value) return;
			if(!Array.isArray(value)) value = [value];
			value.forEach(item => {
				if(!list.find(el => el[key] === item[key])) list.push(item);
			});
		},
		creativeFilters() {
			var filters = [];
			if(this.facebook.enabled) {
				filters.push({
					type: 'includes', field: 'type', value: 3
				});
			}
			return filters;
		},
		handleUpload(data) {
			if(['image', 'video'].includes(this.facebook.data.adformat)) {
				Vue.set(this.fbad, 'upload', data);
			} else this.fbad.slideshow.images.push(data);
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
		},
		getCallToAction() {
			var items = [];
			switch(this.facebook.data.objective) {
				case 'BRAND_AWARENESS':
				case 'LINK_CLICKS':
					items = ['APPLY_NOW', 'BOOK_TRAVEL', 'CONTACT_US', 'DOWNLOAD', 'LEARN_MORE', 'REQUEST_TIME', 'SHOP_NOW', 'WATCH_MORE', 'SIGN_UP'];  // start order
					break;
				case 'REACH':
					items = ['APPLY_NOW', 'BOOK_TRAVEL', 'CALL_NOW', 'CONTACT_US', 'DOWNLOAD', 'GET_DIRECTIONS', 'LEARN_MORE', 'REQUEST_TIME', 'SHOP_NOW', 'WATCH_MORE', 'SIGN_UP']; // send message, start order, save
					break;
				case 'LEAD_GENERATION':
					items = ['APPLY_NOW', 'DOWNLOAD', 'GET_QUOTE', 'LEARN_MORE', 'SIGN_UP', 'SUBSCRIBE'];
					break;
				case 'CONVERSIONS':
					items = ['APPLY_NOW', 'CONTACT_US', 'DOWNLOAD', 'LEARN_MORE', 'REQUEST_TIME', 'SHOP_NOW', 'SIGN_UP', 'WATCH_MORE'];  // Book now, Send Message, start order
					break;
				case 'APP_INSTALLS':
					items = ['DOWNLOAD', 'INSTALL_APP', 'LEARN_MORE', 'LISTEN_MUSIC', 'PLAY_GAME', 'SHOP_NOW', 'SIGN_UP', 'USE_APP', 'WATCH_MORE']; // book now,
					break;
				case 'PAGE_LIKES':
					items = ['LIKE_PAGE'];
					break;
				case 'VIDEO_VIEWS':
				case 'OFFER_CLAIMS':
				case 'PRODUCT_CATALOG_SALES':
					break;
			}
			return items.map(item => this.details.calltoaction.find(el => el.id === item));
		},
		getSupportedAdFormats() {
			switch(this.facebook.data.objective) {
				case 'BRAND_AWARENESS':
				case 'LINK_CLICKS':
				case 'REACH':
				case 'LEAD_GENERATION':
				case 'CONVERSIONS':
				case 'APP_INSTALLS':
				case 'OFFER_CLAIMS':
				case 'PRODUCT_CATALOG_SALES':
					return ['IMAGE', 'VIDEO', 'CAROUSEL', 'SLIDESHOW'];
				case 'POST_ENGAGEMENT':
				case 'EVENT_RESPONSES':
				case 'PAGE_LIKES':
					return ['IMAGE', 'VIDEO', 'SLIDESHOW'];
				case 'VIDEO_VIEWS':
					return ['VIDEO', 'CAROUSEL', 'SLIDESHOW'];
			}
			return [];
		}
	},
	mounted() {
		this.gotoStep('platform');
		console.log('campaign editor');
		if(this.$route && this.$route.params.id) {
			$.get('/api/campaigns/get/' + this.$route.params.id, (response) => {
				if(!response.result) return vApp.message('Error fetching campaign data');
				Vue.set(this, 'steps', ['fb_campaign', 'fb_ads']);
				this.gotoStep('fb_campaign');
				var campaign = response.result;
				var facebook = campaign.facebook;
				var targeting = campaign.targeting_rules;
				for (i in {geo_includes:0, geo_excludes:0}) {
					this.details.geo = this.details.geo.concat(targeting[i]);
					targeting[i] = targeting[i].map(item => item._id);
				}
				this.details.advertisers = this.details.advertisers.concat(campaign.advertiser);
				campaign.advertiser = campaign.advertiser._id;
				if(facebook.campaign_id && facebook.data) {
					facebook.enabled = true;
					Vue.set(this.details, 'locales', clone(facebook.data.locales || []));
					// Vue.set(this.details, 'detailed_targeting', clone(facebook.data.detailed_targeting||[]) );
					facebook.data.locales = this.normalizeList(facebook.data.locales, 'key');
					// facebook.data.detailed_targeting = this.normalizeList(facebook.data.detailed_targeting);
				}
				this.originalItem = $.extend(true, {}, this.item, campaign);
				Vue.set(this, 'item', clone(this.originalItem));
			});
		}
		$.get('/api/currency', (response) => {
			if(response.success) {
				Vue.set(this.details, 'currency', response.result);
			}
		});
		vApp.$watch('options.fbAccount', fbAccount => Vue.set(this.options, 'fbAccount', vApp.options.fbAccount), {deep: true});
		$(document).on('focus', '[data-toggle="datepicker"]', function() {
			$(this).datepicker({
				autoclose: true,
				forceParse: false
			}).change(function() {
				this.dispatchEvent(new Event('input'));
			});
		});
	},
	computed: {
		...mapGetters('facebook', ['fbApi']),
		currency_symbol() {
			return this.details.currency[this.getData(this.details.advertisers, this.item.advertiser, 'currency')];
		},
		facebook() {
			return this.item.facebook;
		},
		fbad() {
			return this.item.facebook.data.ad;
		},
		bid_unit() {
			switch(this.facebook.data.optimization_goal) {
				case 'OFFSITE_CONVERSIONS':
				case 'LEAD_GENERATION': return 'per result';
				case 'VIDEO_VIEWS': return 'per video view';
				case 'LINK_CLICKS': return 'per link click';
				case 'APP_INSTALLS': return 'per app install';
				case 'POST_ENGAGEMENT': return 'per post engagement';
				case 'PAGE_LIKES': return 'per page like';
				case 'EVENT_RESPONSES':
				case 'BRAND_AWARENESS':
				case 'REACH': return 'per 1, 000 impressions';
			}
		},
		geo_includes() {return this.item.targeting_rules.geo_includes || [] },
		geo_excludes() {return this.item.targeting_rules.geo_excludes || [] }
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
		}
	}
}
</script>
