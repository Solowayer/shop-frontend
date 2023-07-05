interface Seller {
	id: number
	name: string
	adress: string
	description?: string
	email: string
	phoneNumber: string
	pib: string
	userId: number
}

interface SellerRegister {
	name: string
	adress: string
	email: string
	description?: string
	phoneNumber: string
	pib: string
}

interface EditSeller extends Partial<SellerRegister> {}
