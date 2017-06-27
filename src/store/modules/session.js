import {request} from '@/config/default/request'

const getState = () => ({
	user: {
		_id: null,
		login: null,
		name: null,
		role: {}
	},
	fbApi: {},
	currency: [],
	messages: []
})

const getters = {
	user: state => state.user,
	fbApi: state => state.fbApi,
	fbAccount: state => state.user.options.facebook.account,
	currency: state => state.currency,
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
			if(response.data.success) location.href="/"
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
		for(let i in data) {
			switch(i) {
				case 'currency': {
					for(let j in data[i]) {
						state.currency.push({name: j, symbol: data[i][j]});
					}
				}
				break;
				default: 
					state[i] = data[i];
			}

		}
	},
	logout(state) {
		state.user = getState().user;
		console.log(state)
	},
	message(state, data) {
		state.messages.push(data);
	}
}

export default {
	namespaced: true,
	state: getState(),
	getters,
	actions,
	mutations
}

