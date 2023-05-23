import axios from 'axios'

export default async function getAllUsers() {
	try {
		const response = await axios.get(`${process.env.api}/users`, {
			withCredentials: true
		})
		return response.data as User[]
	} catch (error) {
		throw new Error('Failed to fetch')
	}
}
