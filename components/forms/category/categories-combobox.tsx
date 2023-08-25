'use client'

import { Spinner } from '@/components/ui'
import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption } from '@/components/ui/combobox'
import CategoryService from '@/services/category-service'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

type Props = {
	setCategoryId: (categoryId: number) => void
	value?: string
}

export default function CategoriesCombobox({ setCategoryId, value }: Props) {
	const [selectedValue, setSelectedValue] = useState<string | undefined>(value)
	const [searchTerm, setSearchTerm] = useState<string>('')

	const { data: categories, isLoading } = useQuery(['all-categories'], () => CategoryService.findAllCategories())

	const filteredCategories =
		searchTerm === ''
			? categories
			: categories?.filter(cat => {
					return cat.name.toLowerCase().includes(searchTerm.toLowerCase())
			  })

	return (
		<div className="flex flex-col gap-2">
			<span>Батьківська категорія</span>
			<Combobox value={selectedValue} defaultValue="Вибрати...">
				<ComboboxInput value={searchTerm} onValueChange={setSearchTerm} />
				<ComboboxOptions>
					{filteredCategories?.map(item => (
						<ComboboxOption
							key={item.id}
							selected={item.name === selectedValue}
							onClick={() => {
								setSelectedValue(item.name)
								setCategoryId(item.id)
							}}
						>
							{item.name}
						</ComboboxOption>
					))}
				</ComboboxOptions>
				{isLoading && <Spinner />}
			</Combobox>
		</div>
	)
}
