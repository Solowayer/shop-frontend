'use client'

import { ButtonLink } from '@/components/ui/ButtonLink'
import { fetchSellerProducts } from '@/lib/queries'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Spinner from '@/components/ui/Spinner'
import ProductTable from '@/components/seller/product-table/ProductTable'

export default function SellerProducts() {
	const {
		data: products,
		isError,
		isLoading
	} = useQuery({
		queryKey: ['seller-products'],
		queryFn: () => fetchSellerProducts(),
		retry: false
	})

	if (isError) {
		return <h3>Помилка</h3>
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<div className="flex flex-col w-full gap-6">
			<div className="flex items-center justify-between">
				<h3 className="text-2xl font-bold">Всі товари</h3>
				<ButtonLink href="seller/dashboard/products/create-product">Додати товар</ButtonLink>
			</div>
			<ProductTable products={products} />
		</div>
	)
}
