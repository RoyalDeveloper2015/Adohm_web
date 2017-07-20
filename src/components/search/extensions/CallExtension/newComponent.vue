<template>
	<div class="row p-10">
		<div class="col-sm-12">
			<h6 class="mt-10">Add new call extension</h6>
		</div>
		<div class="row ml-n">
			<div class="col-sm-5">
				<country-list v-model:countryCode="item.countryCode"></country-list>
			</div>
			<div class="col-sm-5 p-n" style="position:relative">
				<input type="text" class="form-control mb-n" placeholder="Phone Number" v-model="item.callPhoneNumber">
				<span class="fa fa-question-circle form-control-feedback border-radius-n" style="line-height:34px"> </span>
				<span class="pull-right my-gray">Example: ({{item.countryCode}}) 555-0123</span>
			</div>
		</div>
		<div class="col-sm-12">
			<span class="my-gray">Call reporting&nbsp;<i class="fa fa-question-circle"></i></span>
		</div>
		<div class="col-sm-12">
			<div class="col-sm-2 pl-n">
				<label> <input class="styled" type="radio" v-model="item.callTracking" :value="true"> On</label>
			</div>
			<div class="col-sm-2">
				<label> <input class="styled" type="radio" v-model="item.callTracking" :value="false"> Off</label>
			</div>
		</div>
		<div class="col-sm-12 my-gray">
			<span>Device preference &nbsp;<i class="fa fa-question-circle"></i></span>
		</div>
		<div class="col-sm-12">
			<div class="d-flex align-items-center line-adjust pull-left">
				<label for="reportconversion"> <input id="reportconversion"	class="styled" type="checkbox"> Count conversions as</label>
			</div>
			<div class="col-sm-4">
				<select class="form-control none-border border-1-bottom my-border-solid my-border-radius-n">
					<option value="1">Calls from ads</option>
				</select>
			</div>
		</div>
		<div class="col-sm-12">
			<span class="my-gray">Device preference &nbsp; <i class="fa fa-question-circle"></i></span>
		</div>
		<div class="col-sm-12">
			<div class="d-flex align-items-center line-adjust pull-left">
				<div class="checkbox checkbox-primary">
					<input id="mobilecheck" class="styled" type="checkbox">
					<label for="mobilecheck">Mobile</label>
				</div>
			</div>
		</div>
		<div class="col-sm-12 pl-n">
			<button class="btn btn-link" v-on:click="flgAdvanceOpt = !flgAdvanceOpt"><i class="fa" v-bind:class="flgAdvanceOpt?'fa-chevron-up':'fa-chevron-down'"></i>Advanced Option</button>
		</div>
		<div class="col-sm-12 m-n p-n">
			<advance-option v-if="flgAdvanceOpt"></advance-option>
		</div>
	</div>
</template>

<script>
import countryList from '../General/countryListComponent.vue'
import advanceOpt from './advanceOption.vue'
import ListManager from '@/components/search/components/ListManager'
import {request} from '@/config/adwords/request';

export default {
	name: 'NewCallExtension',
	components: {
		'country-list': countryList,
		'advance-option': advanceOpt
	},
	data: () => ({
		extension: {
			campaignId: null,
			callFeedItem: [{
				callCountryCode: "IN",
				callPhoneNumber: "9686153659",
				callTracking: true,
				startTime: "",
				endTime: ""
			}]
		},
		flgReport: 'on',
		flgAdvanceOpt: false
	}),
	mounted: function () {
		this.extension =Object.assign({}, this.extension, this.data);
	},
	computed: {
		item() {
			return this.extension.callFeedItem[0];
		}
	},
	methods: {
		getList() {
			return new Promise((resolve, reject) => {
				request.post('/get_callextension').then(({data}) => {
					resolve(data)
				});
			});
		},
		save() {
			var item = this.extension;
			return new Promise((resolve, reject) => {
				request.post('/add_extension/call', item).then(({data}) => {
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
