import {request} from '@/config/adwords/request'

function getDataStructure() {
	return {
		item: {
			_id: null,
			advertiserId: null,
			name: null,
			campaignId: null,
			defaultBid: null,
			keywords: null	
		},
		items: [],
		details: {
		}
	};
}

const state = getDataStructure();

const getters = {
	item: state => state.item
};

const mutations = {
	clear: state => state.item = getDataStructure(),
	setItems: (state, items) => state.items = items
};

const actions = {
	save({state}) {
		var adgroup = clone(state.item);
		adgroup.keywords = adgroup.keywords && adgroup.keywords.split('\n') || [];
		request.post('/add_adgroup', adgroup).then(({data}) => {

		}).catch(console.error);
	},
	getAll({state}) {
		request.get('/get_adgroup').then(({data}) => {
			this.commit('setItems', data.result)
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
