import axios from 'axios'
// import appConfig from '../default/app'

var baseURL = 'http://192.168.1.118:8082/adword/rest/'

var request = axios.create({
  baseURL
});

export {
	baseURL,
	request
}