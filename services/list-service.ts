import instance from './api'

const LISTS = '/lists'

class ListServ {
	async create(data: CreateList): Promise<List> {
		try {
			const res = await instance.post(`${LISTS}/create`, data)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async update(id: number, data: EditList): Promise<List> {
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

	async getById(id: number): Promise<List> {
		try {
			const res = await instance.get(`${LISTS}/${id}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async getAll(): Promise<List[]> {
		try {
			const res = await instance.get(`${LISTS}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}
}

const ListService = new ListServ()
export default ListService
