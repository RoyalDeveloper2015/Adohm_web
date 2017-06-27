import axios from 'axios'
import {baseUrl} from '../../config/index'

const getAll = ({commit}) => {
  axios.get(`${baseUrl}/api/v1/language`).then((response) => (commit('SET_LANGUAGE_LIST', {list: response.data}))
    , (err) => {
      console.log(err)
    })
}

export default {getAll}
