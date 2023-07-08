import { useEffect } from 'react'
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'next/navigation'

export const useAuthRedirect = () => {
	const { isAuth } = useUserStore()
	const { replace } = useRouter()

	useEffect(() => {
		if (isAuth) {
			replace('/')
		}
	}, [isAuth, replace])
}
