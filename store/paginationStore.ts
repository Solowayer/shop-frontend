import { create } from 'zustand'
// import { devtools, persist } from 'zustand/middleware'

type State = {
	perPage: number
	totalPages: number
	page: number
}

type Actions = {
	setPerPage: (value: number) => void
	setTotalPages: (value: number) => void
	setPage: (value: number) => void
	reset: () => void
}

const initialState: State = {
	perPage: 8,
	totalPages: 1,
	page: 1
}

export const usePaginationStore = create<State & Actions>()(set => ({
	...initialState,

	setPerPage: (value: number) => {
		set({ perPage: value })
	},

	setTotalPages: (value: number) => {
		set({ totalPages: value })
	},

	setPage: (value: number) => {
		set({ page: value })
	},

	reset: () => {
		set(initialState)
	}
}))
