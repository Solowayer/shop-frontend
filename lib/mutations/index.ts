import axios from 'axios'

export const login = (data: UserLogin) => {
	return axios.post(`${process.env.api}/user-auth/login`, data, {
		withCredentials: true
	})
}

export const logout = (data: void) => {
	return axios.post(`${process.env.api}/user-auth/logout`, data, {
		withCredentials: true
	})
}

export const addtoCart = (data: AddToCart) => {
	return axios.post(`${process.env.api}/cart`, data, {
		withCredentials: true
	})
}

export const deleteCart = () => {
	return axios.delete(`${process.env.api}/cart`, {
		withCredentials: true
	})
}
