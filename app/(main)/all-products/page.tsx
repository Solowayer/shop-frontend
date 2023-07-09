'use client'

import React, { useEffect, useState } from 'react'
import Products from '@/components/products'
import ProductService from '@/services/product.service'
import { Button, Spinner } from '@/components/ui'
import { ChevronLeft, ChevronRight } from '@/components/icons'
import { useQuery } from '@tanstack/react-query'
import DefaultError from '@/components/layouts/default-error'

export default function Page() {
	const perPage = 1
	const [products, setProducts] = useState<Product[]>([])
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [totalPages, setTotalPages] = useState<number>(1)
	const [length, setLength] = useState<number>(1)
	const [loadedPages, setLoadedPages] = useState<number[]>([])

	const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

	const { data, isError, isLoading, isSuccess, refetch } = useQuery({
		queryKey: [
			'all-products',
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
			})
	})

	useEffect(() => {
		if (data) {
			setProducts(prevProducts => [...prevProducts, ...data.products])
			setLength(data.length)
			setTotalPages(Math.ceil(data.length / perPage))
		}
	}, [data])

	const handlePrevPage = () => {
		setProducts([])
		setLoadedPages([])
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1)
		}

		if (loadedPages.length > 0 && loadedPages[0] > 1) {
			setCurrentPage(loadedPages[0] - 1)
		}
	}

	const handleNextPage = () => {
		setProducts([])
		setLoadedPages([])
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1)
		}
	}

	const handleShowMore = () => {
		if (currentPage < totalPages) {
			setLoadedPages(prevPages => [...prevPages, currentPage])
			setCurrentPage(currentPage + 1)
		}
	}

	if (isLoading) {
		return <Spinner width="full" />
	}

	if (isError) {
		return <DefaultError reset={refetch} />
	}

	return (
		<div className="flex flex-col gap-8">
			<h3 className="font-bold text-3xl">Всі товари - {length}</h3>
			<Products products={products} />
			<div className="flex flex-col gap-8">
				<Button intent="secondary" onClick={handleShowMore} disabled={currentPage >= totalPages}>
					Показати ще
				</Button>
				<div className="w-full items-center justify-center flex gap-8">
					<Button shape="circle" onClick={handlePrevPage} disabled={currentPage <= 1 || loadedPages[0] === 1}>
						<ChevronLeft />
					</Button>
					<div className="flex gap-2">
						{pages.map((_, index) => (
							<Button
								key={index}
								intent={`${currentPage === index + 1 ? 'primary' : 'secondary'}`}
								onClick={() => {
									setProducts([])
									setCurrentPage(index + 1)
									setLoadedPages([])
								}}
								disabled={loadedPages.includes(pages[index])}
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
