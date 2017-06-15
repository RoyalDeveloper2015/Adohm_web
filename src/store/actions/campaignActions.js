import axios from 'axios'
import {baseUrl} from '../../config/index'

const getAll = ({commit}) => {
  axios.get(`${baseUrl}/api/v1/campaign`).then((response) => (commit('SET_CAMPAIGN_LIST', {list: response.data}))
    , (err) => {
      console.log(err)
    })
}

const add = ({commit}, campaign) => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/api/v1/campaign`, campaign).then((response) => {
      console.log('before commit')
      commit('ADD_CAMPAIGN', {newCampaign: response.data})
      resolve(response)
    }).catch((err, h) => {
      reject(err)
    })
  })
}

export default {getAll, add}
