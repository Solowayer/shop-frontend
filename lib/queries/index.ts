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
		throw new Error('Failed to fetch')
	}
}

export const fetchAllProducts = async (sort?: string): Promise<Product[]> => {
	try {
		const res = await axios.get(`${process.env.api}/products`, {
			params: { next: 'revalidate=5', sort }
		})
		return res.data
	} catch (error) {
		throw new Error('Failed to fetch')
	}
}

export async function fetchProductBySlug(slug: string): Promise<Product> {
	try {
		const response = await axios.get(`${process.env.api}/products/${slug}`)
		return response.data
	} catch (error) {
		throw new Error('Failed to fetch')
	}
}

export async function fetchProductById(id: number): Promise<Product> {
	try {
		const response = await axios.get(`${process.env.api}/products/p${id}`)
		return response.data
	} catch (error) {
		throw new Error('Failed to fetch')
	}
}

export async function getAllUsers(): Promise<User[]> {
	try {
		const response = await axios.get(`${process.env.api}/users`, {
			withCredentials: true
		})
		return response.data
	} catch (error) {
		throw new Error('Failed to fetch')
	}
}
