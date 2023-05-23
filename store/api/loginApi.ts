import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

// export const loginApi = createApi({
// 	reducerPath: 'loginApi',
// 	baseQuery: fetchBaseQuery({ baseUrl: `${process.env.api}/user-auth` }),
// 	tagTypes: ['login'],
// 	endpoints: builder => ({
// 		login: builder.query<User, string>({
// 			query: q => `${q}`,
// 			providesTags: (result, error, login) => [{ type: 'login  ', login }]
// 		})
// 	})
// })
