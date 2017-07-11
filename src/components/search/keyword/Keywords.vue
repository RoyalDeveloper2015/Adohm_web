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
							<div class="checkbox radio-margin">
								<label>
									<input type="checkbox" value="">
									<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>
								</label>
							</div>
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
							<div class="checkbox radio-margin">
								<label>
									<input type="checkbox" value="">
									<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>
								</label>
							</div>
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
<style lang="css">

	.search-campaign {
		display: inline-block;
		width: 100%;
		z-index: 2;		
	}
	.subnav {
		margin: 30px 20px 0px 20px;
		padding: 0px 20px 4px 20px;
		display: inline-block;
	}
	.subnav:hover {
		border-bottom-style: solid;
		border-bottom-width: 3px;
		border-bottom-color: #3498db;
	}
	.active-bottom {
		border-bottom-style: solid;
		border-bottom-width: 3px;
		border-bottom-color: #3498db;
	}
	.round-button {
		display:block;
		width:50px;
		height:50px;
		line-height:50px;
		border-radius: 50%;
		color:#ffffff;
		text-align:center;
		text-decoration:none;
		background: #3498FC;
		box-shadow: 0 0 3px gray;
		margin-left: 20px;
	}
	.round-button:hover {
			background: #ffffff;
			color: #3498FC;
	}
	.line-group {
		margin: 40px 0px 40px 40px;
	}
	.line-item {
		margin: 40px 0px 40px 0px;
		vertical-align: center;
		width: 95%;
		text-align: right;
	}
	.line-item hr {
		display: inline-block;
		width: 95%;
		border: 0;
		border-top: 1px solid #ccc;
		padding: 0;
		margin: 5px 0px 5px 10px;
	} 

	/*---------- table style start ---------- */
	.content-table {
		padding: 0px 20px 0px 20px;
	}
	.table-custom tr {
		border: 2px solid rgba(0,0,0,0.04);
	}
	.top-row {
		background-color: rgba(0,0,0,0.04) !important;
	}
	.amount {
		text-align: right;
	}
	tbody {
		background-color: #f9f9f9;
	}
	.green {
		color: #0db70d;
	}
	thead i {
		color: rgba(0,0,0,0.5) !important;
	}
	tfoot {
		background-color: rgba(0,0,0,0.04) !important;
	}
	table .fa-circle, .fa-pause {
		font-size: xx-small !important;
	}
	tfoot td {
		background-color: #f2f2f2 !important;
		font-weight: bold;
	}

	.checkbox label:after {
			content: '';
			display: table;
			clear: both;
	}

	.checkbox .cr {
			position: relative;
			display: inline-block;
			border: 1px solid #a9a9a9;
			border-radius: .25em;
			width: 1.3em;
			height: 1.3em;
			float: left;
			margin-right: .5em;
	}

	.checkbox .cr .cr-icon {
			position: absolute;
			font-size: .8em;
			line-height: 0;
			top: 50%;
			left: 20%;
	}

	.checkbox label input[type="checkbox"] {
			display: none;
	}

	.checkbox label input[type="checkbox"] + .cr > .cr-icon {
			transform: scale(3) rotateZ(-20deg);
			opacity: 0;
			transition: all .3s ease-in;
	}

	.checkbox label input[type="checkbox"]:checked + .cr > .cr-icon {
			transform: scale(1) rotateZ(0deg);
			opacity: 1;
	}

	.checkbox label input[type="checkbox"]:disabled + .cr {
			opacity: .5;
	}

	/*-------------- table style end -------------------*/
</style>