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
import { useProductStore } from '@/store/productStore'
import { useStore } from '@/store/use-store-hook'
import ProductImages from '@/components/seller/create-product/ProductImages'

export default function SellerEditProduct({ params }: { params: { id: number } }) {

	const productImages = useStore(useProductStore, state => state.productImages)
	const { setProductImages } = useProductStore()

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
		formState: { errors, isSubmitting, isDirty }
	} = useForm<EditProduct>({
		resolver: zodResolver(editProductSchema)
	})

	useEffect(() => {
		if (productData) {
			setValue('slug', productData.slug)
			setValue('name', productData.name)
			setValue('images', productData.images)
			setValue('description', productData.description)
			setValue('price', productData.price)
			setValue('categoryId', productData.categoryId)
			setValue('published', productData.published)

			console.log('productData.images:', productData.images)

			// productData.images && setProductImageUrls(productData.images)
		}
	}, [productData, setProductImages, setValue])

	const {
		data: categories,
		isLoading: isCategoriesLoading,
		isError: isCategoriesError
	} = useQuery({ queryKey: ['all-categories'], queryFn: fetchAllCategories, retry: false })

	console.log('productData:', productData)

	const onSubmit: SubmitHandler<EditProduct> = async data => {
		try {
			productMutation.mutate({ ...data, images: productImages })
			console.log({ ...data })
			reset(data)
		} catch (error) {
			throw new Error('Failed to edit product')
		}
	}

	return (
		<div className="">
			{isProductLoading ? (
				<Spinner />
			) : isProductError ? (
				<div>Помилка</div>
			) : (
				<form className="flex items-start bg-white gap-4" onSubmit={handleSubmit(onSubmit)}>
					<div className="w-[50%] flex flex-col gap-4">
						{/* 1 */}
						<div className="flex flex-col gap-4 p-6 border">
							<Input {...register('slug')} label="Slug (ідентифікатор)" type="text" id="slug" disabled={isSubmitting} />
							{errors.slug?.message && <p className="text-red-500">{errors.slug?.message}</p>}
							<Input {...register('name')} label="Назва товару" type="text" id="name" disabled={isSubmitting} />
							{errors.name?.message && <p className="text-red-500">{errors.name?.message}</p>}
							<Textarea label="Опис товару" {...register('description')} id="desc" />
						</div>
						{/* 2 */}
						<ProductImages isSubmitting={isSubmitting} setValue={setValue} errors={errors} />
					</div>
					{/* 3 */}
					<div className="flex w-[50%] flex-col gap-4 p-6 border">
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
						<Button type="submit" disabled={isSubmitting || !isDirty}>
							Відмінити зміни
						</Button>
					</div>
				</form>
			)}
		</div>
	)
}
