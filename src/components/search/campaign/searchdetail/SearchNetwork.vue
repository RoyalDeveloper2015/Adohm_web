<template>
	<div>
	<search-detail class="campaign-panel"></search-detail>
		<div class="search-network">
			<div id="card" class="campaign-pannel">

			<!-- Title -->
				<div class="title-area">
					<span class="pannel-title">Goals</span>
				</div>

				<div class="items-area">
					<div>
						<span><input v-model="item.goals.enabled" type="checkbox"></span>
						<span class="beside-checkbox">Use Goals</span>
						<span class="pannel-title beside-checkbox">Select a campaign type
								<i class="fa fa-question-circle" aria-hidden="true"></i></span>
					</div>				

					<div class="allcard-height" v-if="item.goals.enabled">
						<div class="card-container">
							<div>
								<span class="card-title">Influence consideration
									<i class="fa fa-question-circle" aria-hidden="true"></i></span>
							</div>
							<div> 
								<div id="card" class="influence-card">						
									<div class="bottom-line"
										v-on:click="removeActive(); isVisit = !isVisit"
										v-bind:class="{activemenu: isVisit}">
										<span><i class="fa fa-television ic-padding" aria-hidden="true"></i>
													Visit your website</span>
									</div>														
								</div>
							</div>
						</div>
						<div class="card-container">
							<div>
								<span class="card-title">Drive Action
									<i class="fa fa-question-circle" aria-hidden="true"></i></span>
							</div>
							<div> 
								<div id="card" class="influence-card">							 
									<div class="bottom-line">
										<span><i class="fa fa-television ic-padding" aria-hidden="true"></i>
													Express interest on your site</span>
									</div>
									<div class="bottom-line">
										<span><i class="fa fa-credit-card ic-padding" aria-hidden="true"></i>
													Buy on your website</span>
									</div>
									<div class="bottom-line">
										<span><i class="fa fa-phone ic-padding" aria-hidden="true"></i>
													Call your business</span>
									</div>
									<div class="bottom-line disabled-text">
										<span><i class="fa fa-cc-paypal ic-padding" aria-hidden="true"></i>
													Visit your business</span>
									</div>					
								</div>
							</div>
						</div>						 
					</div>
				<!-- End Cards -->				
				</div>			
			</div>		
		</div>
		<div v-show="isVisit">
			<div id="card" class="campaign-pannel">
				<!-- left title -->
				<div class="title-area">
					<span class="pannel-title">Optional settings</span>
				</div>
				<!-- End left title -->
				<!-- Right div -->
				<div class="items-area">
					<div>						
						<span class="left-span"><i class="fa fa-link left-icon" aria-hidden="true"></i></span>
						<input id="url" type="url" name="url" class="bottom-line-input width-40" placeholder="Your business website">											 
					</div>
					<div class="margin-top-10">Enter a URL to see keyword ideas when you set up your ad groups.</div>
				</div>
				<!-- End Right div -->
			</div>
		</div>
		<div class="margin-top-30">
			<router-link to="/search/addcampaign/searchnetwork/detail" class="gmd gmd-1 gmd-blue margin-right-20">CONTINUE</router-link>
			<router-link to="" class="gmd gmd-1 gmd-white">CANCEL</router-link>
		</div>
	</div>

</template>
<script>
import SearchDetail from '../SearchDetail'
import {mapGetters, mapMutations} from 'vuex'

export default {
	name: 'SearchNetwork',
	components: {
		SearchDetail
	},
	data: function () {
		return {
			isVisit: false,
			isExpress: false,
			isBuy: false,
			isCall: false
		}
	},
	methods: {
		removeActive: function () {
			this.isVisit = false
			this.isExpress = false
			this.isBuy = false
			this.isCall = false
		}
	},
	computed: {
		...mapGetters('adwords/campaign', ['item'])
	}
}
</script>
<style>
	.search-network {
		display: inline-flex;
		width: 100%;
	}
	.campaign-pannel {
		width: 100%;
		padding: 20px 0px 20px 20px;
		display: inline-flex;
	}
	.title-area, .items-area, .influence-card {
		display: inline-block !important;
	}
	.beside-checkbox {
		vertical-align: top;
		margin-left: 10px;
		margin-right: 30px;
	}
	.title-area {
		width: 20%;
	}
	.items-area {
		width: 100%;
	}
	.ic-padding {
		margin-right: 4px;
	}
	.content-text {
		text-align: center;
	}
	.bottom-line {
		padding: 10px 15px;
		border-bottom: 1px solid rgba(0,0,0,0.3);
		cursor: pointer;
	}
	.bottom-line:hover {
		color: #ffffff;
		background-color: #1e72de;
	}
	.disabled-text {
		color: rgba(0,0,0,0.4);
	}
	.content-text span {
		font-size: smaller;
	}
	.pannel-title {
		padding: 0px 40px 0px 0px;
	}
	.allcard-height {
		display: flex;
	}
	.card-container {
		width: 25%;
		display: block;
		margin-top: 10px;
		margin-right: 20px;
	}
	.card-title {
		font-weight: bold;
	}
	.influence-card {
		margin: 10px 20px 0px 0px;
		background-color: rgba(0,0,0,0.04) !important;
		width: 100%;
		height: 250px;
		text-align: left;
	}
	
	/* effective button */
	.gmd-blue {
		background: #4285F4;
		color: #ffffff;
	}

	.gmd-blue:hover {
		color: #fff;
	}

	.gmd-white {
		background: #ffffff;
		color: #000000;
	}
	.gmd-white:hover {
		color: #000000;
	}
	.margin-top-30 {
		margin-top: 30px;
	}
	.margin-right-20 {
		margin-right: 20px;
	}
	.margin-top-10 {
		margin-top: 10px;
	}
	@media (max-width: 1350px){
		.allcard-height {
			display: inherit;
		}
		.card-item {
			width: 230px;
			height: 265px;
			float: left;
		}
		.left-icon {
			display: none;
		}
	}	
</style>

