import instance from './api'

const CART = '/cart'

class CartServ {
	async get(): Promise<Cart> {
		try {
			const res = await instance.get(`${CART}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async delete() {
		try {
			const res = await instance.delete(`${CART}/delete`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async addCartItem(data: AddCartItem): Promise<CartItem> {
		try {
			const res = await instance.post(`${CART}/add`, data)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async updateCartItem(id: number, data: EditCartItem): Promise<CartItem> {
		try {
			const res = await instance.patch(`${CART}/${id}`, data)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async deleteCartItem(id: number) {
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
