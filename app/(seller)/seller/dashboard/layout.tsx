import DashboardHeader from '@/components/seller/DashboardHeader'
import DashboardNav from '@/components/seller/DashboardNav'
import React from 'react'

export default function DashbordLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="h-screen">
			<DashboardHeader />
			<div className="flex h-[calc(100%-80px)]">
				<DashboardNav />
				<div className="w-full">
					<div className="max-w-[1200px] m-auto px-10 py-6">{children}</div>
				</div>
			</div>
		</div>
	)
}
