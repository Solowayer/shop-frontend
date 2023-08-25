import React, { useEffect, useState } from 'react'
import { Check } from '@/components/icons'
import { Button, Spinner, Input } from '@/components/ui'
import CategoriesCombobox from './categories-combobox'
import CategoryService from '@/services/category-service'
import DefaultError from '@/components/layouts/default-error'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm, SubmitHandler } from 'react-hook-form'
import { updateCategorySchema } from '@/lib/validation/categorySchema'

export default function EditCategoryForm({ categoryId }: { categoryId: number }) {
	const queryClient = useQueryClient()
	const [parentId, setParentId] = useState<number | null>(categoryId)

	const {
		data: category,
		isLoading,
		isError,
		refetch
	} = useQuery(['category', categoryId], () => CategoryService.findCategoryById(categoryId))

	const updateCategory = useMutation({
		mutationFn: (data: UpdateCategory) => CategoryService.updateCategory(categoryId, data),
		onSuccess: () => {
			queryClient.invalidateQueries(['all-categories'])
		}
	})

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting, isDirty }
	} = useForm<UpdateCategory>({
		resolver: zodResolver(updateCategorySchema)
	})

	useEffect(() => {
		if (category) {
			reset(category)
		}
	}, [category, reset])

	const onSubmit: SubmitHandler<UpdateCategory> = async data => {
		try {
			updateCategory.mutateAsync({ ...data, parentId })
		} catch (error) {
			console.log(error)
		}
	}

	if (isLoading) {
		return <Spinner />
	}

	if (isError) {
		return <DefaultError reset={refetch} />
	}

	return (
		<form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
			<Input {...register('name')} label="Назва категорії" id="name" />
			{errors.name && <span className="text-red-500">{errors.name?.message}</span>}

			<Input {...register('slug')} label="Slug" id="slug" />
			{errors.slug && <span className="text-red-500">{errors.slug?.message}</span>}

			<CategoriesCombobox setCategoryId={setParentId} value={category.parent?.name} />

			<Button size="large" type="submit" disabled={isSubmitting || !isDirty}>
				{isSubmitting ? 'Створюється...' : 'Створити'}
			</Button>

			{updateCategory.isSuccess && (
				<div className="p-4 w-full bg-green-700 text-white font-medium flex gap-2 rounded items-center">
					<Check size="24" /> Категорію змінено
				</div>
			)}

			{updateCategory.isError && (
				<div className="p-4 w-full bg-red-700 text-white font-medium flex gap-2 rounded items-center">
					Виникла перевірка при внесенні змін до категорії, от халепа!
				</div>
			)}
		</form>
	)
}
