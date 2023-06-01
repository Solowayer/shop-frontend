import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type CartState = {
	cartItemsQuantity: number
	cartItems: CartItems
	cartTotalAmountPrice: number
	setcartItemsQuantity: (value: number) => void
	setCartItems: (value: CartItems) => void
	setCartTotalAmountPrice: (value: number) => void
	setCartDelete: () => void
	setCartItemDelete: (id: number, quantity: number, price: number) => void
}

export const useCartStore = create<CartState>()(
	persist(
		devtools(set => ({
			cartItemsQuantity: 0,
			cartItems: null,
			cartTotalAmountPrice: 0,
			setcartItemsQuantity: value => set(() => ({ cartItemsQuantity: Math.max(value, 0) })),
			setCartItems: value => set(() => ({ cartItems: value })),
			setCartTotalAmountPrice: value => set(() => ({ cartTotalAmountPrice: value })),
			setCartDelete: () => set(() => ({ cartItems: null, cartItemsQuantity: 0, cartTotalAmountPrice: 0 })),
			setCartItemDelete: (id, quantity, price) =>
				set((state: CartState) => ({
					cartItems: state.cartItems && state.cartItems.filter(item => item.id !== id),
					cartItemsQuantity: Math.max(state.cartItemsQuantity - quantity, 0),
					cartTotalAmountPrice: state.cartTotalAmountPrice - price
				}))
		})),
		{ name: 'cart', version: 1 }
	)
)
