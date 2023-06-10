'use client'

import Link from 'next/link'
import { Input } from '@/ui/Input'
import { Cart, Person, Search } from './icons'
import { ButtonLink } from '@/ui/ButtonLink'
import { useQuery } from '@tanstack/react-query'
import { fetchCheckAuth } from '@/lib/queries'
import Spinner from '@/ui/Spinner'

import { useAuthStore } from '@/store/authStore'
import { useStore } from '@/store/use-store-hook'
import { useCartStore } from '@/store/cartStore'

export default function Header() {
	const isAuth = useStore(useAuthStore, state => state.isAuth)
	const cartItemsQuantity = useStore(useCartStore, state => state.cartItemsQuantity)
	const { setIsAuth } = useAuthStore()

	const { isLoading } = useQuery({
		queryKey: ['check-auth'],
		queryFn: fetchCheckAuth,
		onSuccess: data => {
			setIsAuth(data)
		},
		retry: false
	})

	return (
		<>
			<div className="flex items-center justify-between px-10 gap-4 text-black h-20 border-b">
				<div className="flex gap-4 items-center">
					<Link href="/" className="font-bold text-2xl">
						SHOP
					</Link>
					<ButtonLink variant="secondary" href="/">
						Продавати на Shop
					</ButtonLink>
				</div>
				<div className="flex items-center gap-4">
					<Input placeholder="Шукати..." icon={<Search />} />
					{isLoading ? (
						<Spinner />
					) : (
						<ButtonLink variant={isAuth ? 'secondary' : 'primary'} href={isAuth ? '/account' : '/auth/login'}>
							{isAuth ? (
								'Мій аккаунт'
							) : (
								<>
									<Person />
									Увійти
								</>
							)}
						</ButtonLink>
					)}
					<ButtonLink variant="secondary" href="/cart">
						<Cart />
						{isAuth && cartItemsQuantity && cartItemsQuantity > 0 ? (
							<span className="absolute py-1 px-2 left-10 bottom-6 bg-red-500 text-white rounded-lg text-sm">
								{cartItemsQuantity}
							</span>
						) : null}
					</ButtonLink>
				</div>
			</div>
		</>
	)
}
