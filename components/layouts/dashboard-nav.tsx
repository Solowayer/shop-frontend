'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavItemsType = {
	href: string
	title: string
}

export default function DashboardNav({ navItems }: { navItems: NavItemsType[] }) {
	const pathname = usePathname()

	return (
		<div className="min-w-[280px] px-6 py-6 bg-zinc-50 border-r h-full gap-1">
			{navItems.map((item, index) => (
				<Link key={index} href={`${item.href}`}>
					<div
						className={`py-2 px-4 rounded w-full hover:bg-zinc-200 ${
							pathname === `${item.href}` ? 'bg-zinc-200 font-medium' : ''
						}`}
					>
						{item.title}
					</div>
				</Link>
			))}
		</div>
	)
}
