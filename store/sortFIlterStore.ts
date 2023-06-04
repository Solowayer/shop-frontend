import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type SortFilterState = {
	sortProducts: ProductSortOption
	minPrice?: number
	maxPrice?: number
	setMinPrice: (value?: number) => void
	setMaxPrice: (value?: number) => void
	setSortProducts: (value: ProductSortOption) => void
	setDeleteFilters: () => void
}

export const useSortStore = create<SortFilterState>()(
	persist(
		devtools(set => ({
			sortProducts: 'rating',
			minPrice: 1,
			maxPrice: undefined,
			setMinPrice: value => set(() => ({ minPrice: value })),
			setMaxPrice: value => set(() => ({ maxPrice: value })),
			setSortProducts: value => set(() => ({ sortProducts: value })),
			setDeleteFilters: () => set(() => ({ minPrice: 1, maxPrice: undefined }))
		})),
		{ name: 'sort-filter', version: 1 }
	)
)
