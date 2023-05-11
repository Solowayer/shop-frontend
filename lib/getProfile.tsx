import axios from 'axios'

export default async function getProfile() {
	try {
		const response = await axios.get(`${process.env.api}/account/profile}`)
		return response.data
	} catch (error) {
		throw new Error('Failed to fetch')
	}
}
