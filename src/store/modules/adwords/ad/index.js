import {request} from '@/config/adwords/request'
import {utils} from '@/components/Mixins'
function getDataStructure() {
	return {
		adType: 'text',
		item: {},
		id: null,
		text: {
			adGroupId: null,
			adGroupName: null,
			finalUrl: 'http://adohm.com',
			headline1: 'Headline',
			headline2: null,
			displayPath: {
				path1: null,
				path2: null
			},
			description: 'description'
		},
		callOnly: {
			id: null,
			campaignId: null,
			adGroupId: null,
			bussinessName: null,
			country: null,
			phoneNumber: null,
			description1: null,
			description2: null,
			displayUrl: null,
			verificationUrl: null,
			trackCalls: true,
			countConversions: true,
			conversionId: null
		},
		details: {

		}
	};
}

const state = getDataStructure();

const getters = {
	item: state => state.item,
	adType: state => state.adType,
	text: state => state.text,
	callOnly: state => state.callOnly
};

const mutations = {
	clear: state => state.item = getDataStructure(),
	setupAdParams: state => state.item = state[state.adType],
	adType: (state, value) => state.adType = value
};

const actions = {
	save({state}, adGroupId) {
		return new Promise((resolve, reject) => {
			var item = utils.clone(state.item);
			item.adGroupId = adGroupId
			request.post('/add_textads', item).then(({data}) => {
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
