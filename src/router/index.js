import Vue from 'vue'
import Router from 'vue-router'

import MainPage from '../components/MainPage.vue'
import CampaignList from '../components/campaign/CampaignList.vue'
import AddCampaign from '../components/campaign/AddCampaign.vue'

import Advertisers from '../components/pages/Advertisers.vue'
import Users from '../components/pages/Users.vue'
import UserSettings from '../components/pages/user/Settings.vue'
import Performance from '../components/pages/social/Performance.vue'
import Overview from '../components/pages/social/Overview'
import SocialCampaignEditor from '../components/pages/social/CampaignEditor'
import FacebookReporting from '../components/pages/social/facebook/Reporting'

import Search from '../components/search/Search.vue'
import SearchCampaign from '../components/search/campaign/SearchCampaigns.vue'
import SearchCampaignWizard from '../components/search/campaign/SearchCampaignWizard.vue'
import AddSearchCampaign from '../components/search/campaign/AddSearchCampaign.vue'
import DetailNetwork from '../components/search/campaign/DetailNetwork.vue'

import SetupAdGroup from '../components/search/CreateAds/setupAdGroupForm.vue'
import CreateAd from '../components/search/CreateAds/createAds.vue'

import Report from '../components/search/overview/Report.vue'
Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'MainPage',
			component: MainPage
		},
		{
			path: '/campaign',
			name: 'CampaignList',
			component: CampaignList
		},
		{
			path: '/campaign/add',
			name: 'AddCampaign',
			component: AddCampaign
		},
		{
			path: '/advertisers',
			component: Advertisers
		},
		{
			path: '/users',
			component: Users
		},
		{
			path: '/user/settings',
			component: UserSettings
		},
		{
			path: '/social/performance',
			component: Performance
		},
		{
			path: '/social/overview/',
			component: Overview
		},
		{
			path: '/social/campaigns/create',
			component: SocialCampaignEditor
		},
		{
			path: '/social/campaigns/:id',
			component: SocialCampaignEditor
		},
		{
			path: '/social/facebook/reporting/',
			component: FacebookReporting
		},
		{
			path: '/search',
			name: 'Search',
			component: Search,
			children: [
				{
					path: '/search/campaigns',
					component: SearchCampaign,
					name: 'SearchCampaign'
				},
				{
					path: '/search/addcampaign',
					component: SearchCampaignWizard,
					name: 'SearchCampaignWizard',
			 		children: [
						{
							path: '/search/addcampaign',
							component: AddSearchCampaign,
							name: 'AddSearchCampaign'
						},
						{
							path: '/search/addcampaign/detail',
							component: DetailNetwork,
							name: 'DetailNetwork'
						},
						{
							path: '/search/adgroup',
							name: 'SetupAdGroup',
							component: SetupAdGroup
						},
						{
							path: '/search/ads',
							name: 'CreateAd',
							component: CreateAd
						}
					]
				},
				{
					path: '/search/overview',
					component: Report,
					name: 'Report'
				}
			]
		}
	]
})
