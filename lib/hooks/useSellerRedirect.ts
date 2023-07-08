import { useEffect } from 'react'
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'next/navigation'

export const useSellerRedirect = () => {
	const { isSeller } = useUserStore()
	const { replace } = useRouter()

	useEffect(() => {
		if (isSeller) {
			replace('/seller/dashboard')
		}
	}, [isSeller, replace])
}
