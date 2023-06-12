type Category = {
	id: number
	name: string
	isMain: boolean
	parentId: number
	childrens: Category[]
	products: Product[]
}

type Product = {
	id: number
	slug: string
	images: string[]
	name: string
	description: string
	price: number
	rating: number
}

type ProductSortOption = 'price_asc' | 'price_desc' | 'rating'

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

type User = {
	username: string
	email: string
	phoneNumber: string
}

type Cart = {
	totalAmount: number
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
	quantity: string
	productId: number
}
