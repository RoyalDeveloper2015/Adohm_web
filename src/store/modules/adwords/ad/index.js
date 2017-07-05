import {request} from '@/config/default/request'

function getDataStructure() {
	return {
		item: {
			id: null,
			campaignId: null,
			adGroupId: null,
			campaignName: null,
			adGroupName: null,
			finalUrl: null,
			headline1: null,
			headline2: null,
			displayPath: {
				path1: null,
				path2: null
			},
			description: null
		},
		details: {

		}
	};
}

const state = getDataStructure();

const getters = {
	item: state => state.item
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
