import axios from 'axios'
import {baseUrl} from '../../config/index'

const getAll = ({commit}) => {
  axios.get(`${baseUrl}/api/v1/country`).then((response) => (commit('SET_COUNTRY_LIST', {list: response.data}))
    , (err) => {
      console.log(err)
    })
}

export default {getAll}
