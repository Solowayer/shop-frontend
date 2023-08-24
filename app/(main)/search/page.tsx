'use client'

import ProductsGrid from '@/components/products-grid'
import { Spinner } from '@/components/ui'
import ProductService from '@/services/product-service'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function Page({ searchParams }: { searchParams: { q: string } }) {
	const { data: productsData, isLoading: isProductsLoading } = useQuery(['products-search', searchParams.q], () =>
		ProductService.findAllProducts({ q: searchParams.q })
	)

	if (isProductsLoading) {
		return <Spinner />
	}

	return (
		<div className="flex flex-col gap-6">
			<div>
				Результати пошуку <span className="text-black font-bold">&quot;{searchParams.q}&quot;</span>
				<span className="text-zinc-400 text-sm ml-2">({productsData?.length} шт)</span>
			</div>
			{productsData && productsData.length > 0 ? (
				<ProductsGrid products={productsData.products} />
			) : (
				<span>За даними параметрами нічого не знайдено</span>
			)}
		</div>
	)
}
