import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import session from './modules/session'
import user from './modules/user'

Vue.use(Vuex)
import campaignActions from './actions/campaignActions'
import advertiserActions from './actions/advertiserActions'
import countryActions from './actions/countriesActions'
import regionActions from './actions/regionActions'
import cityActions from './actions/cityActions'
import postalCodeActions from './actions/postalCodeActions'
import languageActions from './actions/languagesActions'
import connectionTypeActions from './actions/connectionTypesActions'
import mobileCarrierActions from './actions/mobileCarriersActions'
import platformTypeActions from './actions/platformTypeActions'
import operatingSystemActions from './actions/operatingSystemActions'
import browserActions from './actions/browserActions'
import adActions from './actions/adActions'
import adwords from './modules/adwords'

Vue.use(Vuex)
console.log(adwords);

const store = new Vuex.Store({
	modules: {
		session: session,
		user: user,
		adwords: adwords
	},
  state: {
    campaigns: [],
    newCampaign: {
      name: '',
      landingPageUrl: '',
      advertiserId: '',
      startDate: '',
      endDate: '',
      subaccountId: 1151202,
      targetName: '',
      country: [],
      region: [],
      city: [],
      postalCode: [],
      language: [],
      connectionType: [],
      mobileCarrier: [],
      platformType: [],
      browser: [],
      keywords: '',
      timeZone: '',
      days: [],
      hours: [],
      adId: 0,
      chooseExisting: 'true',
      adName: '',
      adType: 'Standard',
      adActive: true,
      adArchived: false,
      adSslRequired: false,
      adComments: '',
      adStartDate: '',
      adEndDate: '',
      adImpressionRatio: '',
      adPriority: '',
      adImpressions: '',
      adDuration: ''
    },
    advertisers: [],
    countries: [],
    regions: [],
    cities: [],
    postalCodes: [],
    languages: [],
    connectionTypes: [],
    mobileCarriers: [],
    platformTypes: [],
    operatingSystems: [],
    browsers: [],
    hours: [
      {id: 0, name: '12:00 AM - 12:59 AM'},
      {id: 1, name: '1:00 AM - 1:59 AM'},
      {id: 2, name: '2:00 AM - 2:59 AM'},
      {id: 3, name: '3:00 AM - 3:59 AM'},
      {id: 4, name: '4:00 AM - 4:59 AM'},
      {id: 5, name: '5:00 AM - 5:59 AM'},
      {id: 6, name: '6:00 AM - 6:59 AM'},
      {id: 7, name: '7:00 AM - 7:59 AM'},
      {id: 8, name: '8:00 AM - 8:59 AM'},
      {id: 9, name: '9:00 AM - 9:59 AM'},
      {id: 10, name: '10:00 AM - 10:59 AM'},
      {id: 11, name: '11:00 AM - 11:59 AM'},
      {id: 12, name: '12:00 PM - 12:59 PM'},
      {id: 13, name: '1:00 PM - 1:59 PM'},
      {id: 14, name: '2:00 PM - 2:59 PM'},
      {id: 15, name: '3:00 PM - 3:59 PM'},
      {id: 16, name: '4:00 PM - 4:59 PM'},
      {id: 17, name: '5:00 PM - 5:59 PM'},
      {id: 18, name: '6:00 PM - 6:59 PM'},
      {id: 19, name: '7:00 PM - 7:59 PM'},
      {id: 20, name: '8:00 PM - 8:59 PM'},
      {id: 21, name: '9:00 PM - 9:59 PM'},
      {id: 22, name: '10:00 PM - 10:59 PM'},
      {id: 23, name: '11:00 PM - 11:59 PM'}
    ],
    days: [
      {id: 'Sunday', name: 'Sunday'},
      {id: 'Monday', name: 'Monday'},
      {id: 'Tuesday', name: 'Tuesday'},
      {id: 'Wednesday', name: 'Wednesday'},
      {id: 'Thursday', name: 'Thursday'},
      {id: 'Friday', name: 'Friday'},
      {id: 'Saturday', name: 'Saturday'}
    ],
    ads: [],
    sitelink_extensions: [
      {
        text: 'aaaa',
        description_line_1: 'okadef',
        description_line_2: 'asdfdfd',
        final_url: 'www.example.com',
        mo_final_url: 'www.example.com',
        tracking_template: 'www.example.com',
        start_date: '',
        end_date: '',
        days_and_hours: []
      },
      {
        text: 'badffer',
        description_line_1: 'okadef',
        description_line_2: 'asdfdfd',
        final_url: 'www.example.com',
        mo_final_url: 'www.example.com',
        tracking_template: 'www.example.com',
        start_date: '',
        end_date: '',
        days_and_hours: []
      },
      {
        text: 'ytyttjghg',
        description_line_1: 'okadef',
        description_line_2: 'asdfdfd',
        final_url: 'www.example.com',
        mo_final_url: 'www.example.com',
        tracking_template: 'www.example.com',
        start_date: '',
        end_date: '',
        days_and_hours: []
      },
      {
        text: 'badfvbhtygddfer',
        description_line_1: 'okadef',
        description_line_2: 'asdfdfd',
        final_url: 'www.example.com',
        mo_final_url: 'www.example.com',
        tracking_template: 'www.example.com',
        start_date: '',
        end_date: '',
        days_and_hours: []
      }
    ]
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
    // postalCode actions
    LOAD_POSTAL_CODE_LIST: postalCodeActions.getAll,
    // language actions
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
    LOAD_BROWSER_LIST: browserActions.getAll,
    // ad actions
    LOAD_AD_LIST: adActions.getAll
  },
  mutations: {
    // campaigns
    SET_CAMPAIGN_LIST: (state, {list}) => {
      state.campaigns = list
    },
    ADD_CAMPAIGN: (state, {newCampaign}) => {
      state.campaigns.push(newCampaign)
      state.newCampaign = {
        name: '',
        landingPageUrl: '',
        advertiserId: '',
        startDate: '',
        endDate: '',
        subaccountId: 1151202,
        targetName: '',
        country: [],
        region: [],
        city: [],
        postalCode: [],
        language: [],
        connectionType: [],
        mobileCarrier: [],
        platformType: [],
        browser: [],
        keywords: '',
        timeZone: '',
        days: [],
        hours: [],
        adId: ''
      }
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
    // postalCode
    SET_POSTAL_CODE_LIST: (state, {list}) => {
      state.postalCodes = list
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
    },
    // ads
    SET_AD_LIST: (state, {list}) => {
      state.ads = list
    },
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
  }/*,
   getters: {
   campaigns: state => {
   return state.campaigns
   }
   } */
})
export default store
