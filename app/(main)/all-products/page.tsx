'use client'

import React, { useEffect, useState } from 'react'
import Products from '@/components/products'
import ProductService from '@/services/product.service'
import { Button, Spinner } from '@/components/ui'
import { ChevronLeft, ChevronRight } from '@/components/icons'
import { useQuery } from '@tanstack/react-query'

export default function Page() {
	const perPage = 16
	const [products, setProducts] = useState<Product[]>([])
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [totalPages, setTotalPages] = useState<number>(1)
	const [length, setLength] = useState<number>(1)

	const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

	const { data, isError, isLoading, isSuccess } = useQuery({
		queryKey: ['all-products', 'newest', undefined, undefined, undefined, currentPage, perPage],
		queryFn: () =>
			ProductService.getAll({
				sort: 'low-price',
				min_price: undefined,
				max_price: undefined,
				searchTerm: undefined,
				page: currentPage,
				limit: perPage
			}),
		retry: false
	})

	useEffect(() => {
		if (isSuccess && data) {
			setProducts(data.products)
			setLength(data.length)
			setTotalPages(Math.ceil(data.length / perPage))
		}
	}, [data, isSuccess])

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1)
		}
	}

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1)
		}
	}

	if (isError) {
		return <h3>Помилка</h3>
	}

	if (isLoading) {
		return <Spinner width="full" />
	}

	return (
		<div className="flex flex-col gap-8">
			<h3 className="font-bold text-3xl">Всі товари - {length}</h3>
			<Products products={products} />
			<div className="w-full items-center justify-between flex gap-4">
				<Button shape="circle" onClick={handlePrevPage} disabled={currentPage <= 1}>
					<ChevronLeft />
				</Button>
				<div className="flex gap-2">
					{pages.map((_, index) => (
						<Button
							key={index}
							intent={`${currentPage === index + 1 ? 'primary' : 'secondary'}`}
							onClick={() => setCurrentPage(index + 1)}
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
	)
}
