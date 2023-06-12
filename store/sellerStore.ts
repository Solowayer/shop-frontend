import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type SellerState = {
	isSeller: boolean
	setIsSeller: (value: boolean) => void
}

export const useSellerStore = create<SellerState>()(
	persist(
		devtools(set => ({
			isSeller: false,
			setIsSeller: value => set(() => ({ isSeller: value }))
		})),
		{ name: 'seller', version: 1 }
	)
)
