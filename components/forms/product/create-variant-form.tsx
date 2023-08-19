import { createProductSchema } from '@/lib/validation/productSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import ProductImageGallery from './product-image-gallery'
import { createVariantSchema } from '@/lib/validation/variantSchema'

export default function CreateVariantForm() {
	const [productImages, setProductImages] = useState<string[]>([])

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors, isSubmitting, isDirty }
	} = useForm<CreateVariant>({
		defaultValues: {
			images: [],
			price: 1,
			stock: undefined,
			productId: undefined
		},
		resolver: zodResolver(createVariantSchema)
	})

	return (
		<>
			<div className="flex flex-col gap-4">
				<span className="text-xl font-medium">Фото</span>
				<ProductImageGallery productImages={productImages} setProductImages={setProductImages} />
				{errors.images?.message && <span className="text-red-500">{errors.images?.message}</span>}
			</div>

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
		</>
	)
}
