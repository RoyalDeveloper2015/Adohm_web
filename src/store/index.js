import Vue from 'vue'
import Vuex from 'vuex'
import campaignActions from './actions/campaignActions'
import advertiserActions from './actions/advertiserActions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    campaigns: [],
    advertisers: [],
    newCampaign: {subaccount: '1151202'}
  },
  actions: {
    // campaign actions
    LOAD_CAMPAIGN_LIST: campaignActions.getAll,
    ADD_NEW_CAMPAIGN: campaignActions.add,
    // advertiser actions
    LOAD_ADVERTISER_LIST: advertiserActions.getAll
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
