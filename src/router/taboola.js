import CampaignEditor from '../components/taboola/campaign/CampaignEditor'
import Campaigns from '../components/taboola/campaign/Campaigns'

export default [
	{
		name: 'TaboolaCampaignEditor',
		path: '/taboola/campaign-editor',
		component: CampaignEditor
	},
	{
		name: 'TaboolaCampaigns',
		path: '/taboola/campaigns',
		component: Campaigns
	}
]