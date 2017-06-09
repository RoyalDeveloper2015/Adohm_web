import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const baseUrl = 'http://localhost:3030' // 'http://13.228.2.2:4040'

const store = new Vuex.Store({
  state: {
    campaigns: [],
    advertisers: [],
    newCampaign: {}
  },
  actions: {
    // campaign actions
    LOAD_CAMPAIGN_LIST: function ({commit}) {
      axios.get(`${baseUrl}/api/v1/campaign`).then((response) => (commit('SET_CAMPAIGN_LIST', {list: response.data}))
        , (err) => {
          console.log(err)
        })
    },
    ADD_NEW_CAMPAIGN: function ({commit}, x) {
      axios.post(`${baseUrl}/api/v1/campaign`).then((response) => {
        commit('ADD_CAMPAIGN', {newCampaign: response.data})
      }, (err) => {
        console.log(err)
      })
    },
    // advertiser actions
    LOAD_ADVERTISER_LIST: function ({commit}) {
      console.log('load advertiser list')
      axios.get(`${baseUrl}/api/v1/advertiser`).then((response) => (commit('SET_ADVERTISER_LIST', {list: response.data}))
        , (err) => {
          console.log(err)
        })
    }
  },
  mutations: {
    // campaigns
    SET_CAMPAIGN_LIST: (state, {list}) => {
      state.campaigns = list
    },
    ADD_CAMPAIGN: (state, {newCampaign}) => {
      state.campaigns.push(newCampaign)
      state.newCampaign = {}
    },
    // advertiser
    SET_ADVERTISER_LIST: (state, {list}) => {
      state.advertisers = list
    }
  }/*,
   getters: {
   campaigns: state => {
   return state.campaigns
   }
   } */
})
export default store
