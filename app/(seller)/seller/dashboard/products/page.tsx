import { ButtonLink } from '@/components/ui/ButtonLink'
import React from 'react'

export default function SellerProducts() {
	return (
		<div className="flex flex-col w-full">
			<div className="flex items-center justify-between">
				<h3 className="text-2xl font-bold">Всі товари</h3>
				<ButtonLink href="seller/dashboard/products/create-product">Додати товар</ButtonLink>
			</div>
		</div>
	)
}
