import React from 'react'
import AdminHeader from '@/components/layouts/admin-header'
import AdminNav from '@/components/layouts/admin-nav'

export default function Layout({ children }: { children: React.ReactNode }) {
	const navItems = [
		{
			title: 'Категорії',
			children: [
				{
					href: '/admin/categories/all',
					title: 'Всі категорії'
				},
				{
					href: '/admin/categories/create',
					title: 'Додати'
				}
			]
		}
	]

	return (
		<>
			<AdminHeader />
			<div className="flex h-[calc(100%-80px)]">
				<AdminNav navItems={navItems} />
				<div className="flex-1 max-w-full">
					<div className="max-w-[1000px] mx-auto p-6">{children}</div>
				</div>
			</div>
		</>
	)
}
