import axios from 'axios'

export default async function getAllProducts() {
	try {
		const response = await axios.get(`${process.env.api}/products`, { params: { next: 'revalidate=5' } })
		return response.data as Product[]
	} catch (error) {
		throw new Error('Failed to fetch')
	}
}
