<template>
	<div class="search-adgroup">
		<nav class="navbar bg-white box-shadow sub-nav">
			<ul class="nav subnav active-bottom">AdGroups</ul>
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
		<router-link to="/search/adgroups/new"><a class="round-button"><i class="fa fa-plus"></i></a></router-link>
		<div class="content-table">
			<table id="example" class="display table table-striped table-bordered" cellspacing="0">
				<thead>
					<tr>
						<th>
							<input type="checkbox" value="">
						</th>
						<th><i class="fa fa-circle black"></i></th>
						<th>AdGroup</th>
						<th>Campaign</th>
						<th>Status</th>
						<th>Default Max. CPC</th>
						<th>Max. CPV</th>
						<th>Target CPA</th>			
						<th>Impressions</th>
						<th>Interactions</th>
						<th>Interaction rate</th>
						<th>Avg. Cost</th>
						<th>Cost</th>
						<th>Adgroup Type</th>
					</tr>					
				</thead>
				<tfoot>
					<tr>
						<td></td>
						<td></td>
						<td>Total-all but removed adgroups</td>
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
						<th>Total-all adgroups</th>
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
					<tr class="content-row" v-for="adgroup in items">
						<td>
							<input type="checkbox" value=""> 
						</td>
						<td>
							<div class="btn-group">
								<div class="btn btn-xs dropdown-toggle" data-toggle="dropdown">
									<i class="fa fa-circle green" v-if="adgroup.status==='Eligible'"></i>
									<i class="fa fa-pause red" v-else></i>
									<span class="caret"></span>
								</div>
								<ul class="dropdown-menu">
									<li><a><i class="fa fa-circle green"></i>Enable</a></li>
									<li><a><i class="fa fa-circle gray"></i>Pause</a></li>
								</ul>
							</div>
						</td>
						<td>
							<router-link :to="'/search/ads/?adgroup_id=' + adgroup.id"> {{adgroup.name}} </router-link> &nbsp;
							<span class="fa fa-pencil"></span>
						</td>
						<td></td>
						<td class="amount">/day</td>
						<td>{{adgroup.status}}</td>
						<td class="amount">{{adgroup.impr}}</td>
						<td class="amount">{{adgroup.clicks}}</td>
						<td class="amount">{{adgroup.ctr}}%</td>
						<td class="amount"><i class="fa fa-inr" aria-hidden="true"></i>{{adgroup.avg_cpc}}</td>
						<td class="amount"><i class="fa fa-inr" aria-hidden="true"></i>{{adgroup.avg_cpc}}</td>
						<td class="amount"><i class="fa fa-inr" aria-hidden="true"></i>{{adgroup.avg_cpc}}</td>
						<td class="amount"><i class="fa fa-inr" aria-hidden="true"></i>{{adgroup.avg_cpc}}</td>
						<td class="amount"><i class="fa fa-inr" aria-hidden="true"></i>{{adgroup.cost}}</td>
					</tr>						 
				</tbody>
			</table>
		</div>
	</div>
	
</template>

<script>
	import $ from 'jquery'
	import {mapActions, mapState} from 'vuex'

	require('datatables.net')
	require('datatables.net-bs')

export default {
	name: 'searchCampaign',
	data: function () {
		return {
			adgroups: [
				{
					_id: 1,
					name: 'trial adgroup',
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
					_id: 2,
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
					_id: 3,
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
		...mapActions('adwords/adgroup', ['getAll'])
	},
	computed: {
		...mapState('adwords/adgroup', ['items'])
	},
	mounted: function () {
		// this.$nextTick(function () {
		// 	$('#example').DataTable({
		// 		'paging': false
		// 	})
		// });
		var campaign_id = this.$route.query.campaign_id;
		if(campaign_id) this.getAll(campaign_id);
	},
	watch: {
		adgroups: {
			handler(adgroups) {
				for (let i = 0; i < adgroups.length; i++) {
					this.totalbudget = this.totalbudget + adgroups[i].budget.amount
				}
			}
		}
	}
}
</script>
<style lang="css">

	.search-adgroup {
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