import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type CartState = {
	cartItems: CartItems
	totalQuantity: number
	totalAmount: number
	setTotalQuantity: (value: number) => void
	setCartItems: (value: CartItems) => void
	setTotalAmount: (value: number) => void
	setCart: (cartItems: CartItems, totalQuantity: number, totalAmount: number) => void
	setCartDelete: () => void
	setCartItemDelete: (id: number, quantity: number, price: number) => void
}

export const useCartStore = create<CartState>()(
	persist(
		devtools(set => ({
			cartItems: [],
			totalQuantity: 0,
			totalAmount: 0,
			setTotalQuantity: value => set(() => ({ totalQuantity: Math.max(value, 0) })),
			setCartItems: value => set(() => ({ cartItems: value })),
			setTotalAmount: value => set(() => ({ totalAmount: value })),
			setCart: (cartItems, totalQuantity, totalAmount) =>
				set(() => ({
					cartItems: cartItems,
					totalQuantity,
					totalAmount
				})),
			setCartDelete: () => set(() => ({ cartItems: [], totalQuantity: 0, totalAmount: 0 })),
			setCartItemDelete: (id, quantity, price) =>
				set((state: CartState) => ({
					cartItems: state.cartItems && state.cartItems.filter(item => item.id !== id),
					totalQuantity: Math.max(state.totalQuantity - quantity, 0),
					totalAmount: state.totalAmount - price
				}))
		})),
		{ name: 'cart', version: 1 }
	)
)
