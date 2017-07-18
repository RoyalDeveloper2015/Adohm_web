<template>
	<div class="search-campaign">
		<nav class="navbar bg-white box-shadow sub-nav">
			<ul class="nav subnav active-bottom">Campaigns</ul>
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
			<table id="example" class="display table table-striped" cellspacing="0">
				<thead>
					<tr>
						<th>
							<input type="checkbox" value="">
						</th>
						<th><i class="fa fa-circle black"></i></th>
						<th>Campaign</th>
						<th>Client account</th>
						<th>budget</th>
						<th>status</th>
						<th>Impr.</th>
						<th>Clicks</th>			
						<th>CTR</th>
						<th>Avg.CPC</th>
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
					<tr class="content-row" v-for="campaign in items">
						<td>
							<input type="checkbox" value=""> 
						</td>
						<td>
							<div class="btn-group">
								<div class="btn btn-xs dropdown-toggle" data-toggle="dropdown">
									<i class="fa fa-circle green" v-if="campaign.status==='Eligible'"></i>
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
							<router-link :to="'/search/adgroups/?campaign_id=' + campaign.id"> {{campaign.name}} </router-link> &nbsp;
							<span class="fa fa-pencil"></span>
						</td>
						<td>{{campaign.client_account_name}}</td>
						 <td class="amount">{{campaign.budgetdeliveryMethod}}<br /><i class="fa fa-inr" aria-hidden="true"></i>{{campaign.budgetamount}}/day</td> 
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
	import {mapActions, mapState} from 'vuex'

	require('datatables.net')
	require('datatables.net-bs')

export default {
	name: 'searchCampaign',
	data: function () {
		return {
			campaigns: [
			  {
				"name": "Campaign #173",
				"channelType": "Search",
				"startDate": "2017-10-26T20:02:57.315Z",
				"endDate": "2018-07-11T04:29:18.081Z",
				"locations": {
					"setting": "all",
					"targeted": [
						67123097,
						4687351,
						58310731,
						43914574
					],
					"excluded": [
						47271249,
						67446473
					]
				},
				"languages": [
					29248543,
					37963776,
					60838095,
					13829766
				],
				"budget": {
					"amount": 38842,
					"deliveryMethod": "Accelerated"
				},
				"networkSetting": {
					"targetSearchNetwork": true,
					"targetContentNetwork": false
				},
				"bidStrategy": {
					"type": "targetROAS",
					"data": {}
				},
				"extensions": {},
				"goals": {
					"enabled": true
				}
				},
				{
					"name": "Campaign #889",
					"channelType": "Display",
					"startDate": "2017-10-16T08:16:40.316Z",
					"endDate": "2017-10-27T18:02:42.917Z",
					"locations": {
						"setting": "custom",
						"targeted": [
							70647924,
							89070503,
							85600469
						],
						"excluded": [
							50554059,
							33860590,
							91302977,
							39859507
						]
					},
					"languages": [
						72502779,
						68815447
					],
					"budget": {
						"amount": 85952,
						"deliveryMethod": "Accelerated"
					},
					"networkSetting": {
						"targetSearchNetwork": false,
						"targetContentNetwork": true
					},
					"bidStrategy": {
						"type": "targetOutRankingShare",
						"data": {}
					},
					"extensions": {
						"sitelink": [
							-69163326.96327144,
							68828075.18708113,
							-49131911.08142487,
							27631602.618042454
						],
						"promotion": [
							82171085.042175,
							-37931969.74930031,
							4456162.065973863
						],
						"app": [
							-54755915.44152092,
							13742316.172068492
						]
					},
					"goals": {
						"enabled": true
					}
				},
				{
					"name": "Campaign #15",
					"channelType": "Display",
					"startDate": "2018-07-13T07:42:24.475Z",
					"endDate": "2017-11-11T01:16:13.869Z",
					"locations": {
						"setting": "custom",
						"targeted": [
							31652609
						],
						"excluded": [
							12814881,
							58496299
						]
					},
					"languages": [
						71428107,
						25434266,
						80421246
					],
					"budget": {
						"amount": 23658,
						"deliveryMethod": "Standard"
					},
					"networkSetting": {
						"targetSearchNetwork": true,
						"targetContentNetwork": true
					},
					"bidStrategy": {
						"type": "maximizeCliks",
						"data": {}
					},
					"extensions": {},
					"goals": {
						"enabled": true
					}
				}
			],
			totalbudget: 0
		}
	},
	methods: {
		...mapActions('adwords/campaign', ['getAll'])
	},
	mounted: function () {
		// this.$nextTick(function () {
		// 	$('#example').DataTable({
		// 		'paging': false
		// 	})
		// });
		this.getAll().then(campaigns => {
			// Vue.set(this, 'campaigns', campaigns);
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
	},
	computed: {
		...mapState('adwords/campaign', ['items'])
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

	.table .fa-pencil {
		display: none;
	}
	.table tr:hover .fa-pencil {
		display: inline-block;
	}
</style>