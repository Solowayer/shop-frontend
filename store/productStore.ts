import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type ProductState = {
	product: Product | null
	setProduct: (product: Product | null) => void

	productImageUrls: string[]
	setProductImageUrls: (imageUrls: string[]) => void

	productImages: File[]
	setProductImages: (images: File[]) => void

	setProductImageDelete: (index: number) => void
}

export const useProductStore = create<ProductState>()(
	persist(
		devtools(set => ({
			product: null,
			setProduct: product => set(() => ({ product })),

			productImageUrls: [],
			setProductImageUrls: imageUrls => set(() => ({ productImageUrls: imageUrls })),

			productImages: [],
			setProductImages: images => set(() => ({ productImages: images })),
			setProductImageDelete: index =>
				set((state: ProductState) => {
					const updatedImages = [...state.productImages]
					const updatedImageUrls = [...state.productImageUrls]

					updatedImages.splice(index, 1)
					updatedImageUrls.splice(index, 1)

					return {
						productImages: updatedImages,
						productImageUrls: updatedImageUrls
					}
				})
		})),
		{ name: 'product', version: 1 }
	)
)
