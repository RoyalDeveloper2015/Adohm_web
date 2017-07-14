import {request} from '@/config/default/request'

function getDataStructure() {
	return {
		adType: 'textAd',
		item: {},
		textAd: {
			id: null,
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
			id: null,
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
	item: state => state.item,
	adType: state => state.adType,
	textAd: state => state.textAd,
	callOnlyAd: state => state.callOnlyAd
};

const mutations = {
	clear: state => state.item = getDataStructure(),
	setupAdParams: state => state.item = state[state.adType]
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
