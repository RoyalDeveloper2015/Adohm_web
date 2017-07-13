import {request} from '@/config/default/request'

function getDataStructure() {
	return {
		item: {
			platform: null,
			appId: null,
			linkText: null,
			devicePreferences: {
				excludeTablets: false
			}
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
