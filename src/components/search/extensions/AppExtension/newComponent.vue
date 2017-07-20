<template>
	<div class="row m-n p-n bg-white">
		<table class="table-bordered mb-n">
			<tbody>
				<tr>
					<td>
						<div class="col-sm-12">
							<p>Add New app extension </p>
						</div>
						<div class="col-sm-12">
							<p class="my-gray mb-10">Select your mobile app's platform</p>
							<div class="radio radio-primary" style="white-space:warp;word-break:break-word">
								<input type="radio" id="r_android"	value="android" v-model="flag">
								<label for="r_para">Android</label>
							</div>
							<div class="radio radio-primary" style="white-space:warp;word-break:break-word">
								<input type="radio" id="r_ios" value="ios" v-model="flag" >
								<label for="r_extra">iOS</label>
							</div>
						</div>
						<div class="col-sm-12">
							<p class="my-gray mb-5">Look up your app</p>
						</div>
						<div class="col-sm-12">
							<div class="" style="position:relative">
								<input type="text" class="form-control mb-n my-border-radius-n outline-no" placeholder="Enter the app name, package name, or publisher" v-model="fString">
								<span class="fa fa-search form-control-feedback border-radius-n" style="line-height:34px; "> </span>
							</div>
						</div>
						<div class="col-sm-12">
							<span class="my-gray">Link text</span>
						</div>
						<div class="col-sm-12">
							<input class="form-control my-border-radius-n bottom-border-no-outline" maxLength="25" v-model="strLinkText">
							<span class="pull-right my-gray">{{strLinkText.length}}/25</span>
						</div>
						<div class="col-sm-12 my-gray">
							<span>Device preference<i class="fa fa-question-circle"></i></span>
						</div>
						<div class="col-sm-12">
							<div class="checkbox checkbox-primary line-adjust" style="white-space:warp;word-break:break-word">
								<input type="checkbox" id="check_mobile" class="styled" v-model="mobileType">
								<label for="check_mobile">Exclude tablets</label>
							</div>
						</div>
						<div class="col-sm-12 p-n">
							<button class="btn btn-link" v-on:click="urlOption=!urlOption">
								<i class="fa" v-bind:class="urlOption?'fa-chevron-up':'fa-chevron-down'"></i> App URL Option
							</button>
						</div>
						<div class="col-sm-12 p-n">
							<url-option v-if="urlOption"></url-option>
						</div>
						<div class="col-sm-12 p-n">
							<button class="btn btn-link" v-on:click="advanceOption=!advanceOption">
								<i class="fa" v-bind:class="advanceOption?'fa-chevron-up':'fa-chevron-down'"></i> Advacned Option
							</button>
						</div>
						<div class="col-sm-12 p-n">
							<advance-option v-if="advanceOption"></advance-option>
						</div>
					</td>
					<td rowspan="2" width="13%" class="bg-gray" style="text-align:center;vertical-align:middle">
						<span>PREVIEW</span>
					</td>
				</tr>
				<tr>
					<div class="col-sm-12">
						<button class="btn btn-link" v-on:click="save">SAVE AND ADD </button>
						<button class="btn btn-link" v-on:click="cancel">CANCEL </button>
					</div>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import Option from './advancedOption.vue'
	import url from './urlOption.vue'
	import ListManager from '@/components/search/components/ListManager'
	import {request} from '@/config/adwords/request';

	export default {
		name: 'createReview',
		components: {
			'advance-option': Option,
			'url-option': url
		},
		data: () => ({
			item: {
				strReview: '',
				strSource: '',
				strUrl: '',
				flag: 'paraphrased',
				advanceOption: false,
				strLinkText: '',
				mobileType: false,
				urlOption: false
			}
		}),
		methods: {
			getList() {
				return new Promise((resolve, reject) => {
					request.post('/get_sitelinkextension', item).then(({data}) => {
						resolve(data)
					});
				});
			},
			save() {
				var item = this.item;
				return new Promise((resolve, reject) => {
					request.post('/add_sitelinkextension', item).then(({data}) => {
						if(data.success) {
							resolve(data.result);
						} else reject(data.errorMsg)
					}).catch(reject);
				});
			}
		},
		watch: {
			item: {
				deep: true,
				handler(item) {
					this.$emit('update:data', item)
				}
			}
		}
	}
</script>
