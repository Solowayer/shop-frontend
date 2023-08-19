interface Product {
	id: number
	slug: string
	name: string
	description?: string | null
	categoryId: number
	rating: number
	variants: Variant[]
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
}

interface EditProduct extends Partial<CreateProduct> {}

type ProductSortOptions = 'rating' | 'low-price' | 'high-price' | 'newest' | 'oldest'

interface ProductFilters extends Pagination {
	sort?: ProductSortOptions
	min_price?: number
	max_price?: number
	q?: string
}
