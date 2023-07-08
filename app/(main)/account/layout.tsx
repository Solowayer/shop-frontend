import React from 'react'

export default async function Layout({ children }: { children: React.ReactNode }) {
	return <div className="flex flex-col gap-6">{children}</div>
}
