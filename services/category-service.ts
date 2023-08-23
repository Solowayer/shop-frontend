import instance from './api'

const CATEGORIES = '/categories'

class CategoryServ {
	async findMain(): Promise<Category[]> {
		try {
			const res = await instance.get(`${CATEGORIES}/main`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async findAll(queryData?: CategoryFilters): Promise<Category[]> {
		try {
			const res = await instance.get(`${CATEGORIES}`, { params: queryData })
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async findTree(queryData?: CategoryFilters): Promise<Category[]> {
		try {
			const res = await instance.get(`${CATEGORIES}/c-tree`, { params: queryData })
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async findAllById(id: number): Promise<Category[]> {
		try {
			const res = await instance.get(`${CATEGORIES}/c-all/${id}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async findById(id: number): Promise<FullCategory> {
		try {
			const res = await instance.get(`${CATEGORIES}/c/${id}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async findBySlug(slug: string): Promise<FullCategory> {
		try {
			const res = await instance.get(`${CATEGORIES}/${slug}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async findBreadcrumbs(id: number): Promise<Category[]> {
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
