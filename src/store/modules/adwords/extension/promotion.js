import {request} from '@/config/default/request'

function getDataStructure() {
	return {
		item: {
			occassion: null,
			promotionType: null,
			currency: null,
			itemName: null,
			finalUrl: null,
			promotionDetails: {
				type: null,
				value: null
			},
			startDate: null,
			endDate: null
		},
		details: {
			occassions: [
				'New Year\'s',
				'Valentine\'s Day',
				'Easter',
				'Mother\'s Day',
				'Father\'s Day',
				'Labor Day',
				'Back to school',
				'Halloween',
				'Black Friday',
				'Cyber Monday',
				'Christmas',
				'Boxing Day'
			],
			promotionTypes: [
				'Monetary discount',
				'Percent discount',
				'Up to monetary discount',
				'Up to percent discount'
			],
			promotionValueTypes: [
				
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
