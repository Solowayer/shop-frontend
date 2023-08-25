'use client'

import CreateCategoryForm from '@/components/forms/category/create-category-form'
import { ChevronLeft } from '@/components/icons'
import { ButtonLink } from '@/components/ui'

export default function Page() {
	return (
		<div className="w-full flex flex-col gap-4">
			<ButtonLink intent="secondary" shape="circle" href={`/admin/categories`}>
				<ChevronLeft />
			</ButtonLink>
			<CreateCategoryForm />
		</div>
	)
}
