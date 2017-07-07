import {request} from '@/config/adwords/request'
import {utils} from '@/components/Mixins'
import moment from 'moment'

function getDataStructure() {
	return {
		item: {
			name: null,
			channelType: null,
			// website: null,
			startDate: null,
			endDate: null,
			locations: {
				setting: null,
				targeted: [],
				excluded: []
			},
			languages: [],
			budget: {
				amount: null,
				sharedLibrary: null,
				deliveryMethod: 'Standard'
			},
			networkSetting:{	
				targetSearchNetwork: true,
				targetContentNetwork: true
			},
			bidStrategy: {
				type: 'targetCPA',
				data: { cpa: null }
			},
			siteLinkExtension: [
			],
			callOutExtension: {
			},
			callExtensions: [
			],
			structuredSnippetExtensions: {
				accountLevelCallOut: "accountLevelCallOut",
				campaignLevelCallOutExtension: [
				]
			},
			adRotation: "Rotate Evenly",
			adSchedule: [
			],
			locationOptions: {
				target: null,
				exclude: null
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
		var item = utils.clone(context.state.item);
		var bidStrategy = item.bidStrategy;
		item.bidStrategy = {[bidStrategy.type]: bidStrategy.data};
		item.startDate = moment(item.startDate).format('YYYYMMDD');
		item.endDate = moment(item.endDate).format('YYYYMMDD');
		delete item.goals;
		return request.post('/add_searchcampaign', item)
	},
	getAll(context) {
		return new Promise((resolve, reject) => {
			request.get('/get_campaigns').then(({data}) => {
				resolve(data);
			}).catch(reject);
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
