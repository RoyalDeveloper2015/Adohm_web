<template>
	<div>

		<template v-if="['POST_ENGAGEMENT'].includes(meta.objective)">
			<div class="panel">
				<div class="panel-heading">
					<h4 class="panel-title">Page & Post</h4>
				</div>
				<div class="panel-body" v-if="!meta.campaign_id">
					<div class="row">
						<div class="col-xs-4">
							<label class="control-label">Facebook Page</label>
						</div>
						<div class="col-xs-8" v-if="fbApi.accessToken">
							<multi-select class="mb-10" name="page" required v-model="item.page"
								label="name" track-by="id"
								@search-change="query => search({
									url: `${fbApi.baseUrl}/${fbAccount.id}/accounts/?limit=50&access_token=${fbAccount.accessToken}`,
									listSource: '.data', listTarget: [details, 'pages']
								})"
								:options="details.pages"></multi-select>
						</div>
					</div>
					<div class="row">
						<div class="col-xs-4">
							<label>Post</label>
						</div>
						<div class="col-xs-8">
							<multi-select class="mb-10" required :value="item.post"
								label="name" track-by="id"
								@search-change="query => search({
									url: `${fbApi.baseUrl}/${item.page.id}/promotable_posts/?fields=name,id,type&limit=50&access_token=${item.page.access_token}`,
									listSource: '.data', listTarget: [details, 'posts']
								})"
								:options="details.posts"
								></multi-select>
						</div>
					</div>
				</div>
			</div>
		</template>
		<template v-else>
			<div class="panel"  v-if="!meta.campaign_id">
				<div class="panel-heading">
					<h4 class="panel-title">Ads</h4>
				</div>
				<div class="panel-body">
					<div class="mb-10"> Select an ad type</div>
					<div class="grid-container" >
						<div v-if="getSupportedAdFormats().includes('CAROUSEL')" @click="$set(item, 'adformat', 'carousel')" class="panel bg-gray-700 grid">
							<strong>Carousel</strong>
						</div>
						<div v-if="getSupportedAdFormats().includes('IMAGE')" @click="$set(item, 'adformat', 'image')" class="panel bg-gray-700 grid">
							<strong>Single Image</strong>
						</div>
						<div v-if="getSupportedAdFormats().includes('VIDEO')" @click="$set(item, 'adformat', 'video')" class="panel bg-gray-700 grid">
							<strong>Single Video</strong>
						</div>
						<div v-if="getSupportedAdFormats().includes('SLIDESHOW')" @click="$set(item, 'adformat', 'slideshow')" class="panel bg-gray-700 grid">
							<strong>Slideshow</strong>
						</div>
					</div>
				</div>
			</div>
			<carousel-ad v-if="item.adformat === 'carousel'" :value.sync="item.object_story_spec"></carousel-ad>
			<div v-else class="panel">
				<div class="panel-heading">
					<h4 class="panel-title">{{item.adformat  | humanize}}</h4>
				</div>
				<div class="panel-body">
					<div class="row">
						<div class="col-xs-8">
							<div v-if="item.adformat === 'slideshow'" class="row">
								<div class="col-xs-4"><label class="text-right" for="">Image duration (ms)</label></div>
								<div class="col-xs-8">
									<input type="number" min="0" class="form-control" v-model="item.slideshow.duration_ms">
								</div>
							</div>
							<div v-if="item.adformat === 'slideshow'" class="row">
								<div class="col-xs-4"><label class="text-right" for="">Transition (ms)</label></div>
								<div class="col-xs-8">
									<input type="number" min="0" class="form-control" v-model="item.slideshow.transition_ms">
								</div>
							</div>
							<div class="row" v-if="item.adformat != 'canvas'">
								<div class="col-xs-4">
									<uploader @upload-complete="handleUpload">
										<div class="panel grid bg-gray-700 upload-btn">
											<strong>Upload {{['image', 'video'].includes(item.adformat) ? item.adformat : 'Image' | humanize}}</strong>
										</div>
									</uploader>
								</div>
								<div class="col-xs-4" v-if="['image', 'video'].includes(item.adformat)">
									<div class="grid bg-gray-700 panel">
										<template v-if="!item.upload.uploadId">
											<strong>Preview</strong>
										</template>
										<template v-else>
											<div class="text-center">
												<span @click="$set(item, 'upload', {})" class="glyphicon glyphicon-remove" style="position: absolute; top: 3px; right: 40px"></span>
												<template v-if="item.adformat === 'image'">
													<img :src="options.baseURL + item.upload.thumbnail_url" style="width: calc(100% - 5px)">
												</template>
												<template v-else-if="item.adformat === 'video'">
													<video :src="options.baseURL + item.upload.thumbnail_url" style="width: calc(100% - 5px)" controls="controls"></video>
												</template>
											</div>
										</template>
									</div>
								</div>
								<div v-if="item.adformat === 'slideshow'" v-for="upload in item.slideshow.images" :key="upload.thumbnail_url" class="col-xs-4">
									<div class="panel grid bg-gray-500">
										<template v-if="!upload.uploadId">
											<strong class="text-center">Preview</strong>
										</template>
										<template v-else>
											<div class="text-center">
												<span @click="item.slideshow.images.splice(item.slideshow.images.findIndex(el => el.uploadId === upload.uploadId), 1)" class="glyphicon glyphicon-remove" style="position: absolute; top: 5px; right: 5px"></span>
												<template v-if="['image', 'slideshow'].includes(item.adformat)">
													<img :src="options.baseURL + upload.thumbnail_url" style="width: calc(100% - 5px)"></img>
												</template>
												<template v-else-if="item.adformat === 'video'">
													<video :src="options.baseURL + upload.thumbnail_url" style="width: calc(100% - 5px)" controls="controls"></video>
												</template>
											</div>
										</template>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xs-4">
							<div v-if="item.adformat === 'image'">
								<label for="">Recommended Image Specs</label>
								<p>Recommended image size:</p>
								1,200 x 628 pixels
								<p>Image ratio: 1.91:1</p>
								To maximize ad delivery, use an image that contains little or no overlaid text.
							</div>
							<div v-if="item.adformat === 'video'">
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
							<div v-if="item.adformat === 'slideshow'">
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
			<template v-if="meta.objective === 'EVENT_RESPONSES'">
				<div class="panel">
					<div class="panel-heading">
						<h4 class="panel-title">Event Details</h4>
					</div>
					<div class="panel-body">
						<!--<div class="row">
							<div class="col-xs-4">
								<label class="control-label">Event</label>
							</div>
							<div class="col-xs-8" v-if="fbApi.accessToken">
								<multi-select class="mb-10" required :value="item.event.id" :options="{preload: true, listPath: 'data', ajax: { url: fbApi.baseUrl + '/' + fbApi.id + '/promotable_events/?fields=name,id,owner,picture,link&limit=50&access_token=' + fbApi.accessToken}}"
									:data="item.post"
									@data="data => $set(item, 'post', data)"></multi-select>
							</div>
						</div>-->
						<div class="row">
							<div class="col-xs-4">
								<label class="control-label">Event Url</label>
							</div>
							<div class="col-xs-8">
								<input type="text" class="form-control" required  v-if="!item.event.id">
								<div v-if="item.event.name">
									<input disabled type="text" class="form-control" :value="item.event.name">
									<div @click="$set(item, 'event', {})" style="position: relative; top: -33px; left: -10px; " class="close"> &times; </div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</template>
			<div v-if="meta.objective != 'POST_ENGAGEMENT'" id="ad-params" class="panel">
				<div class="panel-heading">
					<h4 class="panel-title">Page & Links</h4>
				</div>
				<div class="panel-body">
					<div class="row">
						<div class="col-xs-4">
							<label class="control-label">Facebook Page</label>
						</div>
						<div class="col-xs-8" v-if="fbApi.accessToken">
							<multi-select class="mb-10" name="page" required v-model="item.page"
								label="name" track-by="id"
								@search-change="query => search({
									url: `${fbApi.baseUrl}/${fbAccount.id}/accounts/?limit=50&access_token=${fbAccount.accessToken}`,
									listSource: '.data', listTarget: [details, 'pages']
								})"
								:options="details.pages"></multi-select>
						</div>
					</div>
					<div class="row" v-if="!['APP_INSTALLS'].includes(meta.objective)">
						<div class="col-xs-4"><label for="">Website URL</label></div>
						<div class="col-xs-8">
							<input required type="text" class="form-control" required v-model="item.object_story_spec.link_data.link">
						</div>
					</div>
					<div class="row"   v-if="item.adformat != 'carousel'">
						<div class="col-xs-4"><label for="">Headline</label></div>
						<div class="col-xs-8">
							<input required type="text" class="form-control" required v-model="item.object_story_spec.link_data.name">
						</div>
					</div>
					<div class="row">
						<div class="col-xs-4"><label for="">Text</label></div>
						<div class="col-xs-8">
							<input required type="text" class="form-control" required v-model="item.object_story_spec.link_data.message">
						</div>
					</div>
					<div class="row" v-if="meta.objective != 'VIDEO_VIEWS'">
						<div class="col-xs-4"><label for="">Call To Action</label></div>
						<div class="col-xs-8">
							<multi-select class="mb-10" label="name" track-by="type" v-model="item.object_story_spec.link_data.call_to_action" :options="getCallToAction()"></multi-select>
						</div>
					</div>
					<div class="row"  v-if="item.adformat != 'carousel'">
						<div class="col-xs-4"><label for="">News Feed Link Description<small>(Optional) </small></label></div>
						<div class="col-xs-8">
							<textarea class="form-control" v-model="item.object_story_spec.link_data.description"></textarea>
						</div>
					</div>
					<div class="row"  v-if="item.adformat != 'carousel'">
						<div class="col-xs-4"><label for="">Display Link <small>(Optional) </small></label></div>
						<div class="col-xs-8">
							<input type="text" class="form-control" v-model="item.object_story_spec.link_data.caption">
						</div>
					</div>
					<div class="row">
						<div class="col-xs-4"><label for="">URL Parameters <small>(Optional) </small></label></div>
						<div class="col-xs-8">
							<input type="text" class="form-control" v-model="item.url_tags">
						</div>
					</div>
				</div>
			</div>
			<div class="panel" v-if="meta.objective === 'LEAD_GENERATION'">
				<div class="panel-heading">
					<h4 class="panel-title">Lead form</h4>
				</div>
				<div class="panel-body">
					<leadgen-form-editor v-model="item.form.id" :page="item.page"></leadgen-form-editor>
				</div>
			</div>
		</template>
		<div class="row mt-20">
			<div class="col-xs-4"></div>
			<div class="col-xs-8"><button class="btn btn-success">Submit</button></div>
		</div>
	</div>
</template>

<script>
import {vUtils} from '@/components/Mixins'
import {mapGetters} from 'vuex'
import Uploader from '@/components/partials/Uploader.vue'
import MultiSelect from 'vue-multiselect'
import CarouselAd from './CarouselAd'
import LeadgenFormEditor from './LeadgenFormEditor'
import Vue from 'vue'
import {baseURL} from '@/config/default/request'
	
export default {
	mixins: [vUtils],
	props: ['value', 'meta'],
	components: {Uploader, MultiSelect, CarouselAd, LeadgenFormEditor},
	data: () => ({
		item: {
			adformat: 'image',
			advertiser: {},
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
			upload: {
				uploadId: null, 
				thumbnail_url: null
			},
			form: {id: null, name: null},
			page: {id: null, name: null},
			post: {id: null, name: null},
			event: {id: null, name: null}
		},
		details: {
			posts: [],
			pages: [],
			forms: [],
			calltoaction: [{'type':'OPEN_LINK', 'name':'Open link'}, {'type':'LIKE_PAGE', 'name':'Like page'}, {'type':'SHOP_NOW', 'name':'Shop now'}, {'type':'PLAY_GAME', 'name':'Play game'}, {'type':'INSTALL_APP', 'name':'Install app'}, {'type':'USE_APP', 'name':'Use app'}, {'type':'INSTALL_MOBILE_APP', 'name':'Install mobile app'}, {'type':'USE_MOBILE_APP', 'name':'Use mobile app'}, {'type':'BOOK_TRAVEL', 'name':'Book travel'}, {'type':'LISTEN_MUSIC', 'name':'Listen music'}, {'type':'LEARN_MORE', 'name':'Learn more'}, {'type':'SIGN_UP', 'name':'Sign up'}, {'type':'DOWNLOAD', 'name':'Download'}, {'type':'WATCH_MORE', 'name':'Watch more'}, {'type':'NO_BUTTON', 'name':'No button'}, {'type':'CALL_NOW', 'name':'Call now'}, {'type':'APPLY_NOW', 'name':'Apply now'}, {'type':'BUY_NOW', 'name':'Buy now'}, {'type':'GET_OFFER', 'name':'Get offer'}, {'type':'GET_OFFER_VIEW', 'name':'Get offer view'}, {'type':'GET_DIRECTIONS', 'name':'Get directions'}, {'type':'MESSAGE_PAGE', 'name':'Message page'}, {'type':'MESSAGE_USER', 'name':'Message user'}, {'type':'SUBSCRIBE', 'name':'Subscribe'}, {'type':'SELL_NOW', 'name':'Sell now'}, {'type':'DONATE_NOW', 'name':'Donate now'}, {'type':'GET_QUOTE', 'name':'Get quote'}, {'type':'CONTACT_US', 'name':'Contact us'}, {'type':'RECORD_NOW', 'name':'Record now'}, {'type':'VOTE_NOW', 'name':'Vote now'}, {'type':'REGISTER_NOW', 'name':'Register now'}, {'type':'REQUEST_TIME', 'name':'Request time'}, {'type':'SEE_MENU', 'name':'See menu'}, {'type':'EMAIL_NOW', 'name':'Email now'}, {'id':'OPEN_MOVIES', 'name':'Open movies'}]
		},
		options: {
			baseURL
		}
	}),
	mounted() {
		this.item = Object.assign({}, this.item, this.value);
	},
	methods: {
		handleUpload(data) {
			if(!data) return;
			if(['image', 'video'].includes(this.item.adformat)) {
				Vue.set(this.item, 'upload', data);
			} else this.item.slideshow.images.push(data);
		},
		getCallToAction() {
			var items = [];
			switch(this.meta.objective) {
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
			return items.map(item => this.details.calltoaction.find(el => el.type === item));
		},
		getSupportedAdFormats() {
			switch(this.meta.objective) {
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
	watch: {
		item: {
			deep: true,
			handler(item) {
				this.$emit('update:value', item);
			}
		}
	},
	computed: {
		...mapGetters('session', ['user', 'fbApi', 'fbAccount']),
		fbAdAccount() {
			return this.meta.advertiser.options.facebook.adaccount;
		}
	}
}
</script>
