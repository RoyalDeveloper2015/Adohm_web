import axios from 'axios'
import {
  baseUrl
} from '../../config/index'

const getAll = ({commit}, selectedCountries) => {
  axios.put(`${baseUrl}/api/v1/postalcode`, {selectedCountries}).then((response) => (commit('SET_POSTAL_CODE_LIST', {
    list: response.data
  })), (err) => {
    console.log(err)
  })
}

export default {getAll}
