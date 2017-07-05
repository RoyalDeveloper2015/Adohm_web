import {request} from '@/config/adwords/request'

function getDataStructure() {
	return {
		item: {
			name: null,
			campaignId: null,
			defaultBid: null,
			keywords: null	
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
