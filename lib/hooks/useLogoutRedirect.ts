import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useUserStore } from '@/store/userStore'

export const useLogoutRedirect = () => {
	const { isAuth } = useUserStore()
	const { replace } = useRouter()
	const pathname = usePathname()

	useEffect(() => {
		if ((!isAuth && pathname.includes('account')) || (!isAuth && pathname.includes('seller'))) {
			replace('/')
		}
	}, [isAuth, pathname, replace])
}
