import {request} from '@/config/adwords/request'

function getDataStructure() {
	return {
		id: null,
		item: {
			type: null,
			adGroupId: null,
			adGroupName: null,
			campaignId: null,
			campaignName: null,
			keywords: [],
			isList: true,
			listIds: [],
			newList: false,
			newListName: null,
			existingId: null
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
};

const actions = {
	save({state, commit}, campaignId) {
		return new Promise((resolve, reject) => {
			var item = clone(state.item);
			item.keywords = item.keywords && item.keywords.split('\n');
			item.type = item.type && item.type[0].toUpperCase() + item.type.substr(1);
			request.post('/add_negativekeywords', item).then(({data}) => {
				if(data.success) {
					resolve(true)
				} else reject()
			});
		})
	},
	getAll({state, commit}, campaign_id) {
		return new Promise((resolve, reject) => {
			request.get('/get_negativekeywords' + campaign_id).then(({data}) => {
				commit('setItems', data);
				resolve(data);
			}).catch(reject)
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
