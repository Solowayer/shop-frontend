import axios from 'axios'

export default async function getProduct(slug: string) {
	try {
		const response = await axios.get(`${process.env.api}/products/${slug}`)
		return response.data
	} catch (error) {
		throw new Error('Failed to fetch')
	}
}
