import instance from './api'

const PRODUCTS = '/products'

class ProductServ {
	async findAllProducts(queryData?: ProductFilters): Promise<{ products: Product[]; length: number }> {
		try {
			const res = await instance.get(`${PRODUCTS}`, { params: queryData })
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async findProductsByCategoryId(
		categoryId: number,
		queryData?: ProductFilters
	): Promise<{ products: Product[]; length: number }> {
		try {
			const res = await instance.get(`${PRODUCTS}/category/${categoryId}`, { params: queryData })
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async findProductsByCategoryTree(
		categoryId: number,
		queryData?: ProductFilters
	): Promise<{ products: Product[]; length: number }> {
		try {
			const res = await instance.get(`${PRODUCTS}/category/tree/${categoryId}`, { params: queryData })
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async findProductsByWishlist(
		wishlistId: number,
		queryData?: ProductFilters
	): Promise<{ products: Product[]; length: number }> {
		try {
			const res = await instance.get(`${PRODUCTS}/wishlist/${wishlistId}`, { params: queryData })
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async findProductsBySellerId(queryData?: ProductFilters): Promise<{ products: Product[]; length: number }> {
		try {
			const res = await instance.get(`${PRODUCTS}/seller`, { params: queryData })
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async findProductById(id: number): Promise<Product> {
		try {
			const res = await instance.get(`${PRODUCTS}/product/${id}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async findProductBySlug(slug: string): Promise<Product> {
		try {
			const res = await instance.get(`${PRODUCTS}/${slug}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async createProduct(data: CreateProduct): Promise<Product> {
		try {
			const res = await instance.post(`${PRODUCTS}/create`, data)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async createManyProduct(data: CreateProduct[]): Promise<Product[]> {
		try {
			const res = await instance.post(`${PRODUCTS}/create-many`, data)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async updateProduct(id: number, data: EditProduct): Promise<Product> {
		try {
			const res = await instance.patch(`${PRODUCTS}/product/${id}`, data)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async deleteProduct(id: number) {
		try {
			const res = await instance.delete(`${PRODUCTS}/product/${id}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}
}

const ProductService = new ProductServ()
export default ProductService
