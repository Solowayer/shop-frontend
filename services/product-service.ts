import instance from './api'

const PRODUCTS = '/products'

class ProductServ {
	async getAll(queryData?: ProductFilters): Promise<{ products: Product[]; length: number }> {
		try {
			const res = await instance.get(`${PRODUCTS}`, { params: queryData })
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async getByCategoryId(
		categoryId: number,
		queryData?: ProductFilters
	): Promise<{ products: Product[]; length: number }> {
		try {
			const res = await instance.get(`${PRODUCTS}/c/${categoryId}`, { params: queryData })
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async getByCategoryTree(
		categoryId: number,
		queryData?: ProductFilters
	): Promise<{ products: Product[]; length: number }> {
		try {
			const res = await instance.get(`${PRODUCTS}/c/tree/${categoryId}`, { params: queryData })
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}
	// ?
	async getBySeller(): Promise<Product[]> {
		try {
			const res = await instance.get(`${PRODUCTS}/seller `)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async getById(id: number): Promise<Product> {
		try {
			const res = await instance.get(`${PRODUCTS}/p/${id}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async getBySlug(slug: string): Promise<Product> {
		try {
			const res = await instance.get(`${PRODUCTS}/${slug}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async create(data: CreateProduct): Promise<Product> {
		try {
			const res = await instance.post(`${PRODUCTS}/create`, data)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async update(id: number, data: EditProduct): Promise<Product> {
		try {
			const res = await instance.patch(`${PRODUCTS}/p/${id}`, data)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async delete(id: number) {
		try {
			const res = await instance.delete(`${PRODUCTS}/p/${id}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}
}

const ProductService = new ProductServ()
export default ProductService
