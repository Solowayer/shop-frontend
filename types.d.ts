type Category = {
	id: number
	name: string
	isMain: boolean
	parentId: number
	children: Category[]
	products: Product[]
}

type ProductSortOptions = 'rating' | 'low-price' | 'high-price' | 'newest' | 'oldest'

type UserRegister = {
	username: string
	email: string
	phoneNumber?: string
	password: string
}

type UserLogin = {
	email: string
	password: string
}

type SellerRegister = {
	name: string
	adress: string
	email: string
	description?: string
	phoneNumber: string
	pib: string
}

type Product = {
	id: number
	slug: string
	images?: string[]
	name: string
	description?: string
	price: number
	categoryId: number
	rating: number
	published: boolean
}

type CreateProduct = Omit<Product, 'id' | 'rating'>

type EditProduct = Partial<Product>

type User = {
	username: string
	email: string
	phoneNumber: string
}

type Cart = {
	totalAmount: number
	totalQuantity: number
	cartItems: CartItem[]
}

type CartItem = {
	id: number
	image?: string
	name: string
	quantity: number
	price: number
	productId: number
}

type CartItems = CartItem[]

type AddToCart = {
	quantity: number
	productId: number
}

type UploadImageData = {
	key: string
	images: File[]
}
