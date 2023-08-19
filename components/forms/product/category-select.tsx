'use client'

import { Button, Input, Spinner } from '@/components/ui'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { useDebounce } from '@/lib/hooks/useDebounce'
import CategoryService from '@/services/category-service'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { ChangeEvent, useState } from 'react'

type Props = {
	categoryId: number
	setCategoryId: (id: number) => void
}

export default function CategorySelect({ categoryId, setCategoryId }: Props) {
	const queryClient = useQueryClient()
	const [openDialog, setOpenDialog] = useState(false)
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [categoryName, setCategoryName] = useState<string>('')
	const debouncedSearch = useDebounce(searchTerm)

	const { data: categories, isLoading } = useQuery(['all-categories', debouncedSearch], () =>
		CategoryService.findAll({ q: debouncedSearch })
	)

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newSearchTerm = e.target.value

		setSearchTerm(newSearchTerm)
		queryClient.invalidateQueries(['all-categories', newSearchTerm])
	}

	return (
		<>
			<div className="relative flex flex-col gap-4">
				<Dialog open={openDialog} onOpenChange={setOpenDialog}>
					<DialogTrigger asChild>
						<span className="hover:underline cursor-pointer">
							{categoryName === '' ? 'Вибрати категорію' : categoryName}
						</span>
					</DialogTrigger>
					<DialogContent title={'Вибрати категорію'}>
						<Input fullWidth placeholder="Шукати категорію" onChange={e => handleInputChange(e)} />
						<div className="flex flex-col gap-2">
							{categories && categories.length > 0 && (
								<span className="text-sm font-bold text-zinc-500">{categories.length} категорії знайдено</span>
							)}
							{isLoading ? (
								<Spinner />
							) : categories && categories.length > 0 ? (
								categories.map(cat => (
									<span key={cat.id} className="w-full flex justify-between items-center hover:bg-zinc-100 p-4">
										{cat.name}
										<Button
											type="button"
											onClick={() => {
												setCategoryId(cat.id)
												setCategoryName(cat.name)
												setOpenDialog(false)
											}}
											intent="secondary"
										>
											Вибрати
										</Button>
									</span>
								))
							) : (
								<span className="flex w-full h-full items-center justify-center">Нічого не знайдено</span>
							)}
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</>
	)
}
