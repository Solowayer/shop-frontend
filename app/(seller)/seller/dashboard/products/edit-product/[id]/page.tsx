'use client'

import { useEffect, useState } from 'react'
import { fetchAllCategories, fetchProductById } from '@/lib/queries'
import { editProduct } from '@/lib/mutations'
import { useMutation, useQuery } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { editProductSchema } from '@/lib/validation/productSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@/components/ui/Button'
import { Textarea } from '@/ui/Textarea'
import { Input } from '@/ui/Input'
import Spinner from '@/components/ui/Spinner'

export default function SellerEditProduct({ params }: { params: { id: number } }) {
	const {
		data: productData,
		isError: isProductError,
		isLoading: isProductLoading
	} = useQuery({
		queryKey: ['product', params.id],
		queryFn: () => fetchProductById(params.id),
		retry: false
	})

	const productMutation = useMutation({
		mutationFn: (data: EditProduct) => editProduct(params.id, data)
	})

	const {
		handleSubmit,
		register,
		getValues,
		setValue,
		reset,
		formState: { errors, isSubmitting, isDirty, isSubmitSuccessful }
	} = useForm<EditProduct>({
		resolver: zodResolver(editProductSchema)
	})

	useEffect(() => {
		if (productData) {
			setValue('slug', productData.slug)
			setValue('name', productData.name)
			setValue('description', productData.description)
			setValue('price', productData.price)
			setValue('categoryId', productData.categoryId)
			setValue('published', productData.published)
		}
	}, [productData, setValue])

	const {
		data: categories,
		isLoading: isCategoriesLoading,
		isError: isCategoriesError
	} = useQuery({ queryKey: ['all-categories'], queryFn: fetchAllCategories, retry: false })

	console.log('productData:', productData)

	const onSubmit: SubmitHandler<EditProduct> = async data => {
		try {
			productMutation.mutate({ ...data })
			console.log({ ...data })
			reset(data)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="">
			{isProductLoading ? (
				<Spinner />
			) : isProductError ? (
				<div>Помилка</div>
			) : (
				<form className="flex bg-white flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
					<div className="flex gap-10 items-start">
						<div className="flex flex-col gap-4 flex-grow p-6 border">
							<Input {...register('slug')} label="Slug (ідентифікатор)" type="text" id="slug" disabled={isSubmitting} />
							{errors.slug?.message && <p className="text-red-500">{errors.slug?.message}</p>}
							<Input {...register('name')} label="Назва товару" type="text" id="name" disabled={isSubmitting} />
							{errors.name?.message && <p className="text-red-500">{errors.name?.message}</p>}
							<Textarea label="Опис товару" {...register('description')} id="desc" />
						</div>
						<div className="flex flex-col gap-4 flex-grow p-6 border">
							<Input
								{...register('price', { valueAsNumber: true })}
								label="Ціна"
								type="number"
								id="price"
								disabled={isSubmitting}
							/>
							{errors.price?.message && !Number.isNaN(getValues('price')) && (
								<p className="text-red-500">{errors.price?.message}</p>
							)}
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
							{errors.categoryId?.message && <p className="text-red-500">{errors.categoryId?.message}</p>}
							{productMutation.isLoading && <span>Loading...</span>}
							{productMutation.isSuccess && <span>Зміни застосовано</span>}
							<Button type="submit" disabled={isSubmitting || !isDirty}>
								Внести зміни
							</Button>
						</div>
					</div>
				</form>
			)}
		</div>
	)
}
