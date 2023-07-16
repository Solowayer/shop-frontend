import instance from './api'

const USERS = '/users'

class UserServ {
	async getAll(): Promise<User> {
		try {
			const res = await instance.get(`${USERS}/all`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async getSelf(): Promise<User> {
		try {
			const res = await instance.get(`${USERS}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async editSelf(): Promise<User> {
		try {
			const res = await instance.patch(`${USERS}/edit`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}
}

const UserService = new UserServ()
export default UserService
