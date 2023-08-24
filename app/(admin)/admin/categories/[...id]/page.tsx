import { ChevronLeft, ChevronRight } from '@/components/icons'
import { Button, ButtonLink } from '@/components/ui'
import AttributeService from '@/services/attribute-service'
import CategoryService from '@/services/category-service'
import Link from 'next/link'
import React from 'react'

export default async function Page({ params }: { params: { id: number } }) {
	const categoryData = await CategoryService.findCategoryAndChildrenById(params.id)

	return (
		<div className="flex flex-col gap-4">
			<ButtonLink
				intent="secondary"
				shape="circle"
				href={`${categoryData.category.parentId !== null ? categoryData.category.parentId : '/admin/categories'}`}
			>
				<ChevronLeft />
			</ButtonLink>

			<div className="flex justify-between items-center">
				<h3 className="text-xl font-bold">{categoryData.category.name}</h3>
				<Button intent="secondary" shape="round">
					Змінити
				</Button>
			</div>
			<div className="flex flex-col">
				{categoryData.children.map(subCategory => (
					<Link
						href={`/admin/categories/${subCategory.id}`}
						key={subCategory.id}
						className="flex justify-between items-center border-b py-4 px-4"
					>
						{subCategory.name}
						{subCategory.children && subCategory.children.length > 0 && <ChevronRight />}
					</Link>
				))}
			</div>
		</div>
	)
}
