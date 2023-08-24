import instance from './api'

const CART = '/cart'

class CartServ {
	async findAllCartItems(): Promise<Cart> {
		try {
			const res = await instance.get(`${CART}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async createCartItem(data: CreateCartItem): Promise<CartItem> {
		try {
			const res = await instance.post(`${CART}/create`, data)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async updateCartItem(id: number, data: UpdateCartItem): Promise<CartItem> {
		try {
			const res = await instance.patch(`${CART}/update/${id}`, data)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async deleteCartItem(id: number) {
		try {
			const res = await instance.delete(`${CART}/delete/${id}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async deleteAllCartItems() {
		try {
			const res = await instance.delete(`${CART}/delete-all`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async checkProductInCart(productId: number): Promise<{ isInCart: boolean }> {
		try {
			const res = await instance.get(`${CART}/check/${productId}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}
}

const CartService = new CartServ()
export default CartService
