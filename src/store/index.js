import Vue from 'vue'
import Vuex from 'vuex'
import campaignActions from './actions/campaignActions'
import advertiserActions from './actions/advertiserActions'
import countryActions from './actions/countriesActions'
import regionActions from './actions/regionActions'
import cityActions from './actions/cityActions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    campaigns: [],
    newCampaign: {subaccount: '1151202'},
    advertisers: [],
    countries: [],
    regions: [],
    cities: []
  },
  actions: {
    // campaign actions
    LOAD_CAMPAIGN_LIST: campaignActions.getAll,
    ADD_NEW_CAMPAIGN: campaignActions.add,
    // advertiser actions
    LOAD_ADVERTISER_LIST: advertiserActions.getAll,
    // country actions
    LOAD_COUNTRY_LIST: countryActions.getAll,
    // region actions
    LOAD_REGION_LIST: regionActions.getAll,
    // city actions
    LOAD_CITY_LIST: cityActions.getAll
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
    // advertisers
    SET_ADVERTISER_LIST: (state, {list}) => {
      state.advertisers = list
    },
    // countries
    SET_COUNTRY_LIST: (state, {list}) => {
      state.countries = list
    },
    // region
    SET_REGION_LIST: (state, {list}) => {
      state.regions = list
    },
    // city
    SET_CITY_LIST: (state, {list}) => {
      state.cities = list
    }
  }/*,
   getters: {
   campaigns: state => {
   return state.campaigns
   }
   } */
})
export default store
