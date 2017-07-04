<template>
	<!-- bidding -->
	<div id="card" class="detail-pannel margin-top-20">
		<div class="top-card">
			<div class="col-md-3">
				<span>Bidding</span>
			</div>
			<div class="col-md-5">
				<div class="trans-5">
					<div>
						<span>Select your bid strategy</span>
						<i aria-hidden="true" class="fa fa-question-circle"></i>
					</div>
					<div>
						<multi-select class="selectpicker margin-top-20"
								v-model="strategy"
								:options="biddatas"
								label="name" track-by="type"
								group-label="name"
								group-values="values"
								@input="empty = false; use_portfolio = false; use_existing_portfolio = false">
						</multi-select>
					</div>

					<!-- Anyone is not selected -->
					<div v-show="empty || strategy.type == 'manualCPC'">
						<div class="display-block margin-top-20">
							<label class="no-style vertical margin-left-10">
								<input v-model="data.enableEnhancedCPC" type="checkbox" class="margin-top-5">
								Enable Enhanced CPC
							</label>
							<i aria-hidden="true" class="fa fa-question-circle"></i>
						</div>
						<div class="display-block margin-top-5">
							<span>AdWords automatically adjusts your manual bids to try to maximize conversion</span>
						</div>
					</div>

					<!-- Target CPA is selected -->
					<div v-show="strategy.type == 'targetCPA'">
						<div v-show="use_portfolio">
							<div class="display-block margin-top-20">
								<label class="no-style">
									<input type="radio" name="cpa-portfolio"
											v-model="use_existing_portfolio"
											v-bind:value="true">
									Use existing portfolio strategy
								</label>
							</div>
							<div class="display-block margin-top-20">
								<label class="no-style">
									<input type="radio" name="cpa-portfolio"
										v-model="use_existing_portfolio"
										v-bind:value="false">
									Create new portfolio strategy
								</label>
							</div>
						</div>
						<div class="margin-top-20"
								v-bind:class="{'margin-left-25': use_portfolio}"
								v-show="!use_existing_portfolio">
							<div>							
								<span>Target CPA</span>						 
							</div>
							<div class="margin-top-10">						
								<span class="left-span"><i class="fa fa-inr left-icon" aria-hidden="true"></i></span>
								<input type="number" min="0" v-model="data.cpa" class="bottom-line-input width-40">								 
							</div>
							<div class="margin-top-20" v-show="use_portfolio"><span>Name</span></div>
							<div class="margin-top-10" v-show="use_portfolio">							 
								<input type="text" class="bottom-line-input width-40">																
							</div>
						</div>
						<div class="margin-top-20" v-show="!use_portfolio">
							<div class="blue cursor" v-on:click="use_portfolio = true">Use a portfolio strategy</div>
						</div>
						<div class="margin-top-20" v-show="use_portfolio">
							<div class="blue cursor"
								v-on:click="use_portfolio = false; use_existing_portfolio = false">Back to standard strategy</div>
						</div>								
					</div>

					<!-- Target ROAS -->
					<div v-show="strategy.type == 'targetROAS'">
						<div v-show="use_portfolio">
							<div class="display-block margin-top-20">
								<label class="no-style">
									<input type="radio" name="roas-portfolio"
											v-model="use_existing_portfolio"
											v-bind:value="true">
									Use existing portfolio strategy
								</label>
							</div>
							<div class="display-block margin-top-20">
								<label class="no-style">
									<input type="radio" name="roas-portfolio"
											v-model="use_existing_portfolio"
											v-bind:value="false">
									Create new portfolio strategy
								</label>
							</div>
						</div>
						<div class="margin-top-20"
								 v-bind:class="{'margin-left-25': use_portfolio}"
								 v-show="!use_existing_portfolio">
							<div>							
								<span>Target ROAS</span>						 
								<i aria-hidden="true" class="fa fa-question-circle"></i>
							</div>							
							<div class="margin-top-10">								
								<input type="text" min="0" v-model="data.roas" class="bottom-line-input width-40 margin-right-5-">
								<span class="border-bottom"><i class="fa fa-percent left-icon" aria-hidden="true"></i></span>
							</div>
							<div class="margin-top-20" v-show="use_portfolio"><span>Name</span></div>
							<div class="margin-top-10" v-show="use_portfolio">							 
								<input type="text" class="bottom-line-input width-40">																
							</div>
						</div>
						<div class="margin-top-20" v-show="!use_portfolio">
							<div class="blue cursor" v-on:click="use_portfolio = true">Use a portfolio strategy</div>
						</div>
						<div class="margin-top-20" v-show="use_portfolio">
							<div class="blue cursor"
								v-on:click="use_portfolio = false; use_existing_portfolio = false">Back to standard strategy</div>
						</div>								 
					</div>

					<!-- maximum clicks -->		
					<div v-show="strategy.type == 'maximizeClicks'">
						<div v-show="use_portfolio">
							<div class="margin-top-20">
								<label class="no-style">
									<input type="radio" name="maximize-portfolio"
											v-model="use_existing_portfolio"
											v-bind:value="true">
									Use existing portfolio strategy
								</label>
							</div>
							<div class="margin-top-20">
								<label class="no-style">
									<input type="radio" name="maximize-portfolio"
										v-model="use_existing_portfolio"
										v-bind:value="false">
									Create new portfolio strategy
								</label>
							</div>
						</div>
						<div class="margin-top-20"
								v-bind:class="{'margin-left-25': use_portfolio}"
								v-show="!use_existing_portfolio">
							<div>							
								<span>Maximize CPC bid limit(optional)</span>
								<i aria-hidden="true" class="fa fa-question-circle"></i>						 
							</div>
							<div class="margin-top-10">						
								<span class="left-span"><i class="fa fa-inr left-icon" aria-hidden="true"></i></span>
								<input type="text" v-model="data.maxCPC" class="bottom-line-input width-40">								 
							</div>
							<div class="margin-top-20" v-show="use_portfolio"><span>Name</span></div>
							<div class="margin-top-10" v-show="use_portfolio">							 
								<input type="text" class="bottom-line-input width-40">																
							</div>
							<div v-show="!use_portfolio">
								<div class="display-block margin-top-20">
									<label class="no-style vertical margin-left-10">
										<input v-model="data.enableEnhancedCPC" :value="true" type="checkbox" class="margin-top-5">
										Enable Enhanced CPC
									</label>
									<i aria-hidden="true" class="fa fa-question-circle"></i>
								</div>
								<div class="display-block margin-top-5">
									<span>AdWords automatically adjusts your manual bids to try to maximize conversion</span>
								</div>
							</div>
						</div>
						<div class="margin-top-20" v-show="!use_portfolio">
							<div class="blue cursor" v-on:click="use_portfolio = true">Use a portfolio strategy</div>
						</div>
						<div class="margin-top-20" v-show="use_portfolio">
							<div class="blue cursor"
								v-on:click="use_portfolio = false; use_existing_portfolio = false">Back to standard strategy</div>
						</div>										 
					</div>

					<!-- Target search page location -->
					<div v-show="strategy.type == 'targetSearchPageLocation'">
						<div>
							<div class="margin-top-20">
								<label class="no-style">
									<input type="radio" name="target-search-portfolio"
											v-model="use_existing_portfolio"
											v-bind:value="true">
									Use existing portfolio strategy
								</label>
							</div>
							<div class="margin-top-20">
								<label class="no-style">
									<input type="radio" name="target-search-portfolio"
											v-model="use_existing_portfolio"
											v-bind:value="false">
									Create new portfolio strategy
								</label>
							</div>
						</div>
						<div class="margin-top-20 margin-left-25"								 
								 v-show="!use_existing_portfolio">														
							<span>Where do you want your ads to appear?</span><br />										 
							<div class="margin-left-10 margin-top-20">
								<label class="no-style">
									<input v-model="data.location" value="top" type="radio" name="position" checked>										
									Top of the first results page
								</label>
							</div>
							<div class="margin-left-10 margin-top-20">
								<label class="no-style">
									<input v-model="data.location" value="any" type="radio" name="position">										
									Anywhare on the first results page
								</label>
							</div>
							<div class="margin-top-20" v-show="!use_existing_portfolio"><span>Name</span></div>
							<div class="margin-top-10" v-show="!use_existing_portfolio">							 
								<input type="text" class="bottom-line-input width-40">																
							</div>
						</div>								 
					</div>

					<!-- Target outranking share -->
					<div v-show="strategy.type == 'targetOutRankingShare'">
						<div>
							<div class="margin-top-20">
								<label class="no-style">
									<input type="radio" name="share-portfolio"
											v-model="use_existing_portfolio"
											v-bind:value="true">
									Use existing portfolio strategy
								</label>
							</div>
							<div class="margin-top-20">
								<label class="no-style">
									<input type="radio" name="share-portfolio"
											v-model="use_existing_portfolio"
											v-bind:value="false">
									Create new portfolio strategy
								</label>
							</div>
						</div>
						<div class="margin-top-20 margin-left-25"								 
								 v-show="!use_existing_portfolio">
							<div>							
								<span>Domain name to outrank</span>						 
								<i aria-hidden="true" class="fa fa-question-circle"></i>
							</div>							
							<div class="margin-top-10">								
								<input v-model="data.domainName" type="url" class="bottom-line-input width-40 margin-right-5-">								
							</div>
							<div class="margin-top-20">							
								<span>Target to outlank</span>						 
								<i aria-hidden="true" class="fa fa-question-circle"></i>
							</div>							
							<div class="margin-top-10">								
								<input v-model="data.targetPercentage" type="text" class="bottom-line-input width-40 margin-right-5-">
								<span class="border-bottom"><i class="fa fa-percent left-icon" aria-hidden="true"></i></span>
							</div>
							<div class="margin-top-20">							
								<span>Maximum bid limit</span>						 
								<i aria-hidden="true" class="fa fa-question-circle"></i>
							</div>							
							<div class="margin-top-10">
								<span class="left-span"><i class="fa fa-inr left-icon" aria-hidden="true"></i></span>							 
								<input v-model="data.maxBid" type="text" class="bottom-line-input width-40 margin-right-5-">								
							</div class="margin-top-20">
							<div class="margin-top-20"><span>Name</span></div>
							<div class="margin-top-10">							 
								<input type="text" class="bottom-line-input width-40">																
							</div>
						</div>														
					</div>

					<!-- Enhanced CPC -->
					<div v-show="strategy.type == 'enhancedCPC'">
						<div>
							<div class="margin-top-20">
								<label class="no-style">
									<input type="radio" name="enhanced-portfolio"
											v-model="use_existing_portfolio"
											v-bind:value="true">
									Use existing portfolio strategy
								</label>
							</div>
							<div class="margin-top-20">
								<label class="no-style">
									<input type="radio" name="enhanced-portfolio"
										v-model="use_existing_portfolio"
										v-bind:value="false">
									Create new portfolio strategy
								</label>
							</div>
						</div>
						<div class="margin-top-20 margin-left-25"								 
								 v-show="!use_existing_portfolio">
							<div class="margin-top-20"><span>Name</span></div>
							<div class="margin-top-10">							 
								<input type="text" name="enhanced" class="bottom-line-input width-40">																
							</div>
						</div>
					</div>

				</div>
			</div>

			<!-- notes -->
			<div class="col-md-4 row margin-right-0">
				<div class="col-md-10 padding-right-0 font-size-smaller">
					<div class="trans-5">
						<div class="margin-top-30 padding-left-10 left-border">

							<!-- Empty or Manual CPC -->
							<div v-show="empty || strategy.type == 'manualCPC'">
								<span>With Manual CPC bidding, you set your own maximum cost-per-click (CPC) for your ads</span>
							</div>

							<!-- Target CPA -->
							<div v-show="strategy.type == 'targetCPA'">
								<span>With Target CPA, Adwords automatically sets bids to 
									help get as many conversions as possible at the target cost-per-acquistion(CPA) you set. 
									Some conversions may cost more or less than your target.</span>
							</div>

							<!-- Target ROAS -->
							<div v-show="strategy.type == 'targetROAS'">
								<span>With Target ROAS, Adwords automatically sets bids to help get as much conver
										sion value as possible at the target return on ad spend(ROAS) you set. Some co
										versions may have a higher or lower return than your target.</span>
							</div>

							<!-- Maximize clicks -->
							<div v-show="strategy.type == 'maximizeClicks'">
								<div>
									<span>With Maximize clicks, Adwords automatically sets your bids to help get as 
											many clicks as possible within your budget.</span>
								</div>
								<div class="margin-top-20">
									<span>A maximum CPC bid limit caps each cost-per-click bid. This could limit the 
											clicks on your ad.</span>
								</div>
							</div>

							<!-- Maximize conversion -->
							<div v-show="strategy.type == 'maximizeConversions'">
								<span>AdWords automatically sets your bids to help you get the most conversions within your budget.</span>
							</div>

							<!-- Target search page location -->
							<div v-show="strategy.type == 'targetSearchPageLocation'">
								<span>With Target search page location, Adwords automatically sets your bids to 
										increase the chances that your ads appear at the top of the page or on the first 
										page of search results.</span>
							</div>

							<!-- Target outranking share -->
							<div v-show="strategy.type == 'targetOutRankingShare'">
								<span>With Target outranking share, you choose a domain you want to outrank in 
										search results and how often you want to outrank it, and Adwords automatically 
										sets your bids to help meet that target.</span>
							</div>

							<!-- Enhanced CPC -->
							<div v-show="strategy.type == 'enhancedCPC'">
								<span>Adwords automatically adjusts your manual bids to help maximize conversions.</span>
							</div>
							
							<div class="margin-top-20"
								v-show="!use_portfolio && !empty && (strategy.type == 'targetCPA' || strategy.type == 'targetROAS' || strategy.type == 'maximizeClicks')">
								<span>The strategy you select here will be applied to this campaign only.</span>
							</div>

							<div class="margin-top-20"
								v-show="use_portfolio || strategy.type == 'targetOutRankingShare' || strategy.type == 'targetSearchPageLocation' || strategy.type == 'enhancedCPC'">
								<span>A portfolio strategy groups together multiful campaigns, ad groups, 
									keywords into a single bid strategy</span>
							</div>
							
							<div class="margin-top-20" v-show="use_portfolio">								
								<span v-show="strategy.type == 'targetCPA' || strategy.type == 'targetROAS' || strategy.type == 'maximizeClicks'">
									To limit your bidding preferences to a single campaign, use a 
									standard strategy.</span>
							</div><br />
							<a class="blue">Learn more</a>
						</div>			 
					</div>
				</div>
				<div class="col-md-2 right padding-right-0">
					<i class="fa fa-angle-up trans ro-5 font-xlarge"
						v-on:click="expand('trans-5', 'ro-5')"></i>
				</div>
			</div>				
		</div>
	</div>
</template>
<script>
	import $ from 'jquery'
	import MultiSelect from 'vue-multiselect'
	import Vue from 'vue'
	
	export default {
		name: 'Bidding',
		components: {MultiSelect},
		props: ['value'],
		data: function () {
			return {
				empty: true,
				use_portfolio: false,
				use_existing_portfolio: false,
				biddatas: [
					{
						name: 'Automated bid strategies',
						values: [
							{type: 'targetCPA', name: 'Target CPA'},
							{type: 'targetROAS', name: 'Target ROAS'},
							{type: 'maximizeClicks', name: 'Maximize clicks'},
							{type: 'maximizeConversions', name: 'Maximize conversions'},
							{type: 'targetSearchPageLocation', name: 'Target search page location'},
							{type: 'targetOutRankingShare', name: 'Target outranking share'},
							{type: 'enhancedCPC', name: 'Enhanced CPC'}
						]
					},
					{
						name: 'Manual Bid Strategies',
						values: [
							{type: 'manualCPC', name: 'Manual CPC'}
						]
					}
				],
				strategy: {
					type: null
				},
				data: {},
				strategies: {
					targetCPA: {
						cpa: null
					},
					targetROAS: {
						roas: null
					},
					maximizeClicks: {
						maxCPC: null,
						enableEnhancedCPC: true
					},
					maximizeConversions: {},
					targetSearchPageLocation: {
						location: null,
						name: null
					},
					targetOutRankingShare: {
						domainName: null,
						targetPercentage: null,
						maxBid: null,
						name: null
					},
					enhancedCPC: {
						name: null
					},
					manualCPC: {
						enableEnhancedCPC: true
					}
				}
			}
		},
		methods: {
			expand: function (tar1, tar2) {
				$('.' + tar1).slideToggle()
				$('.' + tar2).toggleClass('rotate')
			}
		},
		mounted() {
			debugger
			Vue.set(this.strategy, 'type', this.value.type);
			Vue.set(this, 'data', this.value.data);
		},
		watch: {
			'strategy.type': {
				handler(type) {
					Vue.set(this, 'data', this.strategies[type]);
					this.$emit('update:value', {type: type, data: this.data})
				}
			},
			'data': {
				deep: true,
				handler(data) {
					this.$emit('update:value', {type: this.strategy.type, data: data})
				}
			}
		}
	}
</script>
<style lang="css">
	.cursor {
		cursor: pointer;
	}
	.margin-right-5- {
		margin-right: -5px;
	}
	.border-bottom {
		border-bottom: 1px solid rgba(0,0,0,0.3);
	}
	.font-size-smaller {
		font-size: smaller;
	}
</style>
