import axios from 'axios'

// AUTH
export const fetchCheckAuth = async (): Promise<boolean> => {
	try {
		const res = await axios.get(`${process.env.api}/auth/check-auth`, { withCredentials: true })
		return res.data
	} catch (error) {
		throw new Error('Failed to fetch')
	}
}

// SELLER
export const fetchCheckSeller = async (): Promise<boolean> => {
	try {
		const res = await axios.get(`${process.env.api}/seller/check-seller`, { withCredentials: true })
		return res.data
	} catch (error) {
		throw new Error('Failed to fetch')
	}
}

export const fetchSellerProducts = async (): Promise<Product[]> => {
	try {
		const res = await axios.get(`${process.env.api}/seller/products`, { withCredentials: true })
		return res.data
	} catch (error) {
		throw new Error('Failed to fetch')
	}
}

// CART
export const fetchCartData = async (): Promise<Cart> => {
	try {
		const res = await axios.get(`${process.env.api}/cart`, { withCredentials: true })
		console.log(res)
		return res.data
	} catch (error) {
		throw new Error('Failed to fetch')
	}
}

// CATEGORIES
export async function fetchAllCategories(): Promise<Category[]> {
	try {
		const res = await axios.get(`${process.env.api}/categories`, {
			withCredentials: true
		})
		return res.data
	} catch (error) {
		throw new Error('Failed to fetch')
	}
}

export const fetchMainCategories = async (): Promise<Category[]> => {
	try {
		const res = await axios.get(`${process.env.api}/categories/main`, { params: { next: 'revalidate=5' } })
		console.log(res)
		return res.data
	} catch (error) {
		throw new Error('Failed to fetch')
	}
}

export async function fetchCategoryById(id: number): Promise<Category> {
	try {
		const res = await axios.get(`${process.env.api}/categories/c/${id}`, { params: { next: 'revalidate=5' } })
		return res.data
	} catch (error) {
		throw new Error('Failed to fetch')
	}
}

export async function fetchCategoryBySlug(slug: string): Promise<Category> {
	try {
		const res = await axios.get(`${process.env.api}/categories/${slug}`, { params: { next: 'revalidate=5' } })
		return res.data
	} catch (error) {
		throw new Error('Failed to fetch')
	}
}

// PRODUCTS
export const fetchAllProducts = async (
	sort?: ProductSortOptions,
	min_price?: number,
	max_price?: number,
	searchTerm?: string,
	page?: number,
	limit?: number
): Promise<{ products: Product[]; length: number }> => {
	try {
		const res = await axios.get(`${process.env.api}/products`, {
			params: {
				sort,
				min_price,
				max_price,
				searchTerm,
				page,
				limit
			}
		})
		console.log(res.data)

		return res.data
	} catch (error) {
		throw new Error('Failed to fetch')
	}
}

export async function fetchProductsByCategoryId(categoryId: number): Promise<Product[]> {
	try {
		const res = await axios.get(`${process.env.api}/products/c/${categoryId}`)
		return res.data
	} catch (error) {
		throw new Error('Failed to fetch')
	}
}

export async function fetchProductById(id: number): Promise<Product> {
	try {
		const res = await axios.get(`${process.env.api}/products/p/${id}`)
		return res.data
	} catch (error) {
		throw new Error('Failed to fetch')
	}
}

export async function fetchProductBySlug(slug: string): Promise<Product> {
	try {
		const res = await axios.get(`${process.env.api}/products/${slug}`)
		return res.data
	} catch (error) {
		throw new Error('Failed to fetch')
	}
}

export const fetchProductsMaxPrice = async (): Promise<number> => {
	try {
		const res = await axios.get(`${process.env.api}/products/max-price`)
		const { productsMaxPrice } = res.data
		return productsMaxPrice
	} catch (error) {
		throw new Error('Failed to fetch')
	}
}

export async function getAllUsers(): Promise<User[]> {
	try {
		const res = await axios.get(`${process.env.api}/users`, {
			withCredentials: true
		})
		return res.data
	} catch (error) {
		throw new Error('Failed to fetch')
	}
}
