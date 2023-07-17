import { Profile } from '@/types/profile.type'
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

	async updateProfile(data: Profile): Promise<Profile> {
		try {
			const res = await instance.patch(`${PROFILE}/edit`, data)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}
}

const ProfileService = new ProfileServ()
export default ProfileService
