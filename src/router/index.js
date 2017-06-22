import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '../components/MainPage.vue'
import CampaignList from '../components/campaign/CampaignList.vue'
import AddCampaign from '../components/campaign/AddCampaign.vue'
import Search from '../components/search/search.vue'
import SearchCampaign from '../components/search/SearchCampaigns.vue'
import AddSearchCampaign from '../components/search/AddSearchCampaign.vue'

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
          component: AddSearchCampaign,
          name: 'AddSearchCampagin'
        }
      ]
    }
  ]
})
