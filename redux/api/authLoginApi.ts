import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authLoginApi = createApi({
	reducerPath: 'authLoginApi',
	baseQuery: fetchBaseQuery({ baseUrl: `${process.env.api}/user-auth`, credentials: 'include' }),
	endpoints: builder => ({
		// User - отримуємо, UserLogin - віддаємо
		authLogin: builder.mutation<User, UserLogin>({
			query: body => ({
				url: 'login',
				method: 'POST',
				body
			})
		}),
		authLogout: builder.mutation<void, void>({
			query: body => ({
				url: 'logout',
				method: 'POST',
				body
			})
		}),
		authCheck: builder.query<boolean, string>({
			query: () => ({
				url: 'check-auth'
			})
		})
	})
})

export const { useAuthLoginMutation, useAuthLogoutMutation, useAuthCheckQuery } = authLoginApi
