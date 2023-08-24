import instance from './api'

const LISTS = '/lists'

class WishlistServ {
	async findAllWishlists(): Promise<List[]> {
		try {
			const res = await instance.get(`${LISTS}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async findWishlistById(id: number): Promise<List> {
		try {
			const res = await instance.get(`${LISTS}/${id}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async createWishlist(data: CreateList): Promise<List> {
		try {
			const res = await instance.post(`${LISTS}/create`, data)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async updateWishlist(id: number, data: UpdateList): Promise<List> {
		try {
			const res = await instance.patch(`${LISTS}/update/${id}`, data)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async deleteWishlist(id: number) {
		try {
			const res = await instance.delete(`${LISTS}/delete/${id}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async addProductToWishlist(listId: number, productId: number): Promise<{ productId: number; listId: number }> {
		try {
			const res = await instance.post(`${LISTS}/${listId}/product/${productId}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async deleteProductFromWishlist(productId: number) {
		try {
			const res = await instance.delete(`${LISTS}/product/${productId}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async checkProductInList(productId: number): Promise<{ isInList: boolean }> {
		try {
			const res = await instance.get(`${LISTS}/check/${productId}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}
}

const WishlistService = new WishlistServ()
export default WishlistService
