import axios from 'axios'

export const fetchCheckAuth = async () => {
	try {
		const res = await axios.get(`${process.env.api}/user-auth/check-auth`, { withCredentials: true })
		return res.data
	} catch (error) {
		throw new Error('Failed to fetch')
	}
}

export const fetchCartData = async (): Promise<Cart> => {
	try {
		const res = await axios.get(`${process.env.api}/cart`, { withCredentials: true })
		console.log(res)
		return res.data
	} catch (error) {
		console.log(error)
		throw new Error('Failed to fetch')
	}
}

export const fetchAllProducts = async (): Promise<Product[]> => {
	try {
		const res = await axios.get(`${process.env.api}/products`, { params: { next: 'revalidate=5' } })
		return res.data
	} catch (error) {
		throw new Error('Failed to fetch')
	}
}
