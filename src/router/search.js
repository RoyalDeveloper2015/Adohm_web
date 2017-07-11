
import SearchCampaign from '../components/search/campaign/SearchCampaigns.vue'
import SearchCampaignWizard from '../components/search/campaign/SearchCampaignWizard.vue'
import AddSearchCampaign from '../components/search/campaign/AddSearchCampaign.vue'
import DetailNetwork from '../components/search/campaign/DetailNetwork.vue'
import SetupAdGroup from '../components/search/adgroup/setupAdGroupForm.vue'
import CreateAd from '../components/search/ad/createAds.vue'

import Report from '../components/search/overview/Report.vue'
import AdGroups from '../components/search/adgroup/AdGroups.vue'
import Keywords from '../components/search/keyword/Keywords.vue'
import Demographics from '../components/search/demographics/Demographics.vue'

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