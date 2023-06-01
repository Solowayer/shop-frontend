import React from 'react'
import Link from 'next/link'

export default function StyledLink({ href, children }: { href: string; children: React.ReactNode }) {
	return (
		<Link className="text-blue-500 hover:underline" href={href}>
			{children}
		</Link>
	)
}
