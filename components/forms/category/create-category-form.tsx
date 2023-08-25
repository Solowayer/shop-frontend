import { Check } from '@/components/icons'
import { Button } from '@/components/ui'
import { Input } from '@/components/ui'
import React, { useState } from 'react'
import CategoriesCombobox from './categories-combobox'
import { createCategorySchema } from '@/lib/validation/categorySchema'
import CategoryService from '@/services/category-service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm, SubmitHandler } from 'react-hook-form'

export default function CreateCategoryForm() {
	const queryClient = useQueryClient()
	const [parentId, setParentId] = useState<number | null>(null)

	const addCategory = useMutation({
		mutationFn: (data: CreateCategory) => CategoryService.createCategory(data),
		onSuccess: () => {
			queryClient.invalidateQueries(['all-categories'])
		}
	})

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
		<form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
			<Input {...register('name')} label="Назва категорії" id="name" />
			{errors.name && <span className="text-red-500">{errors.name?.message}</span>}

			<Input {...register('slug')} label="Slug" id="slug" />
			{errors.slug && <span className="text-red-500">{errors.slug?.message}</span>}

			<CategoriesCombobox setCategoryId={setParentId} />

			<Button size="large" type="submit" disabled={isSubmitting}>
				{isSubmitting ? 'Створюється...' : 'Створити'}
			</Button>

			{addCategory.isSuccess && (
				<div className="p-4 w-full bg-green-700 text-white font-medium flex gap-2 rounded items-center">
					<Check size="24" /> Категорію створено
				</div>
			)}

			{addCategory.isError && (
				<div className="p-4 w-full bg-red-700 text-white font-medium flex gap-2 rounded items-center">
					Виникла перевірка при створенні категорії, от халепа!
				</div>
			)}
		</form>
	)
}
