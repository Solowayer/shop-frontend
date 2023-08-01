'use client'

import ProductCard from '@/components/product-card'
import ProductService from '@/services/product-service'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function Page({ searchParams }: { searchParams: { searchTerm: string } }) {
	const { data: productsData } = useQuery(['products-search', searchParams.searchTerm], () => ProductService.findAll({ searchTerm: searchParams.searchTerm }))

	return (
		<div className="flex flex-col gap-6">
			<div>
				Результати пошуку <span className="text-green-600 font-bold">&quot;{searchParams.searchTerm}&quot;</span>
			</div>
			<div className="grid grid-cols-4 gap-4">
				{productsData &&
					productsData.products.map((product, index) => (
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
			</div>
		</div>
	)
}
