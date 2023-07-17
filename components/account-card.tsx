import Link from 'next/link'
import React from 'react'

interface IAccountCard {
	href: string
	title: string
	subtitle: string
}

export default function AccountCard({ href, title, subtitle }: IAccountCard) {
	return (
		<Link href={href} passHref className="flex flex-col gap-2 p-6 border hover:bg-zinc-100 rounded overflow-hidden">
			<span className="font-medium text-lg">{title}</span>
			<span className="text-sm text-zinc-500">{subtitle}</span>
		</Link>
	)
}
