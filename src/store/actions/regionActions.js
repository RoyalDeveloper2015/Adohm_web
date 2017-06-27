import axios from 'axios'
import {baseUrl} from '../../config/index'

const getAll = ({commit}, selectedCountries) => {
  axios.put(`${baseUrl}/api/v1/region`, {selectedCountries}).then((response) => (commit('SET_REGION_LIST', {
    list: response.data
  })), (err) => {
    console.log(err)
  })
}

export default {getAll}
