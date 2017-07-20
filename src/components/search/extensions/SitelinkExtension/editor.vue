<template>
	<div>
		<div class="padding-15">
			<div><span>Add new sitelink extension</span></div>
			<div><span class="font-size-smaller">Sitelink text</span></div>
			<div><input type="text" class="bottom-line-input width-100 margin-left-0" v-model="item.siteLinkText"></div>
			<div class="flex-row-10 margin-top-5">
				<div class="flex-item-8"><span class="font-size-smaller">Description line 1 (optional)</span></div>
				<div class="flex-item-2 right"><span class="font-size-smaller">{{item.siteLinkLine2.length}}/25</span></div>									
			</div>
			<div><input type="text" class="bottom-line-input width-100 margin-left-0" v-model="item.siteLinkLine2"></div>
			<div class="flex-row-10 margin-top-5">
				<div class="flex-item-8"><span class="font-size-smaller">Description line 2 (optional)</span></div>
				<div class="flex-item-2 right"><span class="font-size-smaller">{{item.siteLinkLine3.length}}/35</span></div>									
			</div>
			<div><input type="text" class="bottom-line-input width-100 margin-left-0" v-model="item.siteLinkLine3"></div>
			<div class="flex-row-10 margin-top-5">
				<div class="flex-item-8"><span class="font-size-smaller">Final URL</span></div>
				<div class="flex-item-2 right"><span class="font-size-smaller">{{item.siteLinkFinalUrl.length}}/35</span></div>									
			</div>
			<div>
				<input type="text" class="bottom-line-input width-96 margin-right-5-" v-model="item.siteLinkFinalUrl">
				<span class="border-bottom"><i class="fa fa-question-circle left-icon" aria-hidden="true"></i></span>
			</div>
			<div class="margin-top-20">
				<i class="fa fa-angle-up trans ro-11 font-xlarge"></i>
				<span class="cursor vertical-top" v-on:click="expand('trans-11', 'ro-11')">Sitelink URL options</span>									
				<div class="trans-11">
				<div class="margin-top-5">
					<input type="text" class="bottom-line-input width-96 margin-right-5-" v-model="item.tracking_template" placeholder="Tracking template">
					<span class="border-bottom"><i class="fa fa-question-circle left-icon" aria-hidden="true"></i></span>
				</div>
				<div class="margin-top-20">
					<input type="checkbox">
					<span class="margin-left-10">Use a different final URL for mobile</span>
				</div>
				<div class="margin-top-5">
					<div><input type="text" class="bottom-line-input width-100 margin-left-0"
						v-model="item.siteLinkFinalMobileUrl"
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
				<!-- <div class="margin-top-20 flex-row-10 width-100">
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
						<input type="date" class="bottom-line-input width-80" placeholder="Select a date" v-model="item.start_date">
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
						<input type="date" class="bottom-line-input width-80" placeholder="Select a date" v-model="item.end_date">
					</div>
					</div>
				</div> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import ListManager from '@/components/search/components/ListManager'
	import {request} from '@/config/adwords/request';
	
	export default {
		name: 'SiteLinkExtensions',
		props: ['data'],
		data: () => ({
			extension: {
				campaignId: null,
				siteLinkFeedItem: [{
					siteLinkText: '',
					siteLinkLine2: '',
					siteLinkLine3: '',
					siteLinkFinalUrl: '',
					siteLinkFinalMobileUrl: '',
					tracking_template: '',
					startTime: '',
					endTime: '',
					feedItemSchedule: []
				}]
			}
		}),
		mounted: function () {
			this.extension = Object.assign({}, this.extension, this.data);
		},
		computed: {
			item() {
				return this.extension.siteLinkFeedItem[0];
			}
		},
		methods: {
			getList() {
				return new Promise((resolve, reject) => {
					request.post('/get_sitelinkextension').then(({data}) => {
						resolve(data)
					});
				});
			},
			save() {
				var item = this.extension;
				return new Promise((resolve, reject) => {
					request.post('/add_extension/sitelink', item).then(({data}) => {
						if(data.success) {
							resolve(data.result);
						} else reject(data.errorMsg)
					}).catch(reject);
				});
			}
		},
		watch: {
			extension: {
				deep: true,
				handler(extension) {
					this.$emit('update:data', extension)
				}
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
