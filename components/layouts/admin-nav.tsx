'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ExpandLess, ExpandMore } from '../icons'

type NavItemsType = {
	title: string
	children?: { title: string; href: string }[]
}

export default function AdminNav({ navItems }: { navItems: NavItemsType[] }) {
	const [open, setOpen] = useState(false)
	const pathname = usePathname()

	return (
		<div className="min-w-[280px] px-6 py-6 bg-zinc-50 border-r h-full gap-1">
			{navItems.map((item, index) => (
				<>
					<div
						key={index}
						className={`flex justify-between items-center py-2 px-4 rounded w-full hover:bg-zinc-200 select-none`}
						onClick={() => setOpen(!open)}
					>
						{item.title}
						{open ? <ExpandLess /> : <ExpandMore />}
					</div>
					<div className={`${open ? 'flex' : 'hidden'} flex-col`}>
						{item.children?.map((child, index) => (
							<Link href={child.href} key={index} className={`py-2 px-4 hover:underline`}>
								<span className={`${pathname === child.href && 'font-medium'}`}>{child.title}</span>
							</Link>
						))}
					</div>
				</>
			))}
		</div>
	)
}
