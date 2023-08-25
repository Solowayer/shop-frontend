interface Wishlist {
	id: number
	name: string
	userId: number
}

interface CreateWishlist {
	name: string
}

interface UpdateWishlist extends Partial<CreateWishlist> {}
