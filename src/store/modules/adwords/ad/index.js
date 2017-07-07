import {request} from '@/config/default/request'

function getDataStructure() {
	return {
		adType: 'textAd',
		textAd: {
			campaignId: null,
			adGroupId: null,
			finalUrl: null,
			headline1: null,
			headline2: null,
			displayPath: {
				path1: null,
				path2: null
			},
			description: null
		},
		callOnlyAd: {
			campaignId: null,
			adGroupId: null,
			bussinessName: null,
			countryCode: null,
			phoneNumber: null,
			description1: null,
			description2: null,
			displayUrl: null,
			verificationUrl: null
		},
		details: {

		}
	};
}

const state = getDataStructure();

const getters = {
	item: state => state[state.adType]
};

const mutations = {
	clear: state => state.item = getDataStructure()
};

const actions = {
	save(context) {

	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
