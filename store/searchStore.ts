import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type SearchState = {}

export const useSortStore = create<SearchState>()(
	persist(
		devtools(set => ({})),
		{ name: 'search', version: 1 }
	)
)
