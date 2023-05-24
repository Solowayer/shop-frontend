import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice'

import { authLoginApi } from './api/authLoginApi'

export const store = configureStore({
	reducer: {
		auth: authReducer,

		authLoginApi: authLoginApi.reducer
	},
	middleware(getDefaultMiddleware) {
		return getDefaultMiddleware().concat(authLoginApi.middleware)
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
