'use client'

import React, { useEffect, useState } from 'react'
import { Button, ButtonLink } from './ui'
import { ChevronLeft, ChevronRight } from './icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type PaginationProps = {
	totalPages: number
	page: number
	setPage: React.Dispatch<React.SetStateAction<number>>
}

export default function Pagination({ totalPages, page, setPage }: PaginationProps) {
	let pages: number[] = Array.from({ length: totalPages }, (_, index) => index + 1)
	const maxVisiblePages = 9

	if (totalPages > maxVisiblePages) {
		const middlePage = Math.ceil(maxVisiblePages / 2)

		if (page <= middlePage) {
			pages = [...pages.slice(0, maxVisiblePages - 2), -1, totalPages]
		} else if (page > totalPages - middlePage) {
			pages = [1, -1, ...pages.slice(totalPages - maxVisiblePages + 2)]
		} else {
			const startPage = page - Math.floor((maxVisiblePages - 3) / 2)
			const endPage = page + Math.floor((maxVisiblePages - 4) / 2)
			pages = [1, -1, ...pages.slice(startPage, endPage), -1, totalPages]
		}
	}

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
