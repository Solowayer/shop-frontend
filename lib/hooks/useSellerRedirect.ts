import { useEffect } from 'react'
import { useSellerStore } from '@/store/sellerStore'
import { useRouter } from 'next/navigation'

export const useSellerRedirect = () => {
	const { isSeller } = useSellerStore()
	const { replace } = useRouter()

	useEffect(() => {
		if (isSeller) {
			replace('/seller/dashboard')
		}
	}, [isSeller, replace])
}
