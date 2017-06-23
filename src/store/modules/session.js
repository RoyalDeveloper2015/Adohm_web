import {request} from '@/config/default/request'

const state = {
	user: {
		_id: null,
		login: null,
		name: null,
		role: null
	},
	fbApi: {},
	messages: []
}
const getters = {
	user: state => state.user,
	fbApi: state => state.fbApi,
	messages: state => state.messages
}
const actions = {
	load(context) {
		return new Promise((resolve, reject) => {
			request.get('/api/session').then(response => {
				context.commit('set', response.data.result);
				resolve();
			}).catch(() => {
				reject();
			})
		});
	},
	login(context, data) {
		request.post('/login', data).then(response => {
			if(response.data.success) context.dispatch('load');
		}).catch(error => {
			console.error(error);
		})
	},
	logout({commit}) {
		request.get('/logout').then(response => {
			if(response.data.success) commit('logout');
		})
	}
}

const mutations = {
	set(state, data) {
		for(let i in data) state[i] = data[i];
	},
	logout(state) {
		state.user = {};
	},
	message(state, message, type) {
		state.messages.push({message, type});
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}

