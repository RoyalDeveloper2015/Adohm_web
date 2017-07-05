import {request} from '@/config/adwords/request'

function getDataStructure() {
	return {
		item: {
			name: null,
			channelType: 'SEARCH',
			// website: null,
			startDate: null,
			endDate: null,
			location: {
				setting: null,
				targeted: [],
				excluded: []
			},
			languages: [],
			dailyBudget: {
				amount: 0,
				// sharedLibrary: "CampaignNAme,Amount",
				deliveryMethod: 'standard'
			},
			networkSetting:{	
				targetSearchNetwork: true,
				targetContentNetwork: true
			},
			biddingStrategy: {
				type: 'targetCPA',
				data: { cpa: null }
			},
			goals: {
				enabled: false
			}
		},
		details: {
			biddingStrategies: {
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
				maximizeConversions: null,
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
					name: "name"
				},
				manualCPC: {
					enableEnhancedCPC: true
				}
			}
		}
	};
}

const state = getDataStructure();

const getters = {
	item: state => state.item
};

const mutations = {
	clear: state => state.item = getDataStructure(),
	setAdvertisingChannelType: (state, type) => state.item.advertisingChannelType = type
};

const actions = {
	save(context, payload) {
		debugger
		return request.post('/add_searchcampaign', context.state.item)
			.then(({data}) => {

			});
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
