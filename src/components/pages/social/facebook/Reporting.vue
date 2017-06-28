<template>
<div>
	<div class="container-fluid">
		<div class="row page-title-div">
			<div class="col-sm-6">
				<h2 class="title">Reporting</h2>
				<p class="sub-title">Social campaign reporting</p>
			</div>
		</div>

		<div class="row breadcrumb-div">
			<div class="col-sm-6">
				<ul class="breadcrumb">
					<li><i class="fa fa-home"></i> Social </li>
					<li class="active">Reporting</li>
				</ul>
			</div>
		</div>
	</div>

	<section class="section">
		<div class="container-fluid">
			<div class="row">
				<div class="col-md-4">
					<!--<selectize :data="details.fields" v-model="params.fields" placeholder="Select fields" :multiple="true"></selectize>-->
				</div>
				<div class="col-md-6"></div>
				<div class="col-md-2">
					<div class="btn btn-default pull-right" id="daterange">
						<span v-if="params.range.type == 'custom'">
							{{moment(params.range.start).format('Y MMM DD')}} - {{moment(params.range.end).format('Y MMM DD')}}
						</span>
						<span v-else> {{getData(details.ranges, params.range.value, 'name')}}: {{moment(params.range.start).format('Y MMM DD')}} - {{moment(params.range.end).format('Y MMM DD')}}</span>
						<span class="caret">&nbsp;</span>
					</div>
				</div>
			</div>
			<hr>	
			<div class="panel">
				<div class="panel-body">
					<table class="table">
						<thead>
							<tr>
								<th v-for="field in params.fields"> {{getData(details.fields, field, 'name', 'id')}} </th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in items">
								<td v-for="field in params.fields" align="left" v-html="processValue(item, field)"></td>
							</tr>
							<tr v-if="items.length ==0"> 
								<td :colspan="params.fields.length" align="center">No results found</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</section>
</div>
</template>

<script>
	import {vInsights, vUtils} from '@/components/Mixins'
	import {request} from '@/config/default/request'
	import moment from 'moment'
	import {mapGetters} from 'vuex'
	import Vue from 'vue'

	export default {
		mixins: [vInsights, vUtils],
		data: () => ({
			items: [],
			params: {
				range: {
					type: 'predefined',
					value: 'last_30d',
					start: moment().subtract(30, 'days').format('YYYY-MM-DD'),
					end: moment().subtract(1, 'days').format('YYYY-MM-DD')
				},
				fields: ['campaign_id', 'campaign_name', 'impressions', 'spend', 'cpc', 'cpm']
			},
			details: {
				ranges: [
					{name: 'Today', id: 'today'},
					{name: 'Yesterday', id: 'yesterday'},
					{name: 'Last 7 Days', id: 'last_7d'},
					{name: 'Last 30 Days', id: 'last_30d'},
					{name: 'This Month', id: 'month'},
					{name: 'Last Month', id: 'last_month'},
					{name: 'Custom Range', id: 'custom'},
				],
				currency: {}
			},
			options: {	
			}
		}),
		methods: {
			loadInsights() {
				this.getInsights(this.params, insights => {
					Vue.set(this, 'items', insights.map(insight => {
						insight.advertiser = insight.campaign.advertiser;
						return insight
					}));
				});
			},
			moment
		},
		mounted() {
			$('.dropdown-toggle').on('click', function () {
				$(this).parent().toggleClass('open');
			});
			$(document).on('click', function (e) {
				if(!$(e.target).closest('.dropdown-menu,.dropdown-toggle').length) $('.dropdown-menu').parent().removeClass('open');
			});
			$('#daterange').daterangepicker({
				ranges: {
					'Today': [moment(), moment()],
					'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
					'Last 7 Days': [moment().subtract(7, 'days'), moment().subtract(1, 'days')],
					'Last 30 Days': [moment().subtract(30, 'days'), moment().subtract(1, 'days')],
					'This Month': [moment().startOf('month'), moment()],
					'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
				}
			}, (start, end, label) => {
				var map = {
					'Today': 'today',
					'Yesterday': 'yesterday',
					'Last 7 Days': 'last_7d',
					'Last 30 Days': 'last_30d',
					'This Month': 'month',
					'Last Month': 'last_month'
				};
				if(label == 'Custom Range') {
					this.params.range = Object.assign({}, this.params.range, {type: 'custom', value: 'custom', start, end});
				} else {
					this.params.range = Object.assign({}, this.params.range, {type: 'predefined', value: map[label], start, end});
				}
			});
			request.get('/api/currency').then(({data}) => {
				if(data.success) {
					Vue.set(this.details, 'currency', data.result);
				}
			});
			this.loadInsights();
		},
		computed: {
			...mapGetters('session', ['fbApi'])
		},
		watch: { 
			params: {
				deep: true,
				handler: function() {
					this.loadInsights();
				}
			}
		}
	}
</script>