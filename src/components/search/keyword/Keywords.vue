<template>
	<div class="search-campaign">
		<nav class="navbar bg-white box-shadow sub-nav">
			<ul class="nav subnav " :class="{'active-bottom': $route.name == 'search'}"><router-link to="/search/keywords/search">Keywords</router-link></ul>
			<ul class="nav subnav" :class="{'active-bottom': $route.name == 'display'}"><router-link to="/search/keywords/display"> Display/Video Keywords</router-link> </ul>
			<ul class="nav subnav" :class="{'active-bottom': $route.name == 'negative'}"><router-link to="/search/keywords/negative"> Negative Keywords</router-link> </ul>
			<ul class="nav subnav" :class="{'active-bottom': $route.name == 'searchterms'}"><router-link to="/search/keywords/searchterms"> Search Terms</router-link> </ul>
			<ul class="nav subnav"> 
				<span>More</span>
				<i class="fa fa-angle-down arrow"></i>
			</ul>
		</nav>
		<div class="line-group">
			<div class="line-item">
				<span>100</span><hr/>
			</div>
			<div class="line-item">
				<span>400</span><hr/>
			</div>
			<div class="line-item">
				<span>0</span><hr/>
			</div>
		</div>
		<router-link to="/search/addcampaign"><a class="round-button"><i class="fa fa-plus"></i></a></router-link>
		<div class="content-table">
			<table id="example" class="display table table-striped table-bordered" cellspacing="0">
				<thead>
					<tr>
						<th>
							<input type="checkbox" value="">
						</th>
						<th><i class="fa fa-circle black"></i></th>
						<th>Keyword</th>
						<th>Campaign</th>
						<th>AdGroup</th>
						<th>Status</th>
						<th>Max. CPC</th>
						<th>Policy Details</th>			
						<th>Final URL</th>
						<th>Impr.</th>
						<th>Interactions</th>
						<th>Interaction rate</th>
						<th>Avg. Cost</th>
						<th>Cost</th>
					</tr>					
				</thead>
				<tfoot>
					<tr>
						<td></td>
						<td></td>
						<td>Total-all but removed campaigns</td>
						<td></td>
						<td class="amount"><i class="fa fa-inr" aria-hidden="true"></i>0.00</td>
						<td></td>
						<td class="amount">0</td>
						<td class="amount">0</td>
						<td class="amount">0.00%</td>
						<td class="amount"><i class="fa fa-inr" aria-hidden="true"></i>0.00</td>
						<td class="amount"><i class="fa fa-inr" aria-hidden="true"></i>0.00</td>
					</tr>
					<tr>
						<td></td>
						<td></td>
						<td>Total-all experiments</td>
						<td></td>
						<td class="amount"><i class="fa fa-inr" aria-hidden="true"></i>0.00</td>
						<td></td>
						<td class="amount">0</td>
						<td class="amount">0</td>
						<td class="amount">0.00%</td>
						<td class="amount"><i class="fa fa-inr" aria-hidden="true"></i>0.00</td>
						<td class="amount"><i class="fa fa-inr" aria-hidden="true"></i>0.00</td>
					</tr>	
					<tr>
						<th></th>
						<th></th>
						<th>Total-all campaigns</th>
						<th></th>
						<th class="amount"><i class="fa fa-inr" aria-hidden="true"></i>{{totalbudget}}/day</th>
						<th></th>
						<th class="amount">0</th>
						<th class="amount">0</th>
						<th class="amount">0.00%</th>
						<th class="amount"><i class="fa fa-inr" aria-hidden="true"></i>0.00</th>
						<th class="amount"><i class="fa fa-inr" aria-hidden="true"></i>0.00</th>
					</tr>
				</tfoot>
				<tbody>				
					<tr class="content-row"v-for="campaign in campaigns">
						<td>
							<input type="checkbox" value="">
						</td>
						<td><i class="fa fa-circle green" v-if="campaign.status==='Eligible'"></i>
								<i class="fa fa-pause red" v-else></i></td>
						<td>{{campaign.name}}</td>
						<td>{{campaign.client_account_name}}</td>
						<td class="amount">{{campaign.budget.type}}<br /><i class="fa fa-inr" aria-hidden="true"></i>{{campaign.budget.amount}}/day</td>
						<td>{{campaign.status}}</td>
						<td class="amount">{{campaign.impr}}</td>
						<td class="amount">{{campaign.clicks}}</td>
						<td class="amount">{{campaign.ctr}}%</td>
						<td class="amount"><i class="fa fa-inr" aria-hidden="true"></i>{{campaign.avg_cpc}}</td>
						<td class="amount"><i class="fa fa-inr" aria-hidden="true"></i>{{campaign.cost}}</td>
					</tr>						 
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery'
	import {mapActions} from 'vuex'

	require('datatables.net')
	require('datatables.net-bs')

export default {
	name: 'searchCampaign',
	data: function () {
		return {
			campaigns: [
				{
					name: 'trial campaign',
					client_account_name: 'test',
					budget: {
						type: '',
						amount: 5000
					},
					status: 'Eligible',
					impr: 0,
					clicks: 0,
					ctr: 0,
					avg_cpc: 0,
					cost: 0
				},
				{
					name: 'test#1496232938768',
					client_account_name: 'test',
					budget: {
						type: 'camp2#1496232937417',
						amount: 5000
					},
					status: 'Paused',
					impr: 0,
					clicks: 0,
					ctr: 0,
					avg_cpc: 0,
					cost: 0
				},
				{
					name: 'test1#1496232938822',
					client_account_name: 'test',
					budget: {
						type: 'camp2#1496232937417',
						amount: 5000
					},
					status: 'Eligible',
					impr: 0,
					clicks: 0,
					ctr: 0,
					avg_cpc: 0,
					cost: 0
				}
			],
			totalbudget: 0
		}
	},
	methods: {
		...mapActions('adwords/campaign', ['getAll'])
	},
	mounted: function () {
		this.$nextTick(function () {
			$('#example').DataTable({
				'paging': false
			})
		});
		this.getAll().then(campaigns => {
			Vue.set(this, 'campaigns', campaigns);
		});
	},
	watch: {
		campaigns: {
			handler(campaigns) {
				for (let i = 0; i < campaigns.length; i++) {
					this.totalbudget = this.totalbudget + campaigns[i].budget.amount
				}
			}
		}
	}
}
</script>
