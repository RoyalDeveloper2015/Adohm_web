import {request} from '@/config/default/request'

function getDataStructure() {
	return {
		item: {
			header: {
				language: null,
				type: null
			},
			values: [null, null, null],
			advanced: {}
		},
		details: {
			headerTypes: [
				'Brands',
				'Courses',
				'Degree programs',
				'Destinations',
				'Featured hotels',
				'Insurance coverage',
				'Models',
				'Neighborhoods',
				'Service catalog',
				'Shows',
				'Styles',
				'Types'
			]
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
