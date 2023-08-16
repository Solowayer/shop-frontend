interface Product {
	id: number
	slug: string
	name: string
	description?: string | null
	categoryId: number
	rating: number
	variations: ProductVariation[]
}

interface FullProduct extends Product {
	category: Category
	cartItems: CartItem[]
}

interface CreateProduct extends Omit<Product, 'id' | 'rating'> {}

interface EditProduct extends Partial<Product> {}

type ProductSortOptions = 'rating' | 'low-price' | 'high-price' | 'newest' | 'oldest'

interface ProductFilters extends Pagination {
	sort?: ProductSortOptions
	min_price?: number
	max_price?: number
	q?: string
}
