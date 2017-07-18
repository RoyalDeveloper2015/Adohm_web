import axios from 'axios'
// import appConfig from '../default/app'

var baseURL = 'https://backstage.taboola.com/backstage/api/1.0/'

var request = axios.create({
  baseURL
});

export {
	baseURL,
	request
}