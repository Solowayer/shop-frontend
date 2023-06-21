import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type ProductState = {
	product: Product | null
	setProduct: (product: Product | null) => void
	productImages: string[]
	setProductImages: (imageUrls: string[]) => void
	setProductImageDelete: (imageUrl: string) => void
}

export const useProductStore = create<ProductState>()(
	persist(
		devtools(set => ({
			product: null,
			setProduct: product => set(() => ({ product })),
			productImages: [],
			setProductImages: imageUrls => set(() => ({ productImages: imageUrls })),
			setProductImageDelete: imageUrl =>
				set((state: ProductState) => ({
					productImages: state.productImages.filter(productImage => productImage !== imageUrl)
				}))
		})),
		{ name: 'product', version: 1 }
	)
)
