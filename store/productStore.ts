import { Product } from '@/types/product.type'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type ProductState = {
	product: Product | null
	setProduct: (product: Product | null) => void
}

export const useProductStore = create<ProductState>()(
	persist(
		devtools(set => ({
			product: null,
			setProduct: product => set(() => ({ product }))
		})),
		{ name: 'product', version: 1 }
	)
)
