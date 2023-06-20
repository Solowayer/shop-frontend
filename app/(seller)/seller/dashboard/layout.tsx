import DashboardHeader from '@/components/seller/DashboardHeader'
import DashboardNav from '@/components/seller/DashboardNav'
import React from 'react'

export default function DashbordLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-screen h-screen min-w-full overflow-x-hidden">
			<DashboardHeader />
			<div className="flex h-[calc(100%-80px)]">
				<DashboardNav />
				<div className="flex-1 max-w-full">
					<div className="max-w-[900px] mx-auto p-6">{children}</div>
				</div>
			</div>
		</div>
	)
}
