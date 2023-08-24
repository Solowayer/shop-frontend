'use client'

import { Check } from '@/components/icons'
import { Button, Input, Spinner } from '@/components/ui'
import { ComboboxTest } from '@/components/ui/combobox'
import { useDebounce } from '@/lib/hooks/useDebounce'
import { createCategorySchema } from '@/lib/validation/categorySchema'
import CategoryService from '@/services/category-service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { ChangeEvent, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

export default function Page() {
	const queryClient = useQueryClient()
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [parentId, setParentId] = useState<number>(0)
	const debouncedSearch = useDebounce(searchTerm)

	const { data: categories, isLoading } = useQuery(['all-categories', debouncedSearch], () =>
		CategoryService.findAllCategories({ q: debouncedSearch })
	)

	const addCategory = useMutation({ mutationFn: (data: CreateCategory) => CategoryService.createCategory(data) })

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newSearchTerm = e.target.value

		setSearchTerm(newSearchTerm)
		queryClient.invalidateQueries(['all-categories', newSearchTerm])
	}

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<CreateCategory>({
		resolver: zodResolver(createCategorySchema)
	})

	const onSubmit: SubmitHandler<CreateCategory> = async data => {
		try {
			addCategory.mutateAsync({ ...data, parentId })
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="w-full">
			<form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
				<ComboboxTest />

				<Input {...register('name')} label="Назва категорії" id="name" />
				{errors.name && <span className="text-red-500">{errors.name?.message}</span>}

				<Input {...register('slug')} label="Slug" id="slug" />
				{errors.slug && <span className="text-red-500">{errors.slug?.message}</span>}

				<div className="flex flex-col gap-4">
					<Input
						fullWidth
						placeholder="Шукати категорію"
						label="Батьківська категорія (необов'язково)"
						onChange={e => handleInputChange(e)}
					/>
					<div className="flex flex-col gap-4 h-[300px] overflow-x-auto bg-zinc-50 p-4">
						{categories && categories.length > 0 && (
							<span className="text-sm font-bold text-zinc-500">{categories.length} категорії знайдено</span>
						)}
						<div>
							{isLoading ? (
								<Spinner />
							) : categories && categories.length > 0 ? (
								categories.map(cat => (
									<div
										key={cat.id}
										className={`w-full flex rounded justify-between items-center hover:bg-zinc-100 p-4 ${
											parentId === cat.id && 'bg-orange-300 hover:bg-orange-300'
										}`}
									>
										{cat.name}
										<Button type="button" onClick={() => setParentId(cat.id)}>
											Вибрати
										</Button>
									</div>
								))
							) : (
								<span className="flex w-full h-full items-center justify-center">Нічого не знайдено</span>
							)}
						</div>
					</div>
				</div>

				<Button size="large" type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Створюється...' : 'Створити'}
				</Button>

				{addCategory.isSuccess && (
					<div className="p-4 w-full bg-green-700 text-white font-medium flex gap-2 rounded items-center">
						<Check size="24" /> Категорію створено
					</div>
				)}
			</form>
		</div>
	)
}
