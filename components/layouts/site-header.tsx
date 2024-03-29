'use client'

import Link from 'next/link'
import { Button, ButtonLink, Input } from '@/components/ui'
import { Cart, Person, Search } from '../icons'
import { useMutation, useQuery } from '@tanstack/react-query'

import AuthService from '@/services/auth-service'
import SellerService from '@/services/seller-service'
import CartService from '@/services/cart-service'

import { useStore } from '@/store/use-store-hook'
import { useEffect } from 'react'
import { useUserStore } from '@/store/userStore'
// import { useLogoutRedirect } from '@/lib/hooks/useLogoutRedirect'

import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuGroup
} from '@/components/ui/dropdown-menu'
import { siteConfig } from '@/config/site'
import SearchForm from '../forms/search-form'

export default function SiteHeader() {
	const isAuth = useStore(useUserStore, state => state.isAuth)
	const cartTotalQty = useStore(useUserStore, state => state.cartTotalQty)
	const { setIsAuth, setIsSeller, setCartTotalQty, reset } = useUserStore()

	const { data: dataIsAuth, isSuccess: isAuthSuccess } = useQuery({
		queryKey: ['check-auth'],
		queryFn: AuthService.checkAuth
	})

	const { data: dataIsSeller, isSuccess: isSellerSuccess } = useQuery({
		queryKey: ['check-seller'],
		queryFn: SellerService.check
	})

	const { data: cartData, isSuccess: cartIsSuccess } = useQuery({
		queryKey: ['cart'],
		queryFn: CartService.findAllCartItems
	})

	const exitMutation = useMutation({
		mutationFn: AuthService.logout,
		onSuccess: () => {
			reset()
		}
	})

	const handleLogout = async () => {
		try {
			exitMutation.mutate()
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (isAuthSuccess) setIsAuth(dataIsAuth)
		if (isSellerSuccess) setIsSeller(dataIsSeller)
		if (cartIsSuccess && cartData.totalQuantity) {
			setCartTotalQty(cartData.totalQuantity)
		} else {
			setCartTotalQty(0)
		}
	}, [
		cartData,
		cartIsSuccess,
		dataIsAuth,
		dataIsSeller,
		isAuthSuccess,
		isSellerSuccess,
		setCartTotalQty,
		setIsAuth,
		setIsSeller
	])

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
				<SearchForm />
				<div className="flex items-center gap-4">
					{isAuth ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button shape="square" intent="secondary">
									<Person />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuGroup>
									{siteConfig.userHeaderMenu.map(item => (
										<DropdownMenuItem key={item.title} asChild>
											<Link href={item.href}>{item.title}</Link>
										</DropdownMenuItem>
									))}
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={handleLogout}>Вийти</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<ButtonLink href="/auth/login">
							<Person />
							Увійти
						</ButtonLink>
					)}

					<ButtonLink shape="square" intent="secondary" href="/cart">
						<Cart />
						{isAuth && cartTotalQty && cartTotalQty > 0 ? (
							<span className="absolute py-1 px-2 left-8 bottom-6 bg-red-500 text-white rounded-lg text-sm">
								{cartTotalQty}
							</span>
						) : null}
					</ButtonLink>
				</div>
			</div>
		</>
	)
}
