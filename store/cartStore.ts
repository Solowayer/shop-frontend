import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type CartState = {
	cartItemsQuantity: number
	cartItems: CartItems
	cartTotalAmountPrice: number
	setCartItemsQuantity: (value: number) => void
	setCartItems: (value: CartItems) => void
	setCartTotalAmountPrice: (value: number) => void
	setCartDelete: () => void
	setCartItemCreate: (quantity: number, cartItems: CartItems, totalAmount: number) => void
	setCartItemDelete: (id: number, quantity: number, price: number) => void
}

export const useCartStore = create<CartState>()(
	persist(
		devtools(set => ({
			cartItemsQuantity: 0,
			cartItems: [],
			cartTotalAmountPrice: 0,
			setCartItemsQuantity: value => set(() => ({ cartItemsQuantity: Math.max(value, 0) })),
			setCartItems: value => set(() => ({ cartItems: value })),
			setCartTotalAmountPrice: value => set(() => ({ cartTotalAmountPrice: value })),
			setCartDelete: () => set(() => ({ cartItems: [], cartItemsQuantity: 0, cartTotalAmountPrice: 0 })),
			setCartItemCreate: (quantity, cartItems, totalAmount) =>
				set(() => ({
					cartItemsQuantity: quantity,
					cartItems: cartItems,
					cartTotalAmountPrice: totalAmount
				})),
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
