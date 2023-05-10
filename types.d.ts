type Product = {
	id: number
	slug: string
	images: string[]
	name: string
	description: string
	price: number
	rating: number
}

type UserSignup = {
	username: string
	email: string
	phoneNumber?: string
	password: string
}
