'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DashboardNav() {
	type NavItemsType = {
		href: string
		title: string
	}

	const navItems: NavItemsType[] = [
		{ href: 'dashboard', title: 'Дашборд' },
		{ href: 'dashboard/products', title: 'Всі товари' }
	]

	const pathname = usePathname()

	return (
		<div className="min-w-[280px] px-6 py-6 border-r h-full gap-1">
			{navItems.map((item, index) => (
				<Link key={index} href={`/seller/${item.href}`}>
					<div
						className={`py-2 px-4 rounded w-full hover:bg-zinc-200 ${
							pathname === `/seller/${item.href}` ? 'bg-zinc-200 font-medium' : ''
						}`}
					>
						{item.title}
					</div>
				</Link>
			))}
		</div>
	)
}
