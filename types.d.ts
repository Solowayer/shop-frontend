type Product = {
	id: number
	slug: string
	images: string[]
	name: string
	description: string
	price: number
	rating: number
}

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
	name: string
	image: string
	quantity: number
	price: number
}

type AddToCart = {
	quantity: string
	productId: number
}
