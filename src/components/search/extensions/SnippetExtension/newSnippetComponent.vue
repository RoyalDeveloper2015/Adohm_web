<template>
<div>
	<div class="col-sm-12">
		<p class="mt-n mb-5">Add new structured snippet extension</P>
	</div>
	<div class="col-sm-12">
		<span class="my-gray">Header <i class="fa fa-question-circle"></i></span>
	</div>
	<div class="col-sm-12 p-n">
		<div class="col-xs-4">
			<select class="form-control bottom-border-no-outline my-border-radius-n">
				<option value="eng">English</option>
			</select>
		</div>
		<div class="col-xs-4">
			<select v-model="item.header" class="form-control bottom-border-no-outline my-border-radius-n">
				<option value="amenities">Amenities</option>
				<option value="brand">Brand</option>
				<option value="courses">Courses</option>
				<option value="degree">Degree programs</option>
				<option value="destinations">Destinations</option>
				<option value="featured">Featured hotels</option>
				<option value="insurance">Insurance coverage</option>
				<option value="models">Models</option>
				<option value="neighborhoods">Neighborhoods</option>
				<option value="service">Service catalog</option>
				<option value="shows">Shows</option>
				<option value="styles">Styles</option>
			</select>
		</div>
	</div>
	<div class="col-sm-12">
		<p class="mt-10 mb-5 my-gray">Values &nbsp;<i class="fa fa-question-circle"></i></p>
	</div>
	<div class="col-sm-12" v-for="value, idx in item.values">
		<input class="form-control" v-model="item.values[idx]" maxLength="25">
		<span class="pull-right">{{value.length}}/25</span>
	</div>
	<div class="col-sm-12 pl-n">
		<button class="btn btn-link">ADD VALUE</button>
	</div>
	<div class="col-sm-12 pl-n">
		<button class="btn btn-link" v-on:click="flgAdvance=!flgAdvance"><i class="fa" v-bind:class="flgAdvance?'fa-chevron-up':'fa-chevron-down'"></i>Advance Options</button>
	</div>
	<advance-option v-if="flgAdvance"></advance-option>
</div>
</template>
	
<script>
	import advanceOption from '../CalloutExtension/advanceOption.vue'
	import {request} from '@/config/adwords/request';
	
	export default {
		name: 'CreateSnippet',
		props: ['data'],
		components: {
			'advance-option': advanceOption
		},
		data: () => ({
			extension: {
				campaignId: null,
				structuredSnippetFeedItem: [{
					header: null,
					values: ['', '', '']
				}]
			},
			flgAdvance: false
		}),
		mounted: function () {
			this.extension = Object.assign({}, this.extension, this.data);
		},
		computed: {
			item() {
				return this.extension.structuredSnippetFeedItem[0];
			}
		},
		methods: {
			getList() {
				return new Promise((resolve, reject) => {
					request.post('/get_structuredsnippetextension').then(({data}) => {
						resolve(data)
					});
				});
			},
			save() {
				var item = this.extension;
				return new Promise((resolve, reject) => {
					request.post('/add_extension/structuredsnippet', item).then(({data}) => {
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
