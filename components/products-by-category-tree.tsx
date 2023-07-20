'use client'

import ProductService from '@/services/product-service'
import React, { useEffect, useState } from 'react'
import Products from './products'
import { useQuery } from '@tanstack/react-query'
import DefaultError from './layouts/default-error'
import { Spinner } from './ui'
import Pagination from './pagination'

export default function ProductsByCategoryTree({ id, page, perPage }: { id: number; page: number; perPage: number }) {
	const [totalPages, setTotalPages] = useState<number>(1)

	const {
		data: productsData,
		isError,
		isLoading,
		isSuccess,
		refetch
	} = useQuery(['products-by-category-tree', page, perPage], () =>
		ProductService.getByCategoryTree(id, {
			sort: undefined,
			min_price: undefined,
			max_price: undefined,
			searchTerm: undefined,
			page: page,
			limit: perPage
		})
	)

	useEffect(() => {
		if (isSuccess && productsData) {
			setTotalPages(Math.ceil(productsData.length / perPage))
		}
	}, [isSuccess, perPage, productsData])

	if (isError) {
		return <DefaultError reset={refetch} />
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			{productsData.products.length > 0 ? (
				<div className="flex flex-col gap-8">
					<Products products={productsData.products} />
					{totalPages > 1 && <Pagination totalPages={totalPages} />}
				</div>
			) : (
				<span>Товарів поки що немає</span>
			)}
		</>
	)
}
