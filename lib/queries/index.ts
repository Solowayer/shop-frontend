import axios from 'axios'

export const fetchCheckAuth = async () => {
	const res = await axios.get(`${process.env.api}/user-auth/check-auth`, { withCredentials: true })
  return res.data
}
