import {request} from '@/config/default/request'

function getDataStructure() {
	return {
		item: {
			reviewText: null,
			source: null,
			sourceUrl: null,
			format: null // Paraphrased or ExtraQuote
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
