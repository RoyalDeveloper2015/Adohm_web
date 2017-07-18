import {request} from '@/config/adwords/request'

function getDataStructure() {
	return {
		id: null,
		item: {
			advertiserId: null,
			adGroupName: "Adgroup " + Math.random(),
			campaignID: null,
			campaignName: null,
			defaultbid: 10,
			keywords: "keyword1,keyword2"
		},
		items: [],
		details: {
		}
	};
}

const state = getDataStructure();

const getters = {
	item: state => state.item,
	id: state => state.id
};

const mutations = {
	clear: state => state.item = getDataStructure(),
	setItems: (state, items) => state.items = items,
	setId: (state, id) => state.id = id
};

const actions = {
	save({state, commit}, campaignId) {
		return new Promise((resolve, reject) => {
			var adgroup = clone(state.items[0]);
			adgroup.keywords = adgroup.keywords && adgroup.keywords.split('\n') || [];
			adgroup.campaignID = campaignId
			debugger
			request.post('/add_adgroup', adgroup).then(({data}) => {
				if(data.success) {
					commit('setId', data.result);
					resolve(true)
				} else reject()
			});
		})
	},
	getAll({state, commit}, campaign_id) {
		request.get('/get_adgroup/' + campaign_id).then(({data}) => {
			commit('setItems', data)
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
