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
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogAction,
	AlertDialogCancel
} from '@/components/ui/alert-dialog'
import { ChevronLeft, Delete } from '@/components/icons'
import { useRouter } from 'next/navigation'

export default function SellerEditProduct({ params }: { params: { id: number } }) {
	const [productImages, setProductImages] = useState<string[]>([])

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

	const editProductMutation = useMutation({
		mutationFn: (data: EditProduct) => editProduct(params.id, data)
	})

	const imagesMutation = useMutation({
		mutationFn: uploadImages,
		onSuccess: async data => {
			if (productImages) {
				const updatedImages = [...productImages, ...data]
				setProductImages(updatedImages)
				await editProductMutation.mutateAsync({ images: updatedImages })
			}
		},
		onError: () => {
			throw new Error('Something went wrong')
		}
	})

	const imageDeleteMutation = useMutation({
		mutationFn: (imageUrl: string) => deleteImage(imageUrl),
		onSuccess: async () => {
			await editProductMutation.mutateAsync({ images: productImages })
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

	useEffect(() => {
		if (productData) {
			reset(productData)
		}

		if (isProductSuccess && productData && productData.images) {
			setProductImages(productData.images)
		}

		console.log('productData:', productData)
	}, [isProductSuccess, productData, reset])

	const onSubmit: SubmitHandler<EditProduct> = async data => {
		try {
			await editProductMutation.mutateAsync({ ...data, images: productImages })
			reset(data)
		} catch (error) {
			console.log(error)
		}
	}

	const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files

		if (files) {
			const images = Array.from(files)
			const maxLength = 10 - productImages.length
			const trimmedImages = images.length > maxLength ? images.slice(0, maxLength) : images
			try {
				const uploadData: UploadImageData = {
					key: 'image',
					images: trimmedImages
				}
				await imagesMutation.mutateAsync(uploadData)
			} catch (error) {
				console.log(error)
			}

			event.target.value = ''
		}
	}

	const handleImageDelete = async (imageUrl: string) => {
		console.log('Image to delete:', imageUrl)
		const filteredImages = productImages.filter(image => image !== imageUrl)
		setProductImages(filteredImages)

		await imageDeleteMutation.mutateAsync(imageUrl)
	}

	const undoChanges = () => {
		reset()

		setProductImages([])
	}

	return (
		<div className="w-full">
			<div className="flex flex-col gap-4">
				<div>
					<Button intent="secondary" onClick={() => router.back()}>
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
							<div className="w-full flex font-medium items-center justify-between gap-2">
								<span>Фото</span>
								<span>{productImages ? productImages.length : 0}/10</span>
							</div>
							{productImages && productImages.length >= 10 ? null : (
								<>
									<div className="relative border-2 border-dashed border-blue-200 flex w-full items-center justify-center h-[140px] rounded hover:bg-blue-50">
										<label htmlFor="images">
											<div className="flex flex-col items-center gap-1">
												<span className="font-medium text-blue-500">Додати фото товару</span>
												<span className="text-xs text-center text-blue-500">
													Формати: JPG, PNG, GIF, WEBP.
													<br /> Максимальний розмір: 2 MB.
												</span>
											</div>
											<input
												type="file"
												id="images"
												disabled={isSubmitting}
												onChange={handleImageChange}
												multiple
												className="absolute inset-0 w-full h-full opacity-0 cursor-pointer pointer-events-auto"
											/>
										</label>
									</div>
								</>
							)}

							{imagesMutation.isError && <span className="text-red-500">Помилка</span>}

							<div className="flex flex-col gap-4">
								<div className="flex overflow-hidden overflow-x-auto gap-2">
									{productImages.map((image, index) => (
										<div
											key={index}
											className="relative flex justify-between rounded border items-start p-2 min-w-[160px] h-[160px]"
										>
											<Image src={image} alt={`Image ${index + 1}`} fill className="object-cover p-2" />
											<AlertDialog>
												<AlertDialogTrigger asChild>
													<div className="absolute right-2 inline-flex rounded-full p-2 bg-black text-white cursor-pointer">
														<Delete />
													</div>
												</AlertDialogTrigger>
												<AlertDialogContent>
													<AlertDialogTitle>Видалити зображення?</AlertDialogTitle>
													<AlertDialogDescription>
														При видаленні це зображення не можна буде відновити.
													</AlertDialogDescription>
													<div className="flex gap-4 justify-end">
														<AlertDialogCancel>
															<Button intent="secondary" shape="round">
																Залишити
															</Button>
														</AlertDialogCancel>
														<AlertDialogAction>
															<Button intent="danger" shape="round" onClick={() => handleImageDelete(image)}>
																Видалити
															</Button>
														</AlertDialogAction>
													</div>
												</AlertDialogContent>
											</AlertDialog>
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
						{editProductMutation.isLoading && <span>Loading...</span>}
						{editProductMutation.isSuccess && <span>Зміни застосовано</span>}
						<Button type="submit" disabled={isSubmitting || !isDirty}>
							Внести зміни
						</Button>
						<Button disabled={isSubmitting || !isDirty} onClick={() => undoChanges()}>
							Відмінити зміни
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
