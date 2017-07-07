import axios from 'axios'
import appConfig from './app'

var baseURL = appConfig.baseURL + ':3000';

var request = axios.create({
  baseURL,
  withCredentials: true
});

export {
	baseURL,
	request
}