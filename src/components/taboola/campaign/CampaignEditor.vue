<template>
<div>
	<div class="container-fluid">
		<div class="row page-title-div">
			<div class="col-sm-6">
				<h2 class="title">Taboola Campaign Editor</h2>
				<p class="sub-title">Create or edit campaigns</p>
			</div>
		</div>
		<div class="row breadcrumb-div">
			<div class="col-sm-6">
				<ul class="breadcrumb">
					<li><i class="fa fa-home"></i> Taboola </li>
					<li class="active"> <a href="/social/performance/">Campaign Editor</a></li>
				</ul>
			</div>
		</div>
	</div>
	<section class="section">
		<div class="container-fluid">
			<div class="panel">
				<div class="panel-heading">
					<h4 class="panel-title">Basic details </h4>
				</div>
				<div class="panel-body">
					<form class="form">

						<div class="row">
							<div class="col-xs-4">
								<label>Campign Name</label>
							</div>
							<p class="col-xs-8">
								<input type="text" class="form-control" v-model="item.name">
							</p>
						</div>
						<div class="row">
							<div class="col-xs-4">
								<label>Brand Name</label>
							</div>
							<p class="col-xs-8">
								<input type="text" class="form-control" v-model="item.branding_text">
							</p>
						</div>
						<div class="row">
							<div class="col-xs-4">
								<label>Cost per click</label>
							</div>
							<p class="col-xs-8">
								<input type="number" class="form-control" v-model="item.cpc">
							</p>
						</div>
						<div class="row">
							<div class="col-xs-4">
								<label>Daily cap</label>
							</div>
							<p class="col-xs-8">
								<input type="number" class="form-control" v-model="item.daily_cap">
							</p>
						</div>		
						<div class="row">
							<div class="col-xs-4">
								<label>Delivery method</label>
							</div>
							<p class="col-xs-8">
								<label class="no-style"> <input type="radio" name="deliveryMethod" v-model="item.daily_ad_delivery_model" value="BALANCED"> Balanced </label>
								<label class="no-style"> <input type="radio" name="deliveryMethod" v-model="item.daily_ad_delivery_model" value="ACCELERATED"> Accelerated </label>
								<label class="no-style"> <input type="radio" name="deliveryMethod" v-model="item.daily_ad_delivery_model" value="STRICT"> Strict </label>
							</p>
						</div>		
						<div class="row">
							<div class="col-xs-4">
								<label>Tracking code</label>
							</div>
							<p class="col-xs-8">
								<input type="text" class="form-control" v-model="item.tracking_code">
							</p>
						</div>
						<div class="row">
							<div class="col-xs-4">
								<label>Total spend</label>
							</div>
							<div class="col-xs-8">
								<div class="row">
									<label class="col-xs-4"><input type="radio" v-model="item.spending_limit_model" value="ENTIRE"> &nbsp; Entire campaign</label>
									<label class="col-xs-3"><input type="radio" v-model="item.spending_limit_model" value="MONTHLY"> &nbsp; Monthly</label>
								</div>
								<div class="input-group">
									<a class="input-group-addon">{{currency_symbol}}</a> 
									<input type="number" class="form-control" v-model="item.spending_limit">
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-4">
								<label>Flight dates</label>
							</div>
							<div class="col-xs-8">
								<div class="row">
									<div class="col-xs-6">
										<div class="input-group">
											<span class="input-group-addon">Start date</span>
											<input v-model="item.start_date"  class="form-control date" type="date">
										</div>
									</div>
									<div class="col-xs-6">
										<div class="input-group">
											<span class="input-group-addon">End date</span> 
											<input v-model="item.end_date"  class="form-control date" type="date">
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="row mb-10">
							<div class="col-xs-4">
								<label>Country targeting</label>
							</div>
							<div class="col-xs-8">
								<div class="row">
									<label class="col-xs-3"><input type="radio" v-model="item.country_targeting.type" value="INCLUDE"> &nbsp; Include</label>
									<label class="col-xs-3"><input type="radio" v-model="item.country_targeting.type" value="EXCLUDE"> &nbsp; Exclude</label>
								</div>
								<div class="row">
									<div class="col-xs-12">
										<multi-select track-by="name" label="value" :options="details.countries" v-model="item.country_targeting.value" 
											@search-change="query => searchLocation(query, 'country')"></multi-select>
									</div>
								</div>
								<template v-if="canSubTarget">
									<div class="row">
										<label> Sub country targeting </label>
										<label class="col-xs-3"><input type="radio" v-model="item.sub_country_targeting.type" value="INCLUDE"> &nbsp; Include</label>
										<label class="col-xs-3"><input type="radio" v-model="item.sub_country_targeting.type" value="EXCLUDE"> &nbsp; Exclude</label>
									</div>
									<div class="row">
										<div class="col-xs-12">
											<multi-select track-by="name" label="value" :options="details.regions" v-model="item.sub_country_targeting.value" 
												@search-change="query => searchLocation(query, 'sub_country')"></multi-select>
										</div>
									</div>
								</template>
							</div>
						</div>

						<div class="row mb-10">
							<div class="col-xs-4">
								<label>Platform targeting</label>
							</div>
							<div class="col-xs-8 row">
								<label class="col-xs-4"><input type="checkbox" v-model="item.platform_targeting.value" value="DESK"> &nbsp; Desktop</label>
								<label class="col-xs-4"><input type="checkbox" v-model="item.platform_targeting.value" value="PHON"> &nbsp; Smartphone</label>
								<label class="col-xs-4"><input type="checkbox" v-model="item.platform_targeting.value" value="TBLT"> &nbsp; Tablet</label>
							</div>
						</div>
						<div class="row mb-10">
							<div class="col-xs-4">
								<label>Publisher excluding</label>
							</div>
							<div class="col-xs-8">
								<textarea class="form-control" v-model="item.publisher_targeting.value" cols="30" rows="5" placeholder="Account ids to exlcude"></textarea>
							</div>
						</div>
						<div class="row">
							<div class="col-md-8"></div>
							<div class="col-md-4">
								<a class="pull-right btn btn-primary" @click="save()">Save &amp; Submit</a>
								<!-- <a class="pull-right btn btn-success" @click="save(C_STATE_DRAFT)">Save as Draft</a> -->
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>
</div>
</template>

<script>
	import Vue from 'vue'
	import {request} from '@/config/default/request'
	import MultiSelect from 'vue-multiselect'
    export default {
        data: () => ({
			item: {
				// id: null,
				// advertiser_id: null,
				name: null,
				advertiser: null,
				branding_text: null,
				tracking_code: null,
				cpc: null,
				daily_cap: null,
				spending_limit: null,
				spending_limit_model: 'ENTIRE',
				country_targeting: {type: 'INCLUDE', value: [] },
				platform_targeting: {type: 'INCLUDE', value: [] },
				publisher_targeting: {type: 'EXCLUDE', value: "" },
				start_date: null,
				end_date: null,
				// approval_state: null,
				is_active: null,
				// spent: null,
				// status: null,
				daily_ad_delivery_model: 'ACCELERATED',
				publisher_bid_modifier: null,
				sub_country_targeting: {}
			},
			details:{
				advertisers: [],
				countries: [],
				regions: [],
				types: [
					{name: 'HTML5 Zip', id: 1},
					{name: 'HTML Tag', id: 2},
				]
			},
			options: {
			}
        }),
        filters: {
         
        },
		methods: {
			getData(list, id, field) {
				var item = list.find((item) => item.id == id);
				return item && item[field];
			},
			save(action) {
				var $this = this;
				var item = clone(this.item);
				request.post(`/api/taboola/campaigns/${item.id ? item.id : ''}`, item).then( ({data}) => {
					if(data.success) {
						this.$emit(item.id ? 'update' : 'add', data.result);
						if(!item.id) Vue.set(this, 'item', this.$options.data().item);
					}
				});
			},
			edit(id) {
				request.get('/api/taboola/campaigns/' + id).then(({data}) => {
					var item =  data.result;
					
					Vue.set(this, 'item', $.extend(true, {}, this.item, item));

				});
				
			},
			searchLocation(query, type) {

			}
		},
        mounted() {
			
			console.debug('creative-editor');
            var $this = this;

			if(this.$route && this.$route.params.id) {
				this.edit(this.$route.params.id);
			}
	
		},
		computed: {
			currency_symbol() {
				return 'USD'
			},
			canSubTarget() {
				return this.item.country_targeting.type == 'INCLUDE'  && this.item.country_targeting.value.length > 1
			}
		},
		watch: {
			
		}
    }
</script>