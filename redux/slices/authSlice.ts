'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
	isAuth: boolean
	user: User | null
}

const initialState: AuthState = {
	isAuth: false,
	user: null
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<User>) => {
			state.isAuth = true
			state.user = action.payload
		},
		logout(state) {
			state.isAuth = false
			state.user = null
		}
	}
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
