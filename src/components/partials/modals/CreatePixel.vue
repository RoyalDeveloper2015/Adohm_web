<template>
	<div modal-render="true" id="trackerModal" role="dialog" class="modal tracker-modal">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h3 class="modal-title">
						Tracker generator 
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" aria-hidden="true">×</button>
					</h3>
				</div>
				<div class="modal-body tracker-modal">
					<div class="row">
						<div class="form-group col-md-6">
							<label>Select advertiser</label>
							<multi-select label="name" track-by="id" v-model="item.advertiser" :options="details.advertisers" @search-change="query => search({
								url: '/api/advertisers',
								listTarget: [details, 'advertisers']
							})"></multi-select>
						</div>
						<div class="form-group col-md-6">
							<label>Select Event</label>
							<multi-select v-model="item.event" :options="details.events">
							</multi-select>
						</div>
					</div>
				
					<div class="row">
						<div class="form-group col-md-12 codeText">
							<label>Your tracker code</label>
							<textarea style="width:100%; height: 200px" @click="$event.currentTarget.setSelectionRange(0, 1000)" readonly id="preview" v-if="item.event" :value="pixel_code"></textarea>
						</div>
					</div>

					<div class="row tracker-info">
						<div class="form-group col-md-12" disabled="">
							<div class="panel panel-default">
								<div class="panel-body" style="zoom: 0.8">
									<span class="glyphicon glyphicon-info-sign"></span>
									<span>To implement this tacker code simply copy and paste the script exactly as it appears above into the html or your website pages.<br>
									The suffix // will enable the browser to detect the page type and auto populate an http: for a non secure page or an https: for a secure page.If you are using a tag manager and find your tracker is not firing please insert either http: or https:(depending on your page type) before the //</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import MultiSelect from 'vue-multiselect'
	import {vUtils} from '@/components/Mixins'

	export default {
		components: {MultiSelect},
		mixins: [vUtils],
		data: () => ({
			item: {
				pixel_id: null,
				advertiser: '',
				event: 'PageView'
			},
			code_template: '' +
				'<script type="text/javascript">\n' +
				'	(function(){ \n' +
				'		var adohm_pixel_id={{ADVERTISER_ID}};\n' +
				'		var rand=new Date().getTime();\n' +
				'		var e = document.getElementsByTagName("script")[0];\n' +
				'		var d = document.createElement("script");\n' +
				'		d.src = "//cdn.adohm.com/adopixel_v1.js?id={{PIXEL_ID}}&rnd="+rand;\n' +
				'		d.type = "text/javascript"; \n' +
				'		d.async = true;\n' +
				'		d.defer = true;\n' +
				'		e.parentNode.insertBefore(d,e);\n' +
				'	})();\n' +
				'	window.addEventListener("load", function() {\n' +
				'		ado("track", "{{EVENT_NAME}}");\n' +
				'	});\n' +
				'<\/script>\n' +
				'<noscript>\n' +
				'	<div style="display:inline;">\n' +
				'		<img height="1" width="1" style="border-style:none;" alt="" src="//pixels.adohm.com/{{ADVERTISER_ID}}/?pageView=true"/>\n' +
				'	</div>\n' +
				'</noscript>',
			details: {
				advertisers: [],
				events: ['PageView','ViewContent','Search','AddToCart','AddToWishlist','InitiateCheckout','AddPaymentInfo','Purchase','Lead','CompleteRegistration']
			},
			options: {
			}
		}),
		computed: {
			pixel_code() {
				var code = this.code_template;
				code = code.replace(/\{\{ADVERTISER_ID\}\}/g, this.item.advertiser);
				code = code.replace(/\{\{EVENT_NAME\}\}/g, this.item.event);
				code = code.replace(/\{\{PIXEL_ID\}\}/g, this.item.pixel_id);
				return code;
			}
		},
		methods: { },
		watch: {
			'item.advertiser': {
				handler(advertiser) {
					$.get('/api/facebook/pixels?advertiser=' + advertiser).done(response => {
						if(response.result) {
							Vue.set(this.item, 'pixel_id', response.result.id);
						} else {
							vApp.message('Facebook pixel id not found for selected advertiser', 'danger');
							Vue.set(this.item, 'pixel_id', null);
						}
					});
				}
			}
		}
	}
</script>