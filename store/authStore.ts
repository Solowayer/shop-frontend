import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type AuthState = {
	isAuth: boolean
	setIsAuth: (value: boolean) => void
}

export const useAuthStore = create<AuthState>()(
	persist(
		devtools(set => ({
			isAuth: false,
			setIsAuth: value => set(() => ({ isAuth: value }))
		})),
		{ name: 'isAuth', version: 1 }
	)
)
