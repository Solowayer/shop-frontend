'use client'

import { Delete } from '@/components/icons'
import { deleteImage, uploadImages } from '@/lib/mutations'
import { useProductStore } from '@/store/productStore'
import { useStore } from '@/store/use-store-hook'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import React, { ChangeEvent } from 'react'
import { FieldErrors, UseFormSetValue } from 'react-hook-form'

type ProductImagesProps = {
	isSubmitting: boolean
	setValue: UseFormSetValue<CreateProduct> | UseFormSetValue<EditProduct>
	errors: FieldErrors<CreateProduct> | FieldErrors<EditProduct>
}

export default function ProductImages({ isSubmitting, setValue, errors }: ProductImagesProps) {
	const productImages = useStore(useProductStore, state => state.productImages)
	const { setProductImages, setProductImageDelete } = useProductStore()

	const imagesMutation = useMutation({
		mutationFn: uploadImages,
		onSuccess: data => {
			if (productImages) {
				const updatedImages = [...productImages, ...data]
				console.log('imagesData:', data)
				console.log('productImages:', productImages)
				setProductImages(updatedImages)
				console.log('productImages:', productImages)
				setValue('images', updatedImages)
				console.log()
			}
		},
		onError: () => {
			throw new Error('Bruh')
		}
	})

	const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files
		console.log(files)

		if (files) {
			const images = Array.from(files)
			try {
				const uploadData: UploadImageData = {
					key: 'image',
					images
				}
				await imagesMutation.mutateAsync(uploadData)
				event.target.value = '' // щоб можна було два рази підряд додати один і той же файл
			} catch (error) {
				console.log(error)
			}
		}
	}

	const handleImageDelete = (imageUrl: string) => {
		console.log('Image to delete:', imageUrl)

		setProductImageDelete(imageUrl)
		deleteImage(imageUrl)

		if (productImages) {
			const updatedImages = productImages.filter(image => image !== imageUrl)
			setProductImages(updatedImages)
			setValue('images', updatedImages)
		}
	}

	return (
		<div className="flex flex-col p-6 gap-4 border">
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
						disabled={isSubmitting}
						onChange={handleImageChange}
						multiple
						className="absolute inset-0 w-full h-full opacity-0 cursor-pointer pointer-events-auto"
					/>
				</label>
			</div>
			{imagesMutation.isError && <span className="text-red-500">Помилка</span>}
			<span>{productImages ? productImages.length : 0}/10</span>
			{productImages && productImages.length > 0 && (
				<div className="flex flex-col gap-4">
					<div className="flex overflow-hidden overflow-x-auto gap-2">
						{productImages.map((imageUrl, index) => (
							<div
								key={index}
								className="relative flex justify-between rounded border items-start gap-2 p-2 min-w-[160px]"
							>
								<Image
									src={imageUrl}
									alt={`Image ${index + 1}`}
									width={100}
									height={100}
									className="object-contain h-[160px] p-1"
								/>
								<div
									className="inline-flex rounded p-1 hover:bg-zinc-200 cursor-pointer"
									onClick={() => handleImageDelete(imageUrl)}
								>
									<Delete />
								</div>
							</div>
						))}
					</div>
				</div>
			)}
			{errors.images?.message && <span className="text-red-500">{errors.images?.message}</span>}
		</div>
	)
}
