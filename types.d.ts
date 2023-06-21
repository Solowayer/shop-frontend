type Category = {
	id: number
	name: string
	isMain: boolean
	parentId: number
	childrens: Category[]
	products: Product[]
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

type CreateProduct = {
	slug: string
	name: string
	images?: string[]
	description?: string | null
	price: number
	categoryId: number | null
	published: boolean
}

type EditProduct = Partial<CreateProduct>

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
