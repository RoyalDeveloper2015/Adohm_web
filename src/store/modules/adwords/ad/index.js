import {request} from '@/config/adwords/request'
import {utils} from '@/components/Mixins'
import Vue from 'vue'
function getDataStructure() {
	return {
		adType: 'text',
		id: null,
		text: {
			adGroupId: null,
			adGroupName: null,
			finalUrl: 'adohm.com',
			headline1: 'Headline 1',
			headline2: 'Headline 2',
			displayPath: {
				path1: null,
				path2: null
			},
			description: 'description'
		},
		callOnly: {
			// campaignId: null,
			adGroupId: null,
			businessName: 'Adohm',
			countryCode: 'IN',
			phoneNumber: '9686153659',
			description1: 'Description 1',
			description2: 'Description 2',
			displayUrl: 'adohm.com',
			verificationUrl: 'http://adohm.com',
			callreporting: true,
			// callconversion: true,
			// conversionId: null
		},
		details: {

		}
	};
}

const state = getDataStructure();

const getters = {
	adType: state => state.adType,
	text: state => state.text,
	callOnly: state => state.callOnly
};

const mutations = {
	clear: state => state = getDataStructure(),
	setAdType: (state, value) => state.adType = value,
	setAdGroupId: (state, value) => state.text.adGroupId = state.callOnly.adGroupId = value
};

const actions = {
	save({state, rootState}, adGroupId) {
		return new Promise((resolve, reject) => {
			var item = utils.clone(state[state.adType]);
			let adType = state.adType.toLowerCase();
			request.post(`/add_${adType}ads`, item).then(({data}) => {
				if(data.success) {
					resolve(true);
				} else reject();
			}).catch(reject);
		})
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
