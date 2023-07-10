'use client'

import ProductService from '@/services/product.service'
import React from 'react'
import Products from './products'
import { useQuery } from '@tanstack/react-query'
import DefaultError from './layouts/default-error'
import { Spinner } from './ui'

export default function ProductsByCategoryId({ id }: { id: number }) {
	const {
		data: productData,
		isError,
		isLoading,
		refetch
	} = useQuery({
		queryKey: ['products-byCategoryId'],
		queryFn: () => ProductService.getByCategoryId(id)
	})

	if (isError) {
		return <DefaultError reset={refetch} />
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			{productData.products.length > 0 ? (
				<Products products={productData.products} />
			) : (
				<span>Товарів поки що немає</span>
			)}
		</>
	)
}
