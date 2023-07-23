'use client'

import React from 'react'
import ListService from '@/services/list-service'
import { useQuery } from '@tanstack/react-query'
import { Spinner } from '@/components/ui'
import ProductService from '@/services/product-service'
import ProductListItems from '@/components/product-list-items'

export default function Page({ params }: { params: { id: number } }) {
	const { data: list, isLoading } = useQuery(['list'], () => ListService.getById(params.id))
	const { data: productsData } = useQuery(['list-products'], () => ProductService.getByList(params.id))

	if (isLoading) return <Spinner />

	return (
		<div className="flex flex-col gap-8">
			<h1 className="w-full text-3xl font-bold">{list?.name}</h1>
			<hr />
			{productsData && <ProductListItems products={productsData.products} />}
		</div>
	)
}
