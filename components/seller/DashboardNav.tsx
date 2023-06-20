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
		{ href: 'seller/dashboard', title: 'Дашборд' },
		{ href: 'seller/dashboard/products', title: 'Всі товари' }
	]

	const pathname = usePathname()

	return (
		<div className="min-w-[280px] px-6 py-6 border-r h-full gap-1">
			{navItems.map((item, index) => (
				<Link key={index} href={item.href}>
					<div
						className={`py-2 px-4 rounded w-full hover:bg-zinc-200 ${
							pathname === `/${item.href}` ? 'bg-zinc-200 font-medium' : ''
						}`}
					>
						{item.title}
					</div>
				</Link>
			))}
		</div>
	)
}
