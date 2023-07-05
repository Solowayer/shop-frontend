import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'

export const useAuthRedirect = () => {
	const { isAuth } = useAuthStore()
	const { replace } = useRouter()

	useEffect(() => {
		if (isAuth) {
			replace('/')
		}
	}, [isAuth, replace])
}
