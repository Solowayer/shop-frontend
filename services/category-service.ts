import instance from './api'

const CATEGORIES = '/categories'

class CategoryServ {
	async findMainCategories(): Promise<Category[]> {
		try {
			const res = await instance.get(`${CATEGORIES}/main`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async findAllCategories(queryData?: CategoryFilters): Promise<Category[]> {
		try {
			const res = await instance.get(`${CATEGORIES}`, { params: queryData })
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async findCategoryAndChildrenById(id: number): Promise<{ category: Category; children: Category[] }> {
		try {
			const res = await instance.get(`${CATEGORIES}/category-children/${id}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async findCategoryById(id: number): Promise<Category> {
		try {
			const res = await instance.get(`${CATEGORIES}/category/${id}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async findCategoryBySlug(slug: string): Promise<FullCategory> {
		try {
			const res = await instance.get(`${CATEGORIES}/${slug}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async findCategoryBreadcrumbs(id: number): Promise<Category[]> {
		try {
			const res = await instance.get(`${CATEGORIES}/breadcrumbs/${id}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async createCategory(data: CreateCategory): Promise<Category> {
		try {
			const res = await instance.post(`${CATEGORIES}/create`, data)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async updateCategory(id: number, data: UpdateCategory): Promise<Category> {
		try {
			const res = await instance.patch(`${CATEGORIES}/${id}`, data)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async deleteCategory(id: number) {
		try {
			const res = await instance.delete(`${CATEGORIES}/${id}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}
}

const CategoryService = new CategoryServ()
export default CategoryService
