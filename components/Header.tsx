import Link from 'next/link'
import React from 'react'
import { Input } from '@/ui/Input'
import { Search } from './icons'
import { ButtonLink } from '@/ui/ButtonLink'

export default function Header() {
	return (
		<div className="flex items-center px-10 gap-4 text-black h-20 border border-b-slate-200">
			<Link href="/" className="font-bold text-2xl">
				SHOP
			</Link>
			<Input icon={<Search />} fullWidth />
			<ButtonLink href="/auth/signin">Увійти</ButtonLink>
			<ButtonLink variant="secondary" href="/cart">
				Корзина
			</ButtonLink>
		</div>
	)
}
