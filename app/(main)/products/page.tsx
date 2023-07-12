'use client'

import React, { useEffect, useState } from 'react'
import Products from '@/components/products'
import ProductService from '@/services/product.service'
import { Spinner } from '@/components/ui'
import { useQuery } from '@tanstack/react-query'
import DefaultError from '@/components/layouts/default-error'
import Pagination from '@/components/pagination'
import { useSearchParams } from 'next/navigation'

// export async function generateStaticParams() {
// 	return [{ page: '1' }, { page: '2' }, { page: '3' }]
// }

export default function Page({ searchParams }: { searchParams: { page: number } }) {
	const PER_PAGE = 4
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [totalPages, setTotalPages] = useState<number>(1)
	const [length, setLength] = useState<number>(1)

	const {
		data: productsData,
		isError,
		isLoading,
		isSuccess,
		refetch
	} = useQuery(
		['products', searchParams.page, PER_PAGE],
		() =>
			ProductService.getAll({
				sort: undefined,
				min_price: undefined,
				max_price: undefined,
				searchTerm: undefined,
				page: searchParams.page,
				limit: PER_PAGE
			}),
		{ keepPreviousData: true }
	)

	useEffect(() => {
		if (isSuccess) {
			setLength(productsData.length)
			setTotalPages(Math.ceil(productsData.length / PER_PAGE))
		}
		console.log('curpage:', currentPage)
	}, [productsData, isSuccess, currentPage])

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
			<Pagination totalPages={totalPages} page={currentPage} setPage={setCurrentPage} />
		</div>
	)
}
