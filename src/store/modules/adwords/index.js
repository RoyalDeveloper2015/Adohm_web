import {request} from '@/config/default/request'
import campaign from './campaign'
import adgroup from './adgroup'
import ad from './ad'

function getDataStructure() {
	return {

	}
}

const state = getDataStructure();

const getters = {

};

const mutations = {

};


const actions = {
	
};

export default {
	namespaced: true,
	modules: {
		campaign: campaign,
		adgroup,
		ad
	},
	state,
	getters,
	actions,
	mutations
};
