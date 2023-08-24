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
	productId: number
}

interface CreateCartItem {
	quantity: number
	productId: number
}

interface UpdateCartItem extends Partial<CreateCartItem> {}
