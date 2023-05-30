import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type CartState = {
	cartItemCount: number
	setCartItemCount: (value: number) => void
	cartItems: CartItem[] | null
	setCartItems: (value: CartItem[] | null) => void
	cartTotalAmountPrice: number
	setCartTotalAmountPrice: (value: number) => void
}

export const useCartStore = create<CartState>()(
	persist(
		devtools(set => ({
			cartItemCount: 0,
			setCartItemCount: value => set(() => ({ cartItemCount: value })),
			cartItems: [],
			setCartItems: value => set(() => ({ cartItems: value })),
			cartTotalAmountPrice: 0,
			setCartTotalAmountPrice: value => set(() => ({ cartTotalAmountPrice: value }))
		})),
		{ name: 'cart', version: 1 }
	)
)
