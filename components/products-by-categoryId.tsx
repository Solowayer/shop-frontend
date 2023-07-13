'use client'

import ProductService from '@/services/product.service'
import React, { useEffect, useState } from 'react'
import Products from './products'
import { useQuery } from '@tanstack/react-query'
import DefaultError from './layouts/default-error'
import { Spinner } from './ui'
import Pagination from './pagination'

export default function ProductsByCategoryId({ id, page, perPage }: { id: number; page: number; perPage: number }) {
	const [totalPages, setTotalPages] = useState<number>(1)

	const {
		data: productData,
		isError,
		isLoading,
		isSuccess,
		refetch
	} = useQuery(['products-byCategoryId', page, perPage], () =>
		ProductService.getByCategoryId(id, {
			sort: undefined,
			min_price: undefined,
			max_price: undefined,
			searchTerm: undefined,
			page: page,
			limit: perPage
		})
	)

	useEffect(() => {
		if (isSuccess && productData) {
			setTotalPages(Math.ceil(productData.length / perPage))
		}
	}, [isSuccess, perPage, productData])

	if (isError) {
		return <DefaultError reset={refetch} />
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			{productData.products.length > 0 ? (
				<div className="flex flex-col gap-8">
					<Products products={productData.products} />
					{totalPages > 1 && <Pagination totalPages={totalPages} />}
				</div>
			) : (
				<span>Товарів поки що немає</span>
			)}
		</>
	)
}
