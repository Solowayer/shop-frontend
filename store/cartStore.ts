import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type CartState = {
	cartItemCount: number
	setCartItemCount: (value: number) => void
}

export const useCartStore = create<CartState>()(
	persist(
		devtools(set => ({
			cartItemCount: 0,
			setCartItemCount: value => set(() => ({ cartItemCount: value }))
		})),
		{ name: 'cart', version: 1 }
	)
)
