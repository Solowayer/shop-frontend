import instance from '../api'

const AUTH = '/auth'

class Auth {
	async checkAuth(): Promise<boolean> {
		try {
			const res = await instance.get(`${AUTH}/check-auth`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async register(data: UserRegister) {
		try {
			await instance.post(`${AUTH}/register`, data)
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async login(data: UserLogin) {
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

const AuthService = new Auth()
export default AuthService
