import Link from 'next/link'
import React from 'react'

export default function AdminHeader() {
	return (
		<div className="flex items-center h-[80px] border-b">
			<Link href="/admin" className="text-2xl font-bold px-10">
				SHOP <span className="text-violet-500">ADMIN</span>
			</Link>
		</div>
	)
}
