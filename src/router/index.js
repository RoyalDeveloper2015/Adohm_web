import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '../components/MainPage.vue'
import CampaignList from '../components/campaign/CampaignList.vue'
import AddCampaign from '../components/campaign/AddCampaign.vue'

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
    }
  ]
})
