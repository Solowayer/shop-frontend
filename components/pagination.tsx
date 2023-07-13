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

	useEffect(() => {
		search ? setPage(parseInt(search)) : null
	}, [search, setPage])

	return (
		<div className="w-full items-center justify-center flex gap-8">
			<ButtonLink href={`?page=${Math.max(page - 1, 1)}`} shape="circle" disabled={page === 1}>
				<ChevronLeft />
			</ButtonLink>
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
			<ButtonLink href={page < totalPages ? `?page=${page + 1}` : '#'} shape="circle" disabled={page >= totalPages}>
				<ChevronRight />
			</ButtonLink>
		</div>
	)
}
