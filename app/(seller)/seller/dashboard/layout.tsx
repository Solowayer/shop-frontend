import DashboardHeader from '@/components/layouts/dashboard-header'
import DashboardNav from '@/components/layouts/dashboard-nav'
import React from 'react'

export default function DashbordLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<DashboardHeader />
			<div className="flex h-[calc(100%-80px)]">
				<DashboardNav />
				<div className="flex-1 max-w-full">
					<div className="max-w-[900px] mx-auto p-6">{children}</div>
				</div>
			</div>
		</>
	)
}
