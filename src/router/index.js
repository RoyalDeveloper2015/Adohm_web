import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '../components/MainPage.vue'
import CampaignList from '../components/campaign/CampaignList.vue'
import AddCampaign from '../components/campaign/AddCampaign.vue'

import Search from '../components/search/Search.vue'
import SearchCampaign from '../components/search/campaign/SearchCampaigns.vue'
import AddSearchCampaign from '../components/search/campaign/AddSearchCampaign.vue'

import SearchDetail from '../components/search/campaign/SearchDetail.vue'
import SearchNetwork from '../components/search/campaign/searchdetail/SearchNetwork.vue'
import DetailNetwork from '../components/search/campaign/DetailNetwork.vue'

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
        },
        {
          path: '/search/addcampaign/searchnetwork/detail',
          component: DetailNetwork,
          name: 'DetailNetwork'
        },
        {
          path: '/search/addcampaign/searchdetail',
          component: SearchDetail,
          name: 'SearchDetail',
          children: [
            {
              path: '/search/addcampaign/searchnetwork',
              component: SearchNetwork,
              name: 'SearchNetwork'
            }
          ]
        }
      ]
    }
  ]
})
