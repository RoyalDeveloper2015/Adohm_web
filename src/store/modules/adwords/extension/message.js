import {request} from '@/config/default/request'

function getDataStructure() {
	return {
		item: {
			countryCode: null,
			phoneNumber: null,
			extensionText:  null,
			businessName: null,
			message: null
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
