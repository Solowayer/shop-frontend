'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchCheckSeller } from '@/lib/queries'

import { useSellerStore } from '@/store/sellerStore'
import { useStore } from '@/store/use-store-hook'

export default function Seller() {
	const isSeller = useStore(useSellerStore, state => state.isSeller)

	const { data, isSuccess } = useQuery({
		queryKey: ['check-seller'],
		queryFn: fetchCheckSeller,
		retry: false
	})

	return <>{data && isSeller ? 'Sup' : 'ss'}</>
}
