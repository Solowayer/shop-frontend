'use client'

import Link from 'next/link'
import React from 'react'
import { Input } from '@/ui/Input'
import { Cart, Person, Search } from './icons'
import { ButtonLink } from '@/ui/ButtonLink'

export default function Header() {
	const token = null

	return (
		<div className="flex items-center justify-between px-10 gap-4 text-black h-20 border-b">
			<div className="flex gap-4 items-center">
				<Link href="/" className="font-bold text-2xl">
					SHOP
				</Link>
				<ButtonLink variant="secondary" href="/seller-auth/signin">
					Продавати на Shop
				</ButtonLink>
			</div>
			<div className="flex items-center gap-4">
				<Input placeholder="Шукати..." icon={<Search />} />
				{token ? (
					<ButtonLink variant="secondary" href="/account">
						Мій аккаунт
					</ButtonLink>
				) : (
					<ButtonLink href="/auth/signin">
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
