import instance from './api'

const LISTS = '/lists'

class ListServ {
	async findAll(): Promise<List[]> {
		try {
			const res = await instance.get(`${LISTS}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async findById(id: number): Promise<List> {
		try {
			const res = await instance.get(`${LISTS}/${id}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async create(data: CreateList): Promise<List> {
		try {
			const res = await instance.post(`${LISTS}/create`, data)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async update(id: number, data: UpdateList): Promise<List> {
		try {
			const res = await instance.patch(`${LISTS}/edit/${id}`, data)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async delete(id: number) {
		try {
			const res = await instance.delete(`${LISTS}/delete/${id}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async addProduct(listId: number, productId: number): Promise<{ productId: number; listId: number }> {
		try {
			const res = await instance.post(`${LISTS}/${listId}/product/${productId}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async deleteProduct(listId: number, productId: number) {
		try {
			const res = await instance.delete(`${LISTS}/${listId}/product/${productId}`)
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

const ListService = new ListServ()
export default ListService
