import {request} from '@/config/adwords/request'
import {utils} from '@/components/Mixins'
import moment from 'moment'

function getDataStructure() {
	return {
		items: [],
		id: null,
		item: {
			campaignName: "Campaign " + Math.random(),
			channelType: "Search",
			// businessWebsite: null,
			// country: null,
			// phoneNumber: null,
			startDate: '2017-08-20',
			endDate: '2017-08-30',
			locations: {
				setting: "Home",
				targeted: {countryids:[]},
				excluded: {countryids:[]}
			},
			languages: [],
			amount: {
				budget: 1200,
				// sharedLibrary: null,
				deliveryMethod: 'Standard'
			},
			networkSetting:{	
				targetSearchNetwork: true,
				targetContentNetwork: true
			},
			bidStrategy: {
				type: 'manualCPC',
				data: { enableEnhancedCPC: true }
			},
			extensions: {
				sitelink: [],
				callout: {
					accountLevelCallOut: true,
					campaignLevelCallOutExtension: []
				},
				call: [],
				structuredSnippet: [],
				review: [],
				message: [],
				promotion: [],
				app: []
			},
			adRotation: null,
			adSchedule: [],
			locationOptions: {
				target: null,
				exclude: null
			},
			goals: {
				enabled: false,
				influenceConsiderations: [],
				driveActions: []
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
	item: state => state.item,
	id: state => state.id
};

const mutations = {
	clear: state => state.item = getDataStructure(),
	setAdvertisingChannelType: (state, type) => state.item.advertisingChannelType = type,
	addItem: (state, item) => state.items.push(item),
	setItems: (state, items) => state.items = items,
	setId: (state, id) => state.id = id
};

const actions = {
	save({state, commit}, payload) {
		return new Promise((resolve, reject) => {

			var item = utils.clone(state.item);
			// context.commit('addItem', item);
			var bidStrategy = item.bidStrategy;
			item.bidStrategy = {[bidStrategy.type]: bidStrategy.data};
			item.startDate = moment(item.startDate).format('YYYYMMDD');
			item.endDate = moment(item.endDate).format('YYYYMMDD');
			delete item.goals;
			request.post('/add_searchcampaign', item).then(({data}) => {
				debugger
				if(data.success) {
					commit('setId',data.result);
					resolve(true);
				} else reject("Failed to create campaign");
			}).catch(reject);
		})
	},
	getAll(context) {
		return new Promise((resolve, reject) => {
			request.get('/get_campaigns').then(({data}) => {
				context.commit('setItems', data);
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
