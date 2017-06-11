import axios from 'axios'
import {baseUrl} from '../../config/index'

const getAll = ({commit}) => {
  axios.get(`${baseUrl}/api/v1/region`).then((response) => (commit('SET_REGION_LIST', {list: response.data}))
    , (err) => {
      console.log(err)
    })
}

export default {getAll}
