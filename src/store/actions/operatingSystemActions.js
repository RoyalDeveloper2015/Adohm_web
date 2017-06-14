import axios from 'axios'
import {baseUrl} from '../../config/index'

const getAll = ({commit}) => {
  axios.get(`${baseUrl}/api/v1/operatingsystem`).then((response) => (commit('SET_OPERATING_SYSTEM_LIST', {list: response.data}))
    , (err) => {
      console.log(err)
    })
}

export default {getAll}
