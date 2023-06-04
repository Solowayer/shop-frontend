import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type SortFilterState = {
	sortProducts: ProductSortOption
	minPrice?: number
	maxPrice?: number
	isClearButton: boolean
	setMinPrice: (value?: number) => void
	setMaxPrice: (value?: number) => void
	setSortProducts: (value: ProductSortOption) => void
	setDeleteFilters: () => void
	setClearButton: (value: boolean) => void
}

export const useSortStore = create<SortFilterState>()(
	persist(
		devtools(set => ({
			sortProducts: 'rating',
			minPrice: 1,
			maxPrice: undefined,
			isClearButton: false,
			setMinPrice: value => set(() => ({ minPrice: value })),
			setMaxPrice: value => set(() => ({ maxPrice: value })),
			setSortProducts: value => set(() => ({ sortProducts: value })),
			setDeleteFilters: () => set(() => ({ minPrice: 1, maxPrice: undefined })),
			setClearButton: value => set(() => ({ isClearButton: value }))
		})),
		{ name: 'sort-filter', version: 1 }
	)
)
