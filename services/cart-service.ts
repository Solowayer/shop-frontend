import instance from './api'

const CART = '/cart'

class CartServ {
	async getAllItems(): Promise<Cart> {
		try {
			const res = await instance.get(`${CART}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async getItemByProductId(productId: number): Promise<CartItem> {
		try {
			const res = await instance.get(`${CART}/p/${productId}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async deleteItems() {
		try {
			const res = await instance.delete(`${CART}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async addItem(data: AddCartItem): Promise<CartItem> {
		try {
			const res = await instance.post(`${CART}/add`, data)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async updateItem(id: number, data: EditCartItem): Promise<CartItem> {
		try {
			const res = await instance.patch(`${CART}/${id}`, data)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async deleteItem(id: number) {
		try {
			const res = await instance.delete(`${CART}/${id}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}
}

const CartService = new CartServ()
export default CartService
