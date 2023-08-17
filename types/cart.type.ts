interface Cart {
	totalAmount: number
	totalQuantity: number
	cartItems: CartItem[]
}

interface CartItem {
	id: number
	image?: string
	name: string
	quantity: number
	price: number
}

interface AddCartItem {
	quantity: number
	productVariationId: number
}

interface EditCartItem extends Partial<AddCartItem> {}
