<template>
	<div>
		<div class="panel"  v-if="!item.campaign_id">
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
		<template v-if="['POST_ENGAGEMENT'].includes(item.objective)">
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
							<multi-select class="mb-10" name="page" required :value="item.page.id"
								:options="{preload: true, fields: 'id,name,access_token', listPath: 'data', valueField: 'id',  ajax: { url: `${fbApi.baseUrl}/${options.fbAccount.id}/accounts/?limit=50&access_token=${options.fbAccount.accessToken}`}}"
								:data="item.page"
								@data="data => $set(item, 'page', data)"></multi-select>
						</div>
					</div>
					<div class="row">
						<div class="col-xs-4">
							<label>Post</label>
						</div>
						<div class="col-xs-8">
							<multi-select class="mb-10" name="page" required :value="item.post.id" :options="{preload: true, listPath: 'data', ajax: { url: fbApi.baseUrl + '/' + item.page.id + '/promotable_posts/?fields=name,id,type&limit=50&access_token=' + item.page.access_token}}"
								:data="item.post"
								@data="data => $set(item, 'post', data)"></multi-select>
						</div>
					</div>
				</div>
			</div>
		</template>
		<template v-else>
			<fb-carousel-ad v-if="item.adformat === 'carousel'" :value="item" @data="data => $set($data, 'item', data)"></fb-carousel-ad>
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
													<img :src="item.upload.thumbnail_url" style="width: calc(100% - 5px)">
												</template>
												<template v-else-if="item.adformat === 'video'">
													<video :src="item.upload.thumbnail_url" style="width: calc(100% - 5px)" controls="controls"></video>
												</template>
											</div>
										</template>
									</div>
								</div>
								<div v-if="item.adformat === 'slideshow'" v-for="upload in item.slideshow.images" class="col-xs-4">
									<div class="panel grid bg-gray-500">
										<template v-if="!upload.uploadId">
											<strong class="text-center">Preview</strong>
										</template>
										<template v-else>
											<div class="text-center">
												<span @click="item.slideshow.images.splice(item.slideshow.images.findIndex(el => el.uploadId === upload.uploadId), 1)" class="glyphicon glyphicon-remove" style="position: absolute; top: 5px; right: 5px"></span>
												<template v-if="['image', 'slideshow'].includes(item.adformat)">
													<img :src="upload.thumbnail_url" style="width: calc(100% - 5px)">
												</template>
												<template v-else-if="item.adformat === 'video'">
													<video :src="upload.thumbnail_url" style="width: calc(100% - 5px)" controls="controls"></video>
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
			<template v-if="item.objective === 'EVENT_RESPONSES'">
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
								<multi-select class="mb-10" required :value="item.event.id" :options="{preload: true, listPath: 'data', ajax: { url: fbApi.baseUrl + '/' + options.fbAccount.id + '/promotable_events/?fields=name,id,owner,picture,link&limit=50&access_token=' + options.fbAccount.accessToken}}"
									:data="item.post"
									@data="data => $set(item, 'post', data)"></multi-select>
							</div>
						</div>-->
						<div class="row">
							<div class="col-xs-4">
								<label class="control-label">Event Url</label>
							</div>
							<div class="col-xs-8">
								<input type="text" class="form-control" required @change="getEvent" v-if="!item.event.id">
								<div v-if="item.event.name">
									<input disabled type="text" class="form-control" :value="item.event.name">
									<div @click="$set(item, 'event', {})" style="position: relative; top: -33px; left: -10px; " class="close"> &times; </div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</template>
			<div v-if="item.objective != 'POST_ENGAGEMENT'" id="ad-params" class="panel">
				<div class="panel-heading">
					<h4 class="panel-title">Page & Links</h4>
				</div>
				<div class="panel-body">
					<div class="row">
						<div class="col-xs-4">
							<label class="control-label">Facebook Page</label>
						</div>
						<div class="col-xs-8" v-if="options.fbAccount.accessToken">
							<multi-select class="mb-10" name="page" required :value="item.page.id"
								:options="{preload: true, fields: 'id,name,access_token', listPath: 'data', valueField: 'id', ajax: { url: `${fbApi.baseUrl}/${options.fbAccount.id}/accounts/?fields=name,description,link,access_token&limit=50&access_token=${options.fbAccount.accessToken}`}}"
								:data="item.page"
								@data="data => $set(item, 'page', data)"></multi-select>
						</div>
					</div>
					<div class="row" v-if="!['APP_INSTALLS'].includes(item.objective)">
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
					<div class="row" v-if="item.objective != 'VIDEO_VIEWS'">
						<div class="col-xs-4"><label for="">Call To Action</label></div>
						<div class="col-xs-8">
							<multi-select class="mb-10" v-model="item.object_story_spec.link_data.call_to_action.type" :data="getCallToAction()"  :options="{valueField: 'id'}">
								<option value="0">None</option>
							</multi-select>
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
			<div class="panel" v-if="item.objective === 'LEAD_GENERATION'">
				<div class="panel-heading">
					<h4 class="panel-title">Lead form</h4>
				</div>
				<div class="panel-body">
					<leadgenform-editor v-model="item.form.id" :page="item.page"></leadgenform-editor>
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
export default {
	mixins: [vUtils],
	props: ['value'],
	data: () => ({
		item: {
			adformat: null,
			objective: null,
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
		},
		details: {
			fb_posts: [],
			creatives: [],
			forms: [],
			calltoaction: [{'id':'OPEN_LINK', 'name':'Open link'}, {'id':'LIKE_PAGE', 'name':'Like page'}, {'id':'SHOP_NOW', 'name':'Shop now'}, {'id':'PLAY_GAME', 'name':'Play game'}, {'id':'INSTALL_APP', 'name':'Install app'}, {'id':'USE_APP', 'name':'Use app'}, {'id':'INSTALL_MOBILE_APP', 'name':'Install mobile app'}, {'id':'USE_MOBILE_APP', 'name':'Use mobile app'}, {'id':'BOOK_TRAVEL', 'name':'Book travel'}, {'id':'LISTEN_MUSIC', 'name':'Listen music'}, {'id':'LEARN_MORE', 'name':'Learn more'}, {'id':'SIGN_UP', 'name':'Sign up'}, {'id':'DOWNLOAD', 'name':'Download'}, {'id':'WATCH_MORE', 'name':'Watch more'}, {'id':'NO_BUTTON', 'name':'No button'}, {'id':'CALL_NOW', 'name':'Call now'}, {'id':'APPLY_NOW', 'name':'Apply now'}, {'id':'BUY_NOW', 'name':'Buy now'}, {'id':'GET_OFFER', 'name':'Get offer'}, {'id':'GET_OFFER_VIEW', 'name':'Get offer view'}, {'id':'GET_DIRECTIONS', 'name':'Get directions'}, {'id':'MESSAGE_PAGE', 'name':'Message page'}, {'id':'MESSAGE_USER', 'name':'Message user'}, {'id':'SUBSCRIBE', 'name':'Subscribe'}, {'id':'SELL_NOW', 'name':'Sell now'}, {'id':'DONATE_NOW', 'name':'Donate now'}, {'id':'GET_QUOTE', 'name':'Get quote'}, {'id':'CONTACT_US', 'name':'Contact us'}, {'id':'RECORD_NOW', 'name':'Record now'}, {'id':'VOTE_NOW', 'name':'Vote now'}, {'id':'REGISTER_NOW', 'name':'Register now'}, {'id':'REQUEST_TIME', 'name':'Request time'}, {'id':'SEE_MENU', 'name':'See menu'}, {'id':'EMAIL_NOW', 'name':'Email now'}, {'id':'OPEN_MOVIES', 'name':'Open movies'}]
		}
	}),
	mounted() {
		this.ad = Object.assign({}, this.item, this.value);
	},
	methods: {
		handleUpload(data) {
			if(['image', 'video'].includes(this.item.adformat)) {
				Vue.set(this.item, 'upload', data);
			} else this.item.slideshow.images.push(data);
		},
		getCallToAction() {
			var items = [];
			switch(this.item.objective) {
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
			switch(this.item.objective) {
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
		ad: {
			deep: true,
			handler(item) {
				this.$emit('input', item);
			}
		}
	}
}
</script>
