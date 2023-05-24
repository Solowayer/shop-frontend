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
		})
	})
})

export const { useAuthLoginMutation } = authLoginApi
