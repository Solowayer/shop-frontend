import DashboardHeader from '@/components/seller/DashboardHeader'
import DashboardNav from '@/components/seller/DashboardNav'
import React from 'react'

export default function DashbordLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-screen h-screen min-w-full">
			<DashboardHeader />
			<div className="flex h-[calc(100%-80px)]">
				<DashboardNav />
				<div className="p-6 w-full">
					<div className="max-w-[1000px] m-auto">{children}</div>
				</div>
			</div>
		</div>
	)
}
