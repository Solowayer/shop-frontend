import Link from 'next/link'
import React from 'react'

export default function DashboardHeader() {
	return (
		<div className="flex items-center h-[80px] w-full border-b">
			<Link href="/" className="text-2xl font-bold px-10">
				SHOP
			</Link>
		</div>
	)
}
