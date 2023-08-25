'use client'

import EditCategoryForm from '@/components/forms/category/edit-category-form'
import { ChevronLeft } from '@/components/icons'
import { ButtonLink } from '@/components/ui'

export default function Page({ params }: { params: { id: number } }) {
	return (
		<div className="w-full flex flex-col gap-4">
			<ButtonLink intent="secondary" shape="circle" href={`/admin/categories/${params.id}`}>
				<ChevronLeft />
			</ButtonLink>
			<EditCategoryForm categoryId={params.id} />
		</div>
	)
}
