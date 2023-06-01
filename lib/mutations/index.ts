import axios from 'axios'

export const login = async (data: UserLogin) => {
	try {
		await axios.post(`${process.env.api}/user-auth/login`, data, {
			withCredentials: true
		})
	} catch (error) {
		console.log(error)
	}
}

export const logout = async (data: void) => {
	try {
		await axios.post(`${process.env.api}/user-auth/logout`, data, {
			withCredentials: true
		})
	} catch (error) {
		console.log(error)
	}
}

export const addtoCart = async (data: AddToCart) => {
	try {
		await axios.post(`${process.env.api}/cart`, data, {
			withCredentials: true
		})
	} catch (error) {
		console.log(error)
	}
}

export const deleteCartItem = async (id: number) => {
	try {
		await axios.delete(`${process.env.api}/cart/${id}`, {
			withCredentials: true
		})
	} catch (error) {
		console.log(error)
	}
}

export const deleteCart = async () => {
	try {
		await axios.delete(`${process.env.api}/cart`, {
			withCredentials: true
		})
	} catch (error) {
		console.log(error)
	}
}
