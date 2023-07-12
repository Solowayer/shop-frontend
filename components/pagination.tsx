import React, { useEffect } from 'react'
import { Button, ButtonLink } from './ui'
import { ChevronLeft, ChevronRight } from './icons'
import { usePagination } from '@/lib/hooks/usePagination'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

type PaginationProps = {
	totalPages: number
	page: number
	setPage: (page: number) => void
}

export default function Pagination({ totalPages, page, setPage }: PaginationProps) {
	const searchParams = useSearchParams()

	const search = searchParams.get('page')

	console.log('search:', search)

	const pages = usePagination(totalPages, page)

	const handlePrevPage = () => {
		const prevPage = Math.max(page - 1, 1)
		setPage(prevPage)
	}

	const handleNextPage = () => {
		const nextPage = page + 1
		setPage(nextPage)
	}

	useEffect(() => {
		search ? setPage(parseInt(search)) : null
	}, [search, setPage])

	return (
		<div className="w-full items-center justify-center flex gap-8">
			<Link href={`/products?page=${page - 1}`} passHref>
				<Button shape="circle" onClick={handlePrevPage} disabled={page === 1}>
					<ChevronLeft />
				</Button>
			</Link>
			<div className="flex gap-2">
				{pages.map((p, index) => (
					<React.Fragment key={index}>
						{p === -1 ? (
							<span className="inline-flex items-center mx-2">...</span>
						) : (
							<Link href={`/products?page=${p}`}>
								<Button
									intent="secondary"
									onClick={() => {
										if (p !== page) {
											setPage(p)
										}
									}}
									disabled={page === p}
								>
									{p}
								</Button>
							</Link>
						)}
					</React.Fragment>
				))}
			</div>
			<Link href={`/products?page=${page + 1}`}>
				<Button shape="circle" onClick={handleNextPage} disabled={page >= totalPages}>
					<ChevronRight />
				</Button>
			</Link>
		</div>
	)
}
