
import SearchCampaign from '../components/search/campaign/SearchCampaigns'
import SearchCampaignWizard from '../components/search/campaign/SearchCampaignWizard'
import AddSearchCampaign from '../components/search/campaign/AddSearchCampaign'
import DetailNetwork from '../components/search/campaign/DetailNetwork'
import SetupAdGroup from '../components/search/adgroup/setupAdGroupForm'
import CreateAd from '../components/search/ad/createAds'

import Report from '../components/search/overview/Report'
import AdGroups from '../components/search/adgroup/AdGroups'
import NewAdGroup from '../components/search/adgroup/setupAdGroupForm'
import Keywords from '../components/search/keyword/Keywords'
import Demographics from '../components/search/demographics/Demographics'

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
		path: 'overview',
		component: Report,
		name: 'Report'
	},
	{
		path: 'adgroups',
		component: AdGroups,
		name: 'AdGroups'
	},
	{path: 'adgroups/new', component: SetupAdGroup},
	{
		path: 'keywords',
		component: Keywords,
		name: 'Keywords',
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
	}
]