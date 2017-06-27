<template>
	<div>
		<div class="container-fluid">
			<div class="row page-title-div">
				<div class="col-sm-6">
					<h2 class="title">Performance</h2>
					<p class="sub-title">Manage campaigns and  performance</p>
				</div>

			</div>
			<!-- /.row -->
			<div class="row breadcrumb-div">
				<div class="col-sm-6">
					<ul class="breadcrumb">
						<li><i class="fa fa-home"></i> Social </li>
						<li class="active">Performance</li>
					</ul>
				</div>
			</div>
		</div>

		<section class="section">
			<div class="container-fluid">
				<div class="row hidden">
					<canvas id="campaign-chart" class="mb-20"></canvas>
				</div>

				<div class="row">
					<div class="col-sm-12">
						<div class="btn-group">
							<button type="button" class="btn btn-info" data-toggle="dropdown"><span class="fa fa-plus"></span>Create 
							</button>
							<button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<span class="caret"></span>
							</button>
							<ul class="dropdown-menu">
								<li> <router-link to="/social/facebook/campaigns/create">Facebook Campaign</router-link> </li>
								<li> <router-link to="">Twitter Campaign (coming soon)</router-link> </li>
							</ul>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12">&nbsp;</div>
				</div>

				<!--<div class="container-fluid">
					<filter-widget class="panel" @input="refreshItems" :options="{
						items: items,
						source: '/api/campaigns/query',
						activeFilter: 'campaign.name',
						filters: [{
							field: 'campaign.id',
							name: 'Id',
							type: 'equals',
							inputType: 'text',
							hint: 'Search by campign id'
						}, {
							field: 'campaign.name',
							name: 'Name',
							type: 'contains',
							inputType: 'text',
							hint: 'Search by campign name'
						}, {
							field: 'campaign.state',
							name: 'State',
							type: 'in_array',
							inputType: 'select',
							multiple: true,
							inputOptions: {
								ajax: {url: '/api/campaigns/states'},
								preload: true
							}
						}, {
							field: 'campaign.advertiser',
							name: 'Advertiser',
							type: 'in_array',
							inputType: 'select',
							multiple: true,
							inputOptions: {
								ajax: {url: '/api/advertisers/get'},
								preload: true
							}
						}]
					}"> </filter-widget>
				</div>-->

				<div class="row">
					<div class="col-sm-12 ">
						<table class="table panel">
							<thead>
								<tr>
									<th>Status</th>
									<th class="text-left">Name</th>
									<th class="text-left">Flight Dates</th>
									<th>Budget </th>
									<th>Impressions</th>
									<th>Spend</th>
									<th>Clicks</th>
									<th>CPC</th>
									<th>CPM</th>
									<th>Results</th>
									<th>Cost per result</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								<template  v-for="campaign in items">
									<tr> 
										<td>
											<a href="" type="button">
												<!--<tooltip :content="getState(campaign.state, 'name')">-->
													<div v-if="[1,3,5].includes(campaign.state)" class="statusClass" :class="{'pending': campaign.state == 1, 'active': campaign.state == 3,  'draft': campaign.state == 5}"> &nbsp; </div>
													<div v-else class="statusClass inactive"> &nbsp; </div>
												<!--</tooltip>-->
											</a>
										</td>
										<td class="text-left"> <a class="editable">{{campaign.name}}</a> </td>
										<td> 
											<template v-if="campaign.date_start && campaign.date_end">
												{{campaign.date_start | formatDate}} - {{campaign.date_end | formatDate}} 
											</template> 
											<template v-else>-</template>
										</td>
										<td>{{processMacros('{currency}',campaign.advertiser) + (campaign.budget||campaign.dailybudget) }} </td>
										<td>{{processValue(campaign, 'impressions')}}</td>
										<td>{{processValue(campaign, 'spend')}}</td>
										<td>{{campaign.clicks}}</td>
										<td>{{processValue(campaign, 'cpc')}}</td>
										<td>{{processValue(campaign, 'cpm')}}</td>
										<td>{{processValue(campaign, 'results')}}</td>
										<td>{{processValue(campaign, 'cost_per_result')}}</td>
										<td>
											<div class="actions">
												<div class="noselect sub-actions" stop-propagate="">
													<a v-show="canRun(campaign.state)" @click="updateState(campaign.id, C_STATE_ACTIVE)"><span class="glyphicon glyphicon-play" ></span></a>
													<a v-show="campaign.state == C_STATE_ACTIVE" @click="updateState(campaign.id, C_STATE_INACTIVE)"><span class="glyphicon glyphicon-stop" ></span></a>
													<a data-toggle="collapse" :href="'#campaign-' + campaign.id"><span class="glyphicon glyphicon-plus"></span></a>
													<router-link :to="'/social/campaign-editor/' + campaign.id"><span class="glyphicon glyphicon-pencil"></span></router-link>
													<a @click="remove(campaign.id)"><span class="glyphicon glyphicon-trash"></span></a>
													<span data-toggle="modal" data-target="#archiveModal"><a class="st-archive" data-toggle="popover" title="Archive" data-placement="top" data-trigger="hover"></a></span>
												</div>
											</div>
										</td>
									</tr>
								</template>

								<tr v-if="!items.length">
									<td colspan="100" align="center"> No results found </td>
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
	import Vue from 'vue'
	import {ToolTip} from 'vue-strap'
	import {request} from '@/config/default/request'

	export default {
		mixins: [vFilters, vListMethods, vInsights],
		components: { ToolTip },
		data() {
			return {
				C_STATE_PENDING: 1,
				C_STATE_READY: 2,
				C_STATE_ACTIVE: 3,
				C_STATE_INACTIVE: 4,
				items: [],
				states: [],
				details: {
					currency: {}
				}
			}
		},
		methods: {
			canRun(state) {
				return state !== this.C_STATE_ACTIVE;
				// return  state == this.C_STATE_INACTIVE || state == this.C_STATE_READY;
			},
			updateState(id, state) {
				this.update(id, {state});
			},
			getState(code, prop) {
				var state = this.states.find(el => el.id === code);
				return state && state[prop];
			},
			refreshItems(items) {
				Vue.set(this, 'items', items);
			},
			loadInsights() {
				this.getInsights(false, insights => {
					insights.forEach(insight => {
						let idx = this.items.findIndex(el => el.id === insight.campaign_id);
						if(idx === -1) return;
						this.items.splice(idx, 1, Object.assign(this.items[idx], insight));
					});
				});
			}
		},
		mounted() {
			this.listName = 'campaigns';

			request.get('/api/campaigns/').then(({data}) => {
				data.result.forEach((item) => {
					this.items.push(item);
				});
				this.loadInsights();
			});
			request.get('/api/currency').then(({data}) => {
				if(data.success) {
					Vue.set(this.details, 'currency', data.result);
				}
			});
		},
		watch: {
			items: {
				deep: true,
				handler() {
				}
			}
		}
	}
/*
	Filter API
		source: Enum(campaign|creative|advertiser)
		field: Array
		type: Enum(equals|contains|in_range)
		value: equals:Number,String|contains:String|in_array:Array([...values])|in_range:Array([start, end])
		select: Array
*/
</script>