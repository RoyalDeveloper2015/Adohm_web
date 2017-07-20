<template>
	<div class="p-10">
		<div>
			<h5> Add new Callout extension </h5>
		</div>
		<div>
			<span class="" style="color:#4285F4">CalloutText</span>
		</div>
		<div>
			<input class="form-control input-sm" v-model="item.callOutText" maxLength="25">
			<span class="pull-right">{{item.callOutText.length}}/25</span>
		</div>
		<div>
			<button class="btn btn-link pl-n" v-on:click="showAdvance = !showAdvance">
				<i class="fa" v-bind:class="showAdvance?'fa-chevron-up':'fa-chevron-down'"></i>Advanced Options
			</button>
		</div>
		<div class v-if="showAdvance">
			<advance-option ></advance-option>
		</div>
	</div>
</template>

<script>
	import advanceOption from './advanceOption.vue'
	import {request} from '@/config/adwords/request';
	
	export default {
		name: 'NewCalloutExtension',
		props: ['data'],
		data: () => ({
			extension: {
				campaignId: null,
				callOutFeedItem: [{
					callOutText: ''
				}]
			},
			showAdvance: false
		}),
		components: {
			'advance-option': advanceOption
		},
		mounted: function () {
			this.extension =Object.assign({}, this.extension, this.data);
		},
		computed: {
			item() {
				return this.extension.callOutFeedItem[0];
			}
		},
		methods: {
			getList() {
				return new Promise((resolve, reject) => {
					request.post('/get_calloutextension').then(({data}) => {
						resolve(data)
					});
				});
			},
			save() {
				var item = this.extension;
				return new Promise((resolve, reject) => {
					request.post('/add_extension/callout', item).then(({data}) => {
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
