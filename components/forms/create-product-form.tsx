'use client'

import React, { useEffect, useState } from 'react'

import ProductService from '@/services/product-service'
import CategoryService from '@/services/category-service'

import { zodResolver } from '@hookform/resolvers/zod'
import { createProductSchema } from '@/lib/validation/productSchema'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Spinner, Button, Input, Textarea } from '@/components/ui'
import { ChevronLeft } from '@/components/icons'
import { useRouter } from 'next/navigation'
import ProductImageGallery from './product-image-gallery'

export default function CreateProductForm() {
	const [productImages, setProductImages] = useState<string[]>([])

	const router = useRouter()

	const productMutation = useMutation({
		mutationFn: ProductService.create,
		onSuccess: () => {
			setProductImages([])
			router.push('/seller/dashboard/products')
		}
	})

	const {
		data: categories,
		isLoading: isCategoriesLoading,
		isError: isCategoriesError
	} = useQuery({
		queryKey: ['all-categories'],
		queryFn: CategoryService.findAll,
		retry: false
	})

	const categoryIds = categories?.map(item => item.id) ?? []

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors, isSubmitting, isDirty }
	} = useForm<CreateProduct>({
		defaultValues: {
			slug: '',
			name: '',
			images: [],
			description: '',
			price: 1,
			categoryId: categoryIds[0],
		},
		resolver: zodResolver(createProductSchema)
	})

	const onSubmit: SubmitHandler<CreateProduct> = async data => {
		try {
			await productMutation.mutateAsync({ ...data, images: productImages })
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		console.log('Product images:', productImages)
	}, [productImages])

	return (
		<div className="flex flex-col gap-8">
			<div>
				<Button intent="secondary" onClick={() => router.back()}>
					<ChevronLeft />
					Назад
				</Button>
			</div>
			<form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>

				<ProductImageGallery productImages={productImages} setProductImages={setProductImages} />
				{errors.images?.message && <span className="text-red-500">{errors.images?.message}</span>}

				<hr />

				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-4">
						<Input {...register('slug')} label="Slug (ідентифікатор)" type="text" id="slug" disabled={isSubmitting} />
						{errors.slug?.message && <span className="text-red-500">{errors.slug?.message}</span>}

						<Input {...register('name')} label="Назва" type="text" id="name" disabled={isSubmitting} />
						{errors.name?.message && <span className="text-red-500">{errors.name?.message}</span>}

						{isCategoriesLoading ? (
							<Spinner />
						) : isCategoriesError ? (
							<div>Помилка</div>
						) : (
							<select {...register('categoryId', { valueAsNumber: true })} className="w-full border rounded">
								{categories.map(category => (
									<option key={category.id} value={category.id}>
										{category.name}
									</option>
								))}
							</select>
						)}

						<Textarea label="Опис" {...register('description')} id="desc" />

						<Input
							{...register('price', { valueAsNumber: true })}
							label="Ціна"
							type="number"
							id="price"
							min={1}
							disabled={isSubmitting}
						/>
						{errors.price?.message && !Number.isNaN(getValues('price')) && (
							<span className="text-red-500">{errors.price?.message}</span>
						)}
					</div>
					{/* 2 */}

				</div>

				<div className="flex flex-col gap-4">
					{errors.categoryId?.message && <p className="text-red-500">{errors.categoryId?.message}</p>}
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
