'use client'

import Link from 'next/link'
import { Spinner, ButtonLink, Input } from '@/components/ui'
import { Cart, Person, Search } from '../icons'
import { useQuery } from '@tanstack/react-query'

import SellerService from '@/services/seller.service'
import AuthService from '@/services/auth.service'

import { useAuthStore } from '@/store/authStore'
import { useStore } from '@/store/use-store-hook'
import { useCartStore } from '@/store/cartStore'
import { useEffect } from 'react'
import { useSellerStore } from '@/store/sellerStore'

export default function SiteHeader() {
	const isAuth = useStore(useAuthStore, state => state.isAuth)
	const isSeller = useStore(useSellerStore, state => state.isSeller)
	const totalQuantity = useStore(useCartStore, state => state.totalQuantity)
	const { setIsAuth } = useAuthStore()
	const { setIsSeller } = useSellerStore()

	const {
		data: dataIsAuth,
		isLoading: isAuthLoading,
		isSuccess: isAuthSuccess,
		isError: isAuthError
	} = useQuery({
		queryKey: ['check-auth'],
		queryFn: AuthService.checkAuth,
		retry: false
	})

	const {
		data: dataIsSeller,
		// isLoading: isSellerLoading,
		isSuccess: isSellerSuccess,
		isError: isSellerError
	} = useQuery({
		queryKey: ['check-seller'],
		queryFn: SellerService.check,
		retry: false
	})

	useEffect(() => {
		if (isAuthSuccess) {
			setIsAuth(dataIsAuth)
		}
		if (isSellerSuccess) {
			setIsSeller(dataIsSeller)
		}
	}, [dataIsAuth, dataIsSeller, isAuthSuccess, isSellerSuccess, setIsAuth, setIsSeller])

	console.log('isSeller:', isSeller)

	return (
		<>
			<div className="flex items-center justify-between px-10 gap-4 text-black h-20 border-b">
				<div className="flex gap-4 items-center">
					<div className="flex flex-col">
						<Link href="/" className="font-bold text-2xl">
							SHOP
						</Link>
						{!isAuth && <span className="text-zinc-600 text-sm">Увійдіть, щоб купувати або продавати</span>}
					</div>
				</div>
				<div className="flex items-center gap-4">
					<Input placeholder="Шукати..." icon={<Search />} />

					{isAuth && (
						<ButtonLink intent="secondary" href={isSeller ? '/seller/dashboard' : '/seller/register'}>
							Кабінет продавця
						</ButtonLink>
					)}

					<ButtonLink intent={isAuth ? 'secondary' : 'primary'} href={isAuth ? '/account' : '/auth/login'}>
						{isAuth ? (
							'Мій аккаунт'
						) : (
							<>
								<Person />
								Увійти
							</>
						)}
					</ButtonLink>

					<ButtonLink intent="secondary" href="/cart">
						<Cart />
						{isAuth && totalQuantity && totalQuantity > 0 ? (
							<span className="absolute py-1 px-2 left-10 bottom-6 bg-red-500 text-white rounded-lg text-sm">
								{totalQuantity}
							</span>
						) : null}
					</ButtonLink>
				</div>
			</div>
		</>
	)
}
