'use client'

import React, { useEffect, useState } from 'react'
import Products from '@/components/products'
import { fetchAllProducts } from '@/lib/queries'
import { Button } from '@/components/ui'
import { ChevronLeft, ChevronRight } from '@/components/icons'

export default async function Page() {
	const [products, setProducts] = useState<Product[]>([])
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [totalPages, setTotalPages] = useState<number>(1)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await fetchAllProducts('rating', undefined, undefined, currentPage, 8)
				setProducts(result.products)
				setTotalPages(Math.ceil(result.length / 8))
			} catch (error) {
				console.log(error)
			}
		}

		fetchData()
	}, [currentPage])

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

	return (
		<div className="flex flex-col gap-8">
			<h3 className="font-bold text-3xl">Всі товари</h3>
			<Products products={products} />
			<div className="w-full items-center justify-between flex gap-4">
				<Button shape="circle" onClick={handlePrevPage} disabled={currentPage <= 1}>
					<ChevronLeft />
				</Button>
				<Button shape="circle" onClick={handleNextPage} disabled={currentPage >= totalPages}>
					<ChevronRight />
				</Button>
			</div>
		</div>
	)
}
