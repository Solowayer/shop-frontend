'use client'

import Link from 'next/link'
import { Input } from '@/ui/Input'
import { Cart, Person, Search } from './icons'
import { ButtonLink } from '@/ui/ButtonLink'

import { RootState } from '@/store'
import { useSelector } from 'react-redux'

export default function Header() {
	const isAuth: boolean = useSelector((state: RootState) => state.auth.isAuth)
	const user = useSelector((state: RootState) => state.auth.user)

	console.log(isAuth)
	console.log(user)

	return (
		<div className="flex items-center justify-between px-10 gap-4 text-black h-20 border-b">
			<div className="flex gap-4 items-center">
				<Link href="/" className="font-bold text-2xl">
					SHOP
				</Link>
				<ButtonLink variant="secondary" href="/">
					Продавати на Shop
				</ButtonLink>
				<Link href="/account" className="text-md font-medium flex my-8">
					Account
				</Link>
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
