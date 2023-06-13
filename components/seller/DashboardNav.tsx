import React from 'react'
import StyledLink from '../ui/StyledLink'

export default function DashboardNav() {
	return (
		<div className="w-[280px] flex flex-col px-6 py-6 border-r h-full">
			<StyledLink href="seller/dashboard">Дашборд</StyledLink>
			<StyledLink href="seller/dashboard/products">Всі товари</StyledLink>
		</div>
	)
}
