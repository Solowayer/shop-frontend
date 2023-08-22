import React from 'react'
import SellerHeader from '@/components/layouts/seller-header'
import SellerNav from '@/components/layouts/seller-nav'

export default function Layout({ children }: { children: React.ReactNode }) {
	const navItems = [
		{ href: '/seller/dashboard', title: 'Дашборд' },
		{ href: '/seller/dashboard/products', title: 'Всі товари' }
	]

	return (
		<>
			<SellerHeader />
			<div className="flex h-[calc(100%-80px)]">
				<SellerNav navItems={navItems} />
				<div className="flex-1 max-w-full">
					<div className="max-w-[1000px] mx-auto p-6">{children}</div>
				</div>
			</div>
		</>
	)
}
