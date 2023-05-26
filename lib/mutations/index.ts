import axios from 'axios'

export const login = (data: UserLogin) => {
	return axios.post(`${process.env.api}/user-auth/login`, data, {
		withCredentials: true
	})
}
