import axios, { AxiosInstance } from 'axios'

const instance: AxiosInstance = axios.create({
	baseURL: process.env.api,
	headers: {
		'Content-Type': 'application/json'
	}
})

instance.interceptors.request.use(config => {
	config.withCredentials = true
	return config
})

export default instance
