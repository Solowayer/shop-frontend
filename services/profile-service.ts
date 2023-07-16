import instance from './api'

const PROFILE = '/profile'

class ProfileServ {
	async get(): Promise<Profile> {
		try {
			const res = await instance.get(`${PROFILE}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async updateProfile(): Promise<Profile> {
		try {
			const res = await instance.patch(`${PROFILE}/edit`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}
}

const ProfileService = new ProfileServ()
export default ProfileService
