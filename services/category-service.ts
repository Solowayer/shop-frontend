import instance from './api'

const CATEGORIES = '/categories'

class CategoryServ {
	async getAll(): Promise<Category[]> {
		try {
			const res = await instance.get(`${CATEGORIES}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async getMain(): Promise<Category[]> {
		try {
			const res = await instance.get(`${CATEGORIES}/main`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async getById(id: number): Promise<FullCategory> {
		try {
			const res = await instance.get(`${CATEGORIES}/c/${id}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async getBySlug(slug: string): Promise<Category> {
		try {
			const res = await instance.get(`${CATEGORIES}/${slug}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async getBreadcrumbs(id: number): Promise<Category[]> {
		try {
			const res = await instance.get(`${CATEGORIES}/breadcrumbs/${id}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async create(data: CreateCategory): Promise<Category> {
		try {
			const res = await instance.post(`${CATEGORIES}/create`, data)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async update(id: number, data: EditCategory): Promise<Category> {
		try {
			const res = await instance.patch(`${CATEGORIES}/c/${id}`, data)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async delete(id: number) {
		try {
			const res = await instance.delete(`${CATEGORIES}/c/${id}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}
}

const CategoryService = new CategoryServ()
export default CategoryService
