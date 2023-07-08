import instance from './api'

const SELLER = '/seller'

class SellerServ {
	async getAll(): Promise<Seller[]> {
		try {
			const res = await instance.get(`${SELLER}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async getById(id: number): Promise<Seller> {
		try {
			const res = await instance.get(`${SELLER}/s/${id}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}
	// ?
	async getByUserId(): Promise<Seller> {
		try {
			const res = await instance.get(`${SELLER}/my-seller`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async register(data: SellerRegister): Promise<Seller> {
		try {
			const res = await instance.post(`${SELLER}/register`, data)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async update(id: number, data: EditSeller): Promise<Seller> {
		try {
			const res = await instance.patch(`${SELLER}/${id}`, data)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async check(): Promise<boolean> {
		try {
			const res = await instance.get(`${SELLER}/check-seller`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}
}

const SellerService = new SellerServ()
export default SellerService
