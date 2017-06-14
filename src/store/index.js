import Vue from 'vue'
import Vuex from 'vuex'
import campaignActions from './actions/campaignActions'
import advertiserActions from './actions/advertiserActions'
import countryActions from './actions/countriesActions'
import regionActions from './actions/regionActions'
import cityActions from './actions/cityActions'
import languageActions from './actions/languagesActions'
import connectionTypeActions from './actions/connectionTypesActions'
import mobileCarrierActions from './actions/mobileCarriersActions'
import platformTypeActions from './actions/platformTypeActions'
import operatingSystemActions from './actions/operatingSystemActions'
import browserActions from './actions/browserActions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    campaigns: [],
    newCampaign: {subaccount: '1151202'},
    advertisers: [],
    countries: [],
    regions: [],
    cities: [],
    languages: [],
    connectionTypes: [],
    mobileCarriers: [],
    platformTypes: [],
    operatingSystems: [],
    browsers: []
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
    LOAD_CITY_LIST: cityActions.getAll,
    // city actions
    LOAD_LANGUAGE_LIST: languageActions.getAll,
    // connection type actions
    LOAD_CONNECTION_TYPE_LIST: connectionTypeActions.getAll,
    // mobile carrier actions
    LOAD_MOBILE_CARRIER_LIST: mobileCarrierActions.getAll,
    // platform type actions
    LOAD_PLATFORM_TYPE_LIST: platformTypeActions.getAll,
    // operating system actions
    LOAD_OPERATING_SYSTEM_LIST: operatingSystemActions.getAll,
    // browser actions
    LOAD_BROWSER_LIST: browserActions.getAll
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
    },
    // languages
    SET_LANGUAGE_LIST: (state, {list}) => {
      state.languages = list
    },
    // connectionTypes
    SET_CONNECTION_TYPE_LIST: (state, {list}) => {
      state.connectionTypes = list
    },
    // mobileCarriers
    SET_MOBILE_CARRIER_LIST: (state, {list}) => {
      state.mobileCarriers = list
    },
    // platform types
    SET_PLATFORM_TYPE_LIST: (state, {list}) => {
      state.platformTypes = list
    },
    // operating systems
    SET_OPERATING_SYSTEM_LIST: (state, {list}) => {
      state.operatingSystems = list
    },
    // browsers
    SET_BROWSER_LIST: (state, {list}) => {
      state.browsers = list
    }
  }/*,
   getters: {
   campaigns: state => {
   return state.campaigns
   }
   } */
})
export default store
