'use client'

import CategoryService from '@/services/category-service'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function Page() {
	const { data: categories } = useQuery(['all-categories'], () => CategoryService.findTree())

	function renderCategory(category: Category) {
		return (
			<div key={category.id}>
				<span>{category.name}</span>
				{category.children && category.children.length > 0 && (
					<div className="pl-4">{category.children.map(childCategory => renderCategory(childCategory))}</div>
				)}
			</div>
		)
	}

	return (
		<div className="flex flex-col gap-4">
			<h3 className="text-xl font-bold">Всі категорії</h3>
			<div className="flex flex-col gap-1">{categories?.map(category => renderCategory(category))}</div>
		</div>
	)
}
