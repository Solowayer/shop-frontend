'use client'

import React, { useEffect, useState } from 'react'
import Products from '@/components/products'
import ProductService from '@/services/product.service'
import { Spinner } from '@/components/ui'
import { useQuery } from '@tanstack/react-query'
import DefaultError from '@/components/layouts/default-error'
import Pagination from '@/components/pagination'
import { usePaginationStore } from '@/store/paginationStore'
import { useRouter } from 'next/navigation'

export default function Page({ params }: { params: { page: number } }) {
	const { perPage, page, setTotalPages } = usePaginationStore()
	const [length, setLength] = useState<number>(1)
	const router = useRouter()

	const {
		data: productsData,
		isError,
		isLoading,
		isSuccess,
		refetch
	} = useQuery({
		queryKey: [
			'products',
			{ sort: 'low-price' },
			{
				filters: {
					min_price: undefined,
					max_price: undefined,
					searchTerm: undefined
				}
			},
			{
				pagination: {
					page: params.page,
					limit: perPage
				}
			}
		],
		queryFn: () =>
			ProductService.getAll({
				sort: 'low-price',
				min_price: undefined,
				max_price: undefined,
				searchTerm: undefined,
				page: params.page,
				limit: perPage
			}),
		keepPreviousData: true
	})

	useEffect(() => {
		if (isSuccess) {
			router.push(`/all-products/${page}`)
			setLength(productsData.length)
			setTotalPages(Math.ceil(productsData.length / perPage))
		}
	}, [isSuccess, page, perPage, productsData, router, setTotalPages])

	if (isError) {
		return <DefaultError reset={refetch} />
	}

	return (
		<div className="flex flex-col gap-8">
			<h3 className="font-bold text-3xl">Всі товари - {length}</h3>
			{isLoading ? <Spinner /> : <Products products={productsData.products} />}
			<Pagination />
		</div>
	)
}
