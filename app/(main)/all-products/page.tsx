'use client'

import React, { useEffect, useState } from 'react'
import Products from '@/components/products'
import ProductService from '@/services/product.service'
import { Button, Spinner } from '@/components/ui'
import { ChevronLeft, ChevronRight } from '@/components/icons'
import { useQuery } from '@tanstack/react-query'
import DefaultError from '@/components/layouts/default-error'

export default function Page() {
	const perPage = 8
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [totalPages, setTotalPages] = useState<number>(1)
	const [length, setLength] = useState<number>(1)

	const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

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
					page: currentPage,
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
				page: currentPage,
				limit: perPage
			}),
		keepPreviousData: true
	})

	useEffect(() => {
		if (isSuccess) {
			setLength(productsData.length)
			setTotalPages(Math.ceil(productsData.length / perPage))
		}
	}, [productsData, isSuccess])

	if (isLoading) {
		return <Spinner width="full" />
	}

	if (isError) {
		return <DefaultError reset={refetch} />
	}

	const handlePrevPage = () => {
		setCurrentPage(old => Math.max(old - 1, 1))
	}

	const handleNextPage = () => {
		setCurrentPage(old => old + 1)
	}

	return (
		<div className="flex flex-col gap-8">
			<h3 className="font-bold text-3xl">Всі товари - {length}</h3>
			<Products products={productsData.products} />
			<div className="flex flex-col gap-8">
				<div className="w-full items-center justify-center flex gap-8">
					<Button shape="circle" onClick={handlePrevPage} disabled={currentPage === 1}>
						<ChevronLeft />
					</Button>
					<div className="flex gap-2">
						{pages.map((_, index) => (
							<Button
								key={index}
								intent={`${currentPage === index + 1 ? 'primary' : 'secondary'}`}
								onClick={() => {
									setCurrentPage(index + 1)
								}}
								disabled={currentPage === index + 1}
							>
								{index + 1}
							</Button>
						))}
					</div>
					<Button shape="circle" onClick={handleNextPage} disabled={currentPage >= totalPages}>
						<ChevronRight />
					</Button>
				</div>
			</div>
		</div>
	)
}
