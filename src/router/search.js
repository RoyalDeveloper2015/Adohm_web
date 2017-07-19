
import SearchCampaign from '../components/search/campaign/SearchCampaigns'
import SearchCampaignWizard from '../components/search/campaign/SearchCampaignWizard'
import AddSearchCampaign from '../components/search/campaign/AddSearchCampaign'
import DetailNetwork from '../components/search/campaign/DetailNetwork'
import SetupAdGroup from '../components/search/adgroup/setupAdGroupForm'
import CreateAd from '../components/search/ad/createAds'

import Report from '../components/search/overview/Report'
import Ads from '../components/search/ad/Ads'
import AdGroups from '../components/search/adgroup/AdGroups'
import AdGroupWizard from '../components/search/adgroup/AddAdGroupWizard'
import Keywords from '../components/search/keyword/Keywords'
import NegativeKeywords from '../components/search/keyword/NegativeKeywords'
import AddNegativeKeyword from '../components/search/keyword/AddNegativeKeyword'
import Demographics from '../components/search/demographics/Demographics'
// import Settings from '../components/search/settings/Settings'

export default [
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
				path: '',
				component: AddSearchCampaign,
				name: 'AddSearchCampaign'
			},
			{
				path: 'detail',
				component: DetailNetwork,
				name: 'DetailNetwork'
			},
			{
				path: 'adgroup',
				name: 'SetupAdGroup',
				component: SetupAdGroup
			},
			{
				path: 'ads',
				name: 'CreateAd',
				component: CreateAd
			}
		]
	},
	{
		path: 'overview',
		component: Report,
		name: 'Report'
	},
	{
		path: 'adgroups',
		component: AdGroups,
		name: 'AdGroups'
	},
	{
		path: 'ads',
		component: Ads,
		name: 'Ads'
	},
	{path: 'ads/new', component: CreateAd},
	{
		path: 'adgroups/new', 
		component: AdGroupWizard,
		children: [
			{path: '', component: SetupAdGroup},
			{path: 'ads', component: CreateAd},
		]
	},
	{
		path: 'keywords',
		component: Keywords,
		name: 'Keywords',
	},
	{
		path: 'keywords/negative',
		component: NegativeKeywords,
		name: 'NegativeKeywords',
	},
	{
		path: 'keywords/negative/add',
		component: AddNegativeKeyword,
		name: 'AddNegativeKeyword',
	},
	{
		path: 'keywords/:type',
		component: Keywords,
		name: 'Keywords',
	},
	{
		path: 'demographics',
		component: Demographics,
		name: 'Demographics'
	},
	{
		path: 'campaigns/settings',
		component: DetailNetwork,
		name: 'Settings'
	}
]