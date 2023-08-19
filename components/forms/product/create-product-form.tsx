'use client'

import React, { useEffect, useState } from 'react'

import ProductService from '@/services/product-service'
import CategoryService from '@/services/category-service'

import { zodResolver } from '@hookform/resolvers/zod'
import { createProductSchema } from '@/lib/validation/productSchema'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Input, Textarea } from '@/components/ui'
import { ChevronLeft } from '@/components/icons'
import { useRouter } from 'next/navigation'
import CategorySelect from './category-select'
import AttributeService from '@/services/attribute-service'

export default function CreateProductForm() {
	const [categoryId, setCategoryId] = useState<number>(0)

	const router = useRouter()

	const { data: attributes } = useQuery(['attributes'], () => AttributeService.findByCategoryId(categoryId))

	const productMutation = useMutation({
		mutationFn: ProductService.create,
		onSuccess: () => {
			router.push('/seller/dashboard/products')
		}
	})

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isDirty }
	} = useForm<CreateProduct>({
		defaultValues: {
			slug: '',
			name: '',
			description: '',
			categoryId: undefined
		},
		resolver: zodResolver(createProductSchema)
	})

	const onSubmit: SubmitHandler<CreateProduct> = async data => {
		try {
			await productMutation.mutateAsync({ ...data })
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="flex flex-col gap-8">
			<div>
				<Button intent="secondary" onClick={() => router.back()}>
					<ChevronLeft />
					Назад
				</Button>
			</div>
			<form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-6">
					<span className="text-xl font-medium">Категорія</span>
					<CategorySelect categoryId={categoryId} setCategoryId={setCategoryId} />
					{errors.categoryId?.message && <p className="text-red-500">{errors.categoryId?.message}</p>}
				</div>

				<hr />

				<div className="flex flex-col gap-6">
					<span className="text-xl font-medium">Загальна інформація</span>
					<div className="flex flex-col gap-4">
						<Input {...register('slug')} label="Slug (ідентифікатор)" type="text" id="slug" disabled={isSubmitting} />
						{errors.slug?.message && <span className="text-red-500">{errors.slug?.message}</span>}

						<Input {...register('name')} label="Назва" type="text" id="name" disabled={isSubmitting} />
						{errors.name?.message && <span className="text-red-500">{errors.name?.message}</span>}

						<Textarea label="Опис" {...register('description')} id="desc" />
					</div>
				</div>

				<hr />

				<div className="flex flex-col gap-4">
					{productMutation.isLoading && <span>Loading...</span>}
					{productMutation.isSuccess && <span>Товар створено</span>}
					<Button fullWidth type="submit" disabled={isSubmitting || !isDirty}>
						Додати товар
					</Button>
				</div>
			</form>
		</div>
	)
}
