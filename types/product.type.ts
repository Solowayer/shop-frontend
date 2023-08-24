interface Product {
	id: number
	slug: string
	name: string
	images: string[]
	price: number
	stock: number
	description?: string | null
	categoryId: number
	rating: number
}

interface FullProduct extends Product {
	category: Category
	cartItems: CartItem[]
}

interface CreateProduct {
	slug: string
	name: string
	description: string | null
	tags: string[]
	categoryId: number
	images?: string[]
	price: number
	stock: number
}

interface EditProduct extends Partial<CreateProduct> {}

type ProductSortOptions = 'rating' | 'low-price' | 'high-price' | 'newest' | 'oldest'

interface ProductFilters extends Pagination {
	sort?: ProductSortOptions
	min_price?: number
	max_price?: number
	q?: string
}
