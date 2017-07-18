import Vue from 'vue'
import Router from 'vue-router'
import searchRoutes from './search';

import MainPage from '../components/MainPage'
import CampaignList from '../components/campaign/CampaignList'
import AddCampaign from '../components/campaign/AddCampaign'
import Advertisers from '../components/pages/Advertisers'
import Users from '../components/pages/Users'
import UserSettings from '../components/pages/user/Settings'
import Performance from '../components/pages/social/Performance'
import Overview from '../components/pages/social/Overview'
import SocialCampaignEditor from '../components/pages/social/CampaignEditor'
import FacebookReporting from '../components/pages/social/facebook/Reporting'
import Account from '../components/pages/Account'


import Taboola from './taboola'
import Search from '../components/search/Search'

Vue.use(Router)


var routes = [
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
		path: '/user/account',
		component: Account
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

routes = routes.concat(Taboola);

export default new Router({
	routes
})
