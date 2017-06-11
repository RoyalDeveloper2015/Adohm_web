import axios from 'axios'
import {baseUrl} from '../../config/index'

const getAll = ({commit}) => {
  console.log('load advertiser list')
  axios.get(`${baseUrl}/api/v1/advertiser`).then((response) => (commit('SET_ADVERTISER_LIST', {list: response.data}))
    , (err) => {
      console.log(err)
    })
}

export default {getAll}
