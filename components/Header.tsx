import Link from 'next/link'
import React from 'react'
import { Input } from '@/ui/Input'
import { Search } from './icons'
import { ButtonLink } from '@/ui/ButtonLink'

export default function Header() {
	return (
		<div className="flex items-center justify-between px-10 gap-4 text-black h-20 border border-b-slate-200">
			<div className="flex gap-4 items-center">
				<Link href="/" className="font-bold text-2xl">
					SHOP
				</Link>
				<ButtonLink variant="secondary" href="/seller-auth/signin">
					Продавати на Shop
				</ButtonLink>
			</div>
			<div className="flex items-center gap-4">
				<Input icon={<Search />} />
				<ButtonLink href="/auth/signin">Увійти</ButtonLink>
				<ButtonLink variant="secondary" href="/cart">
					Корзина
				</ButtonLink>
			</div>
		</div>
	)
}
