import instance from './api'

const AUTH = '/auth'

class AuthServ {
	async checkAuth(): Promise<boolean> {
		try {
			const res = await instance.get(`${AUTH}/check-auth`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async register(data: Register) {
		try {
			await instance.post(`${AUTH}/register`, data)
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async login(data: Login) {
		try {
			await instance.post(`${AUTH}/login`, data)
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async logout(data: void) {
		try {
			await instance.post(`${AUTH}/logout`, data)
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}
}

const AuthService = new AuthServ()
export default AuthService
