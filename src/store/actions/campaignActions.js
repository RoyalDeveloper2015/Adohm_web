import axios from 'axios'
import {baseUrl} from '../../config/index'

const getAll = ({commit}) => {
  axios.get(`${baseUrl}/api/v1/campaign`).then((response) => (commit('SET_CAMPAIGN_LIST', {list: response.data}))
    , (err) => {
      console.log(err)
    })
}

const add = ({commit}, campaign) => {
  return axios.post(`${baseUrl}/api/v1/campaign`, campaign).then((response) => {
    commit('ADD_CAMPAIGN', {newCampaign: response.data})
  })
}

export default {getAll, add}
