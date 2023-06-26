'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import { editProduct, uploadImages, deleteImage } from '@/lib/mutations'
import { fetchAllCategories, fetchProductById } from '@/lib/queries'
import { zodResolver } from '@hookform/resolvers/zod'
import { createProductSchema } from '@/lib/validation/productSchema'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { Spinner, Button, Input, Textarea } from '@/components/ui'
import { ChevronLeft, Delete } from '@/components/icons'
import { useRouter } from 'next/navigation'

export default function SellerEditProduct({ params }: { params: { id: number } }) {
	const [productImages, setProductImages] = useState<File[]>([])
	const [serverProductImages, setServerProductImages] = useState<string[] | undefined>([])
	const [isUploadError, setIsUploadError] = useState<boolean>(false)

	const router = useRouter()

	const {
		data: productData,
		// isError: isProductError,
		// isLoading: isProductLoading,
		isSuccess: isProductSuccess
	} = useQuery({
		queryKey: ['product', params.id],
		queryFn: () => fetchProductById(params.id),
		retry: false
	})

	const productMutation = useMutation({
		mutationFn: (data: EditProduct) => editProduct(params.id, data)
	})

	const imagesMutation = useMutation({
		mutationFn: uploadImages,
		onError: () => {
			throw new Error('Something went wrong')
		}
	})

	const {
		data: categories,
		isLoading: isCategoriesLoading,
		isError: isCategoriesError
	} = useQuery({
		queryKey: ['all-categories'],
		queryFn: fetchAllCategories,
		retry: false
	})

	const {
		register,
		handleSubmit,
		getValues,
		reset,
		formState: { errors, isSubmitting, isDirty }
	} = useForm<EditProduct>({
		resolver: zodResolver(createProductSchema)
	})

	const [isFormChanged, setIsFormChanged] = useState<boolean>(isDirty)

	useEffect(() => {
		if (productData) {
			reset(productData)
		}
		if (isProductSuccess) {
			setServerProductImages(productData.images)
		}
		console.log('productData:', productData)
	}, [isProductSuccess, productData, reset])

	const onSubmit: SubmitHandler<EditProduct> = async data => {
		try {
			if (productImages && productImages.length > 0) {
				const uploadData: UploadImageData = {
					key: 'image',
					images: productImages
				}
				const images = await imagesMutation.mutateAsync(uploadData)
				const updatedImages = serverProductImages ? [...serverProductImages, ...images] : images
				await productMutation.mutateAsync({ ...data, images: updatedImages })
			} else {
				await productMutation.mutateAsync({ ...data, images: serverProductImages })
			}

			setIsFormChanged(false)
			reset(data)

			console.log('data:', data)
		} catch (error) {
			console.log(error)
		}
	}

	const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files
		console.log('Files:', files)

		if (files && serverProductImages) {
			const images = Array.from(files)
			const totalImages = [...productImages, ...images]

			const maxImages = 10 - serverProductImages.length

			const trimmedImages = totalImages.length > maxImages ? totalImages.slice(0, 10) : totalImages
			setIsUploadError(totalImages.length > maxImages)
			setProductImages(trimmedImages)
			setIsFormChanged(true)

			event.target.value = ''
		}
	}

	const handleImageDelete = (image: File) => {
		const filteredProductImages = productImages.filter(productImage => productImage !== image)
		setProductImages(filteredProductImages)
		setIsFormChanged(false)
	}

	const handleServerImageDelete = async (imageUrl: string) => {
		console.log('Image to delete:', imageUrl)

		const updated = serverProductImages?.filter(image => image !== imageUrl)
		setServerProductImages(updated)
		setIsFormChanged(true)

		console.log('serverProductImages:', serverProductImages)
	}

	const undoChanges = () => {
		reset()

		setServerProductImages(productData?.images)
		setProductImages([])
		setIsFormChanged(false)
	}

	return (
		<div className="w-full">
			<div className="flex flex-col gap-4">
				<div>
					<Button variant="secondary" onClick={() => router.back()}>
						<ChevronLeft />
						Назад
					</Button>
				</div>
				<form className="flex items-start bg-white gap-4" onSubmit={handleSubmit(onSubmit)}>
					<div className="w-[calc(100%-300px)] flex flex-col gap-4">
						{/* 1 */}
						<div className="flex flex-col gap-4 p-6 border">
							<Input {...register('slug')} label="Slug (ідентифікатор)" type="text" id="slug" disabled={isSubmitting} />
							{errors.slug?.message && <span className="text-red-500">{errors.slug?.message}</span>}

							<Input {...register('name')} label="Назва" type="text" id="name" disabled={isSubmitting} />
							{errors.name?.message && <span className="text-red-500">{errors.name?.message}</span>}

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
						<div className="flex flex-col gap-4 p-6 border">
							<span className="font-medium">Фото</span>
							<div className="relative border-2 border-dashed border-blue-200 flex w-full items-center justify-center h-[140px] rounded hover:bg-blue-50">
								<label htmlFor="images">
									<div className="flex flex-col items-center gap-1">
										<span className="font-medium text-blue-500">Додати фото товару</span>
										<span className="text-xs text-center text-blue-500">
											Формати: JPG, PNG, GIF.
											<br /> Максимальний розмір: 2 MB.
										</span>
									</div>
									<input
										type="file"
										id="images"
										disabled={isSubmitting || (productImages && productImages.length >= 10)}
										onChange={handleImageChange}
										multiple
										className="absolute inset-0 w-full h-full opacity-0 cursor-pointer pointer-events-auto"
									/>
								</label>
							</div>
							{isUploadError ||
							(productImages && serverProductImages && productImages.length + serverProductImages.length > 10) ? (
								<p className="text-red-500">Максимум 10 зображень</p>
							) : null}
							{imagesMutation.isError && <span className="text-red-500">Помилка</span>}
							<span>
								{productImages && serverProductImages ? productImages.length + serverProductImages.length : 0}/10
							</span>
							<div className="flex flex-col gap-4">
								<div className="flex overflow-hidden overflow-x-auto gap-2">
									{productImages.map((image, index) => (
										<div
											key={index}
											className="relative flex justify-between rounded border items-start gap-2 p-2 min-w-[160px]"
										>
											<Image
												src={URL.createObjectURL(image)}
												alt={`Image ${index + 1}`}
												width={100}
												height={100}
												className="object-contain h-[160px] p-1"
											/>
											<div
												{...register('images')}
												className="inline-flex rounded p-1 hover:bg-zinc-200 cursor-pointer"
												onClick={() => handleImageDelete(image)}
											>
												<Delete />
											</div>
										</div>
									))}
									{serverProductImages &&
										serverProductImages.map((image, index) => (
											<div
												key={index}
												className="relative flex justify-between rounded border items-start gap-2 p-2 min-w-[160px]"
											>
												<Image
													src={image}
													alt={`Image ${index + 1}`}
													width={100}
													height={100}
													className="object-contain h-[160px] p-1"
												/>
												<div
													className="inline-flex rounded p-1 hover:bg-zinc-200 cursor-pointer"
													onClick={() => handleServerImageDelete(image)}
												>
													<Delete />
												</div>
											</div>
										))}
								</div>
							</div>
							{errors.images?.message && <span className="text-red-500">{errors.images?.message}</span>}
						</div>
					</div>
					{/* 3 */}
					<div className="flex w-[300px] flex-col gap-4 p-6 border">
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
						{productMutation.isSuccess && !isFormChanged && <span>Зміни застосовано</span>}
						<Button type="submit" disabled={isSubmitting || !isFormChanged}>
							Внести зміни
						</Button>
						<Button disabled={isSubmitting || !isFormChanged} onClick={() => undoChanges()}>
							Відмінити зміни
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
