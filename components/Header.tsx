'use client'

import Link from 'next/link'
import { Input } from '@/ui/Input'
import { Cart, Person, Search } from './icons'
import { ButtonLink } from '@/ui/ButtonLink'

import { RootState } from '@/redux/store'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { useAuthCheckQuery } from '@/redux/api/authLoginApi'
import { login } from '@/redux/slices/authSlice'

import Spinner from '@/ui/Spinner'

export default function Header() {
	const { data, isLoading, isError } = useAuthCheckQuery('')
	const dispatch = useAppDispatch()
	const isAuth = useAppSelector((state: RootState) => state.auth.isAuth)

	if (data) {
		dispatch(login())
	}

	if (isLoading) {
		return <Spinner />
	}

	if (isError) {
		return <div>Стався крінж</div>
	}

	return (
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
				{isAuth ? (
					<ButtonLink variant="secondary" href="/account">
						Мій аккаунт
					</ButtonLink>
				) : (
					<ButtonLink href="/auth/login">
						<Person />
						Увійти
					</ButtonLink>
				)}
				<ButtonLink variant="secondary" href="/cart">
					<Cart />
					Корзина
				</ButtonLink>
			</div>
		</div>
	)
}
