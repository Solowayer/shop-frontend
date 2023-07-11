import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type State = {
	perPage: number
	page: number
	totalPages: number
}

type Actions = {
	setPerPage: (value: number) => void
	setPage: (value: number) => void
	setTotalPages: (value: number) => void
}

const initialState: State = {
	perPage: 2,
	page: 1,
	totalPages: 1
}

export const usePaginationStore = create<State & Actions>()(set => ({
	...initialState,

	setPerPage: (value: number) => {
		set({ perPage: value })
	},

	setPage: (value: number) => {
		set({ page: value })
	},

	setTotalPages: (value: number) => {
		set({ totalPages: value })
	}
}))
