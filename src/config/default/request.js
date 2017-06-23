import axios from 'axios'

var baseURL = 'http://localhost:3000'

var request = axios.create({
  baseURL,
  withCredentials: true
});

export {
	baseURL,
	request
}