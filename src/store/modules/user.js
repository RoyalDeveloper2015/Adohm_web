import axios from 'axios'

var baseURL = 'http://localhost:3000'

var request = axios.create({
  baseURL,
  withCredentials: true
});

const state = {
	user: {
		_id: null,
		login: null,
		name: null,
		options: {
			facebook: null
		}
	}
}
const getters = {
	user: state => state.user
}
const actions = {
	load(context) {
		return new Promise((resolve, reject) => {
			request.get('/api/users/me').then(response => {
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
	}
}

const mutations = {
	set(state, data) {
		state.user = data;
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}

