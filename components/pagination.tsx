import React from 'react'
import { Button } from './ui'
import { ChevronLeft, ChevronRight } from './icons'
import { usePagination } from '@/lib/hooks/usePagination'

type PaginationProps = {
	totalPages: number
	page: number
	setPage: React.Dispatch<React.SetStateAction<number>>
}

export default function Pagination({ totalPages, page, setPage }: PaginationProps) {
	const pages = usePagination(totalPages, page)

	const handlePrevPage = () => {
		const prevPage = Math.max(page - 1, 1)
		setPage(prevPage)
	}

	const handleNextPage = () => {
		const nextPage = page + 1
		setPage(nextPage)
	}

	return (
		<div className="w-full items-center justify-center flex gap-8">
			<Button shape="circle" onClick={handlePrevPage} disabled={page === 1}>
				<ChevronLeft />
			</Button>
			<div className="flex gap-2">
				{pages.map((p, index) => (
					<React.Fragment key={index}>
						{p === -1 ? (
							<span className="inline-flex items-center mx-2">...</span>
						) : (
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
						)}
					</React.Fragment>
				))}
			</div>
			<Button shape="circle" onClick={handleNextPage} disabled={page >= totalPages}>
				<ChevronRight />
			</Button>
		</div>
	)
}
