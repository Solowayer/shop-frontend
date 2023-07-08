import { create } from 'zustand'
// import { devtools, persist } from 'zustand/middleware'

type State = {
	cartTotalQty: number
	isAuth: boolean
	isSeller: boolean
}

type Actions = {
	setCartTotalQty: (qty: number) => void
	setIsAuth: (value: boolean) => void
	setIsSeller: (value: boolean) => void
	reset: () => void
}

const initialState: State = {
	cartTotalQty: 0,
	isAuth: false,
	isSeller: false
}

export const useUserStore = create<State & Actions>()(set => ({
	...initialState,

	setCartTotalQty: (qty: number) => {
		set({ cartTotalQty: Math.max(qty, 0) })
	},

	setIsAuth: (value: boolean) => {
		set({ isAuth: value })
	},

	setIsSeller: (value: boolean) => {
		set({ isSeller: value })
	},

	reset: () => {
		set(initialState)
	}
}))
