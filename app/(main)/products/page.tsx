'use client'

import React, { useEffect, useState } from 'react'
import Products from '@/components/products'
import ProductService from '@/services/product.service'
import { Spinner } from '@/components/ui'
import { useQuery } from '@tanstack/react-query'
import DefaultError from '@/components/layouts/default-error'
import Pagination from '@/components/pagination'

export default function Page() {
	const perPage = 1
	const [page, setPage] = useState<number>(1)
	const [totalPages, setTotalPages] = useState<number>(1)
	const [length, setLength] = useState<number>(1)

	const {
		data: productsData,
		isError,
		isLoading,
		isSuccess,
		refetch
	} = useQuery({
		queryKey: ['products', undefined, undefined, undefined, undefined, page, perPage],
		queryFn: () =>
			ProductService.getAll({
				sort: undefined,
				min_price: undefined,
				max_price: undefined,
				searchTerm: undefined,
				page,
				limit: perPage
			}),
		keepPreviousData: true
	})

	useEffect(() => {
		if (isSuccess) {
			setLength(productsData.length)
			setTotalPages(Math.ceil(productsData.length / perPage))
		}
		console.log('curpage:', page)
	}, [productsData, isSuccess, page])

	if (isLoading) {
		return <Spinner width="full" />
	}

	if (isError) {
		return <DefaultError reset={refetch} />
	}

	return (
		<div className="flex flex-col gap-8">
			<h3 className="font-bold text-3xl">Всі товари - {length}</h3>
			<Products products={productsData.products} />
			<Pagination totalPages={totalPages} page={page} setPage={setPage} />
		</div>
	)
}
