import axios from 'axios'

export default async function signOut() {
	try {
		return await axios.get(`${process.env.api}/user-auth/signOut`)
	} catch (error) {
		throw new Error('Failed to fetch')
	}
}
