import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type ProductState = {
	product: Product | null
	setProduct: (product: Product | null) => void
	productImages: string[]
	setProductImages: (images: string[]) => void
	setProductImageDelete: (image: string) => void
}

export const useProductStore = create<ProductState>()(
	persist(
		devtools(set => ({
			product: null,
			setProduct: product => set(() => ({ product })),
			productImages: [],
			setProductImages: images => set(() => ({ productImages: images })),
			setProductImageDelete: image =>
				set((state: ProductState) => ({
					productImages: state.productImages.filter(productImage => productImage !== image)
				}))
		})),
		{ name: 'product', version: 1 }
	)
)
