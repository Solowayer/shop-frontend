'use client'

import ProductCard from '@/components/product-card'
import { Spinner } from '@/components/ui'
import ProductService from '@/services/product-service'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function Page({ searchParams }: { searchParams: { q: string } }) {
	const { data: productsData, isLoading: isProductsLoading } = useQuery(['products-search', searchParams.q], () => ProductService.findAll({ q: searchParams.q }))

	if (isProductsLoading) {
		return <Spinner />
	}

	return (
		<div className="flex flex-col gap-6">
			<div>
				Результати пошуку <span className="text-black font-bold">&quot;{searchParams.q}&quot;</span>
				<span className='text-zinc-400 text-sm ml-2'>({productsData?.length} шт)</span>
			</div>
			{productsData && productsData.length > 0 ?
				<div className="grid grid-cols-4 gap-4">
					{productsData.products.map((product, index) => (
						<ProductCard
							key={index}
							href={`/product/${product.slug}`}
							id={product.id}
							images={product.images}
							name={product.name}
							price={product.price}
							rating={product.rating}
						/>
					))}
				</div> : <span>За даними параметрами нічого не знайдено</span>}
		</div>
	)
}
