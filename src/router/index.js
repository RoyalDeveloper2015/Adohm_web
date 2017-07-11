import Vue from 'vue'
import Router from 'vue-router'
import searchRoutes from './search';

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
			children: searchRoutes
		}
	]
})
