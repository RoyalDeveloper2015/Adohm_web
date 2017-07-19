import {request} from '@/config/default/request'
import campaign from './campaign'
import adgroup from './adgroup'
import ad from './ad'
import keywords from './keywords'

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
		adgroup: adgroup,
		ad: ad,
		keywords: keywords
	},
	state,
	getters,
	actions,
	mutations
};
