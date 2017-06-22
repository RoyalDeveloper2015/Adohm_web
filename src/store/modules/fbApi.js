import axios from 'axios'

var baseURL = 'http://localhost:3000'

var request = axios.create({
  baseURL
});

const state = {
	fbApi: {
		baseUrl: null,
		accessToken: null,
		account: null
	}
}

const actions = {
	load(context) {
		request.get('/api/users/me').then(response => {
			context.commit('set', response.result);
		});
	}
}

const mutations = {
	set(state, data) {
		state.fbApi = data;
	}
}

export default {
	namespaced: true,
	state,
	actions,
	mutations
}

