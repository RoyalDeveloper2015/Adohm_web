import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const baseUrl = 'http://localhost:3030'
const store = new Vuex.Store({
  state: {
    campaigns: [],
    newCampaign: {}
  },
  actions: {
    LOAD_CAMPAIGN_LIST: function ({commit}) {
      axios.get(`${baseUrl}/api/v1/campaign`).then((response) => (commit('SET_CAMPAIGN_LIST', {list: response.data}))
        , (err) => {
          console.log(err)
        })
    },
    ADD_NEW_CAMPAIGN: function ({commit}, x) {
      console.log('new campaign is ')
      console.log(x)
      axios.post(`${baseUrl}/api/v1/campaign`).then((response) => {
        commit('ADD_CAMPAIGN', {newCampaign: response.data})
      }, (err) => {
        console.log(err)
      })
    }
  },
  mutations: {
    SET_CAMPAIGN_LIST: (state, {list}) => {
      state.campaigns = list
    },
    ADD_CAMPAIGN: (state, {newCampaign}) => {
      state.campaigns.push(newCampaign)
      state.newCampaign = {}
    }
  }/*,
   getters: {
   campaigns: state => {
   return state.campaigns
   }
   } */
})
export default store
