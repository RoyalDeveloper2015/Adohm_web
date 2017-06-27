import axios from 'axios'
import {baseUrl} from '../../config/index'

const getAll = ({commit}, selectedCountries) => {
  axios.put(`${baseUrl}/api/v1/mobilecarrier`, {selectedCountries}).then((response) => (commit('SET_MOBILE_CARRIER_LIST', {
    list: response.data
  })), (err) => {
    console.log(err)
  })
}

export default {getAll}
