import {request} from '@/config/default/request'

const state = {
	user: {
		_id: null,
		login: null,
		name: null,
		role: null,
		options: {
			facebook: {
				account: {}
			}
		}
	}
}

const getters = {
	user: state => state.user,
	fbAccount: state => state.user.options.facebook.account
}

const mutations = {
	setUser(state, user) {
		state.user = Object.assign(state.user, user);
	},
	setFBAccount(state, account) {
		state.user.options.facebook.account = account
	},
	removeFBAccount(state) {
		state.user.options.facebook.account = {};
	}
}

const actions = {
	saveOptions(context) {
		return request.post('/api/users/me', {options: context.state.user.options});
	},
	load(context) {
		return new Promise((resolve, reject) => {
			request.get('/api/users/me').then( ({data}) => {
				if(data.success) {
					context.commit('setUser', data.result);
					resolve();
				} else reject(data.result);
			}).catch(reject);
		})
	}
}

export default {
	namespaced: true,
	getters,
	actions,
	mutations,
	state
}