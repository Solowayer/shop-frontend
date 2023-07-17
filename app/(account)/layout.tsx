import SiteHeader from '@/components/layouts/site-header'
import React from 'react'

export default async function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<SiteHeader />
			<div className="px-10 my-6 max-w-[1000px] m-auto">{children}</div>
		</>
	)
}
