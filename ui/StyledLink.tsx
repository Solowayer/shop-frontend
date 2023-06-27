import React from 'react'
import Link from 'next/link'

export function StyledLink({ href, children }: { href: string; children: React.ReactNode }) {
	return (
		<Link className="inline-flex text-blue-500 hover:underline" href={href}>
			{children}
		</Link>
	)
}
