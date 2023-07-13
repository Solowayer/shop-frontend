import { create } from 'zustand'
// import { devtools, persist } from 'zustand/middleware'

type State = {
	perPage: number
	totalPages: number
	page: number
}

type Actions = {
	setPerPage: (value: number) => void
	setTotalPages: (length: number) => void
	setPage: (value: number) => void
	reset: () => void
}

const initialState: State = {
	perPage: 1,
	totalPages: 1,
	page: 1
}

export const usePaginationStore = create<State & Actions>()(set => ({
	...initialState,

	setPerPage: (value: number) => {
		set({ perPage: value })
	},

	setTotalPages: (length: number) => {
		set({ totalPages: Math.ceil(length / initialState.perPage) })
	},

	setPage: (value: number) => {
		set({ page: value })
	},

	reset: () => {
		set(initialState)
	}
}))
