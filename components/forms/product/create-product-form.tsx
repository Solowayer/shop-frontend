'use client'

import React, { useEffect, useState } from 'react'
import ProductService from '@/services/product-service'
import { zodResolver } from '@hookform/resolvers/zod'
import { createProductSchema } from '@/lib/validation/productSchema'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Input, Textarea } from '@/components/ui'
import { useRouter } from 'next/navigation'
import CategorySelect from './category-select'
import ProductImageGallery from './product-image-gallery'

export default function CreateProductForm() {
	const [categoryId, setCategoryId] = useState<number>(0)
	const [productImages, setProductImages] = useState<string[]>([])

	const router = useRouter()

	const productMutation = useMutation({
		mutationFn: ProductService.createProduct,
		onSuccess: () => {
			router.push('/seller/dashboard/products')
		}
	})

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isDirty }
	} = useForm<CreateProduct>({
		resolver: zodResolver(createProductSchema)
	})

	const onSubmit: SubmitHandler<CreateProduct> = async data => {
		try {
			await productMutation.mutateAsync({ ...data, images: productImages, categoryId })
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="flex flex-col gap-8">
			<form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-6">
					<span className="text-xl font-medium">Категорія</span>
					<CategorySelect setCategoryId={setCategoryId} />
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

				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-4">
						<span className="text-xl font-medium">Фото</span>
						<ProductImageGallery productImages={productImages} setProductImages={setProductImages} />
					</div>

					<Input
						{...register('price', { valueAsNumber: true })}
						label="Ціна"
						type="number"
						id="price"
						min={1}
						disabled={isSubmitting}
					/>

					<Input
						{...register('stock', { valueAsNumber: true })}
						label="На складі"
						type="number"
						id="stock"
						min={0}
						disabled={isSubmitting}
					/>
				</div>

				<div className="flex flex-col gap-4">
					{productMutation.isLoading && <span>Loading...</span>}
					{productMutation.isSuccess && <span>Товар створено</span>}
					<Button fullWidth type="submit" disabled={isSubmitting || !isDirty}>
						Створити
					</Button>
				</div>
			</form>
		</div>
	)
}
