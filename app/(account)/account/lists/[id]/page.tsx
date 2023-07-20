'use client'

import React from 'react'
import ListService from '@/services/list-service'
import { useQuery } from '@tanstack/react-query'
import { Spinner } from '@/components/ui'
import ProductService from '@/services/product-service'
import ProductListCard from '@/components/product-list-card'

export default function Page({ params }: { params: { id: number } }) {
	const { data: list, isLoading } = useQuery(['list'], () => ListService.getById(params.id))
	const { data: productsData } = useQuery(['list-products'], () => ProductService.getByList(params.id))

	if (isLoading) return <Spinner />

	return (
		<>
			<h1 className="w-full text-3xl font-bold">{list?.name}</h1>
			{productsData && (
				<div className="flex flex-col gap-4">
					{productsData.products.map((product, index) => (
						<ProductListCard
							key={index}
							href={''}
							id={product.id}
							images={product.images}
							rating={product.rating}
							name={product.name}
							price={product.price}
						/>
					))}
				</div>
			)}
		</>
	)
}
