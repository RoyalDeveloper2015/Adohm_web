<template>
	<div class="search-content">
		<div class="bg-white sub-side">
			<div class="sidebar-content">
				<div class="section submenu">

					<li class="item" :class="{activemenu: $route.name == 'Overview'}">
						<router-link class="item-link" :class="{deactivelink: $route.name == 'Overview'}"
							to="/search/overview">
							<span>Overview</span>
						</router-link>
					</li>
					<li class="item" :class="{activemenu: $route.name == 'Opportunities'}">
						<router-link class="item-link" :class="{deactivelink: $route.name == 'Opportunities'}"
							to="/search/opportunities">
							<span>Opportunities</span>
						</router-link>
					</li>
					<li><hr /></li>
					
					<template v-if="menuEnabled('Campaigns')">  
						<li class="item" :class="{activemenu: $route.name == 'SearchCampaign'}">
							<router-link class="item-link" :class="{deactivelink: $route.name == 'SearchCampaign'}"
								to="/search/campaigns">
								<span>Campaigns</span>
							</router-link>
						</li>
					</template>

					<template v-if="menuEnabled('AdGroups')">  
						<li class="item" :class="{activemenu: $route.name == 'AdGroups'}">
							<router-link class="item-link" :class="{deactivelink: $route.name == 'AdGroups'}"
								to="/search/adgroups">
								<span>Ad Groups</span>
							</router-link>
						</li>
						<li><hr/></li>
					</template>

					<li class="item" :class="{activemenu: $route.name == 'Ads'}">
						<router-link class="item-link" :class="{deactivelink: $route.name == 'Ads'}"
							to="/search/ads">
							<span>Ads & Extensions</span>
						</router-link>
					</li>
					<li><hr/></li>

					<li class="item" :class="{activemenu: $route.name == 'Keywords'}">
						<router-link class="item-link" :class="{deactivelink: $route.name == 'Keywords'}"
							to="/search/keywords">
							<span>Keywords</span>
						</router-link>
					</li>
					
					<template v-if="menuEnabled('DynamicAdTargets')">  
						<li class="item" :class="{activemenu: $route.name == 'DynamicAdTargets'}">
							<router-link class="item-link" :class="{deactivelink: $route.name == 'DynamicAdTargets'}"
								to="/search/dynamicAdTargets">
								<span>Dynamic Ad Targets</span>
							</router-link>
						</li>
					</template>

					<li class="item">Audiences</li>

					<li class="item" :class="{activemenu: $route.name == 'Demographics'}">
						<router-link class="item-link" :class="{deactivelink: $route.name == 'Demographics'}"
							to="/search/demographics">
							<span>Demographics</span>
						</router-link>
					</li>
					<li><hr /></li>

						<li class="item" :class="{activemenu: $route.name == 'Settings'}">
							<router-link class="item-link" :class="{deactivelink: $route.name == 'Settings'}"
								to="/search/campaigns/settings">
								<span>Settings</span>
							</router-link>
						</li>

					<template v-if="menuEnabled('Locations')">  
						<li class="item" :class="{activemenu: $route.name == 'Locations'}">
							<router-link class="item-link" :class="{deactivelink: $route.name == 'Locations'}"
								to="/search/locations">
								<span>Locations</span>
							</router-link>
						</li>
					</template>

					<template v-if="menuEnabled('AdSchedule')">  
						<li class="item" :class="{activemenu: $route.name == 'AdSchedule'}">
							<router-link class="item-link" :class="{deactivelink: $route.name == 'AdSchedule'}"
								to="/search/adschedules">
								<span>Ad schedules</span>
							</router-link>
						</li>
					</template>

					<li class="item" :class="{activemenu: $route.name == 'Devices'}">
						<router-link class="item-link" :class="{deactivelink: $route.name == 'Devices'}"
							to="/search/devices">
							<span>Devices</span>
						</router-link>
					</li>

					<li class="item" :class="{activemenu: $route.name == 'AdvancedBidAdjustment'}">
						<router-link class="item-link" :class="{deactivelink: $route.name == 'AdvancedBidAdjustment'}"
							to="/search/bidAdjustment">
							<span>Advanced Bid Adjustment</span>
						</router-link>
					</li>
					<li><hr /></li>

					<li class="item" :class="{activemenu: $route.name == 'ChangeHisory'}">
						<router-link class="item-link" :class="{deactivelink: $route.name == 'ChangeHisory'}"
							to="/search/changeHistory">
							<span>Change Hisory</span>
						</router-link>
					</li>
				</div>
			</div>			
		</div>
		<router-view></router-view>
	</div>		
</template>
<script>
	export default {
		name: 'search',
		data: () => ({
			disabledMenus: {
				campaign: ['Campaigns', 'Videos', 'DynamicAdTargets', 'Topics', 'Placements'],
				adgroup: ['Campaigns', 'Videos', 'DynamicAdTargets', 'Topics', 'Placements', 'AdGroups', 'Locations', 'AdSchedule']
			}
		}),
		methods: {
			menuEnabled(name) {
				if(this.$route.query.campaign_id && this.disabledMenus.campaign.includes(name)) return false; 
				if(this.$route.query.adgroup_id && this.disabledMenus.adgroup.includes(name)) return false; 
				return true
			}
		}
	}
</script>
<style type="text/css">
	.sub-side {
		width: 170px;
		border-width:
		1px; border-color: #000;
		display: inline-block;
	}
	.search-content {
		display: inline-flex;
		width: 100%;
	}
	.submenu {
		padding: 20px	0px 20px 0px;
		border-width: 1px;
		border-style: ridge;
		border-color: #cccccc;
		font-size: small;
		overflow-y: auto;
		max-height: 100vh;
		transition: visibility 0s 2s, opacity 2s linear;
	}

	.submenu::-webkit-scrollbar {
		width: 8px;
	}

	.submenu::-webkit-scrollbar-track {
		box-shadow: none;
	}

	.submenu::-webkit-scrollbar-thumb {
		background: rgba(30, 30, 30, 0.8);
		box-shadow: none;
		border-radius: 5px;
	}

	.submenu::-webkit-scrollbar-thumb:window-inactive {
		background: rgba(210, 210, 210, 0.4);
	}

	.submenu .item {
		padding: 10px 30px 10px 30px;
	}

	.submenu li {
		list-style: none;
	}

	.submenu .item:hover {
		background-color: #1e72de;
		color: #ffffff;
	}

	.submenu ul {
		border-bottom-width: 1px;
		border-bottom-style: ridge;
		border-bottom-color: #cccccc;
		padding: 5px 20px 5px 20px;
		margin-bottom: 0px;
	}
	.activemenu {
		background-color: #1e72de;
		color: #ffffff !important;	 
	}
	.deactivelink {
		color: #ffffff !important;
	}

/** Moved **/

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
</style>

	