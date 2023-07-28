'use client'

import React from 'react'
import ListService from '@/services/list-service'
import { useQuery } from '@tanstack/react-query'
import { Spinner } from '@/components/ui'
import ProductService from '@/services/product-service'
import FavoriteItems from '@/components/favorite-items'

export default function Page({ params }: { params: { id: number } }) {
	const { data: list, isLoading } = useQuery([`list-${params.id}`], () => ListService.findById(params.id))
	const { data: productsData } = useQuery([`list-products-${params.id}`], () => ProductService.findByList(params.id))

	if (isLoading) return <Spinner />

	return (
		<div className="flex flex-col gap-8">
			<h1 className="w-full text-3xl font-bold">{list?.name}</h1>
			<hr />
			{productsData && productsData.products.length > 0 ? (
				<FavoriteItems products={productsData.products} listId={params.id} />
			) : (
				<span>Тут нічого немає</span>
			)}
		</div>
	)
}
