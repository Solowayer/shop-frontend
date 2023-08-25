'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ExpandLess, ExpandMore } from '../icons'

type NavItemType = {
	title: string
	children?: { title: string; href: string }[]
}

const NavItem = ({ navItem }: { navItem: NavItemType }) => {
	const [open, setOpen] = useState(false)
	const pathname = usePathname()

	return (
		<div>
			<div
				className={`flex justify-between items-center py-2 px-4 rounded w-full hover:bg-zinc-200 select-none`}
				onClick={() => setOpen(!open)}
			>
				{navItem.title}
				{open ? <ExpandLess /> : <ExpandMore />}
			</div>
			<div className={`${open ? 'flex' : 'hidden'} flex-col`}>
				{navItem.children?.map((child, index) => (
					<Link href={child.href} key={index} className={`py-1 px-4 hover:underline`}>
						<span className={`${pathname === child.href && 'font-medium'}`}>{child.title}</span>
					</Link>
				))}
			</div>
		</div>
	)
}

export default function AdminNav({ navItems }: { navItems: NavItemType[] }) {
	return (
		<div className="min-w-[280px] px-6 py-6 bg-zinc-50 border-r h-full gap-1">
			{navItems.map((item, index) => (
				<NavItem navItem={item} key={index} />
			))}
		</div>
	)
}
