import axios from 'axios'
// import appConfig from '../default/app'

var baseURL = 'http://192.168.1.140:8082/new_test_adword/rest'

var request = axios.create({
  baseURL
});

export {
	baseURL,
	request
}