'use client'

import { ChevronRight, ExpandMore } from '@/components/icons'
import { Button, ButtonLink, Spinner } from '@/components/ui'
import CategoryService from '@/services/category-service'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'

export default function Page() {
	const { data: categories, isLoading } = useQuery(['all-categories'], () => CategoryService.findMainCategories())

	if (isLoading) {
		return <Spinner />
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-between items-center">
				<h3 className="text-xl font-bold">Всі категорії</h3>
				<ButtonLink href="/admin/categories/create" shape="round">
					Додати категорію
				</ButtonLink>
			</div>
			<div className="flex flex-col gap-1">
				{categories?.map(category => (
					<Link
						href={`/admin/categories/${category.id}`}
						key={category.id}
						className="flex justify-between items-center border-b py-4 px-4"
					>
						{category.name}
						<ChevronRight />
					</Link>
				))}
			</div>
		</div>
	)
}
