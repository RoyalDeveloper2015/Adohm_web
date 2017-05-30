import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const baseUrl = 'http://localhost:3030'
const store = new Vuex.Store({
  state: {
    campaigns: []
  },
  actions: {
    LOAD_PROJECT_LIST: function ({commit}) {
      axios.get(`${baseUrl}/api/v1/campaign`).then((response) => {
        console.log(response.data)
        commit('SET_CAMPAIGN_LIST', {list: response.data})
      }, (err) => {
        console.log(err)
      })
    }
  },
  mutations: {
    SET_CAMPAIGN_LIST: (state, {list}) => {
      state.campaigns = list
    }
  },
  getters: {
    openCampaigns: state => {
      return state.campaigns.filter(campaign => !campaign.completed)
    }
  }
})
export default store
