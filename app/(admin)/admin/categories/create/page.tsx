'use client'

import CategorySelect from '@/components/forms/product/category-select'
import { Button, Input } from '@/components/ui'
import React, { useState } from 'react'

export default function Page() {
	const [categoryId, setCategoryId] = useState<number>(0)
	return (
		<div className="w-full">
			<form className="flex flex-col gap-6" action="">
				<Input label="Назва категорії" />
				<Input label="Slug" />
				<span>Батьківська категорія</span>
				<CategorySelect setCategoryId={setCategoryId} />
				<Button type="submit">Відправити</Button>
			</form>
		</div>
	)
}
