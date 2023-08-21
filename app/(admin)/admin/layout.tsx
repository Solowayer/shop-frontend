import DashboardNav from '@/components/layouts/dashboard-nav'
import React from 'react'
import AdminHeader from '@/components/layouts/admin-header'

export default function Layout({ children }: { children: React.ReactNode }) {
	const navItems = [{ href: '/admin/categories', title: 'Категорії' }]

	return (
		<>
			<AdminHeader />
			<div className="flex h-[calc(100%-80px)]">
				<DashboardNav navItems={navItems} />
				<div className="flex-1 max-w-full">
					<div className="max-w-[1000px] mx-auto p-6">{children}</div>
				</div>
			</div>
		</>
	)
}
