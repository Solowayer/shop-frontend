import { createProductSchema } from '@/lib/validation/productSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@/components/ui'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import ProductImageGallery from './product-image-gallery'
import { createVariantSchema } from '@/lib/validation/variantSchema'
import AttributeService from '@/services/attribute-service'
import { useQuery } from '@tanstack/react-query'

type Props = {
	setVariants: (variants: CreateVariant[]) => void
	variants: CreateVariant[]
	categoryId: number
}

export default function CreateVariantForm({ setVariants, variants, categoryId }: Props) {
	const [productImages, setProductImages] = useState<string[]>([])

	const { data: attributes } = useQuery(['attributes', categoryId], () => AttributeService.findByCategoryId(categoryId))

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors, isSubmitting, isDirty }
	} = useForm<CreateVariant>({
		defaultValues: {
			images: [],
			price: 1,
			stock: 0,
			productId: undefined
		},
		resolver: zodResolver(createVariantSchema)
	})

	const onSubmit: SubmitHandler<CreateVariant> = data => {
		setVariants([...variants, data])
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
			<div className="flex flex-col gap-4">
				<span className="text-xl font-medium">Фото</span>
				<ProductImageGallery productImages={productImages} setProductImages={setProductImages} />
				{errors.images?.message && <span className="text-red-500">{errors.images?.message}</span>}
			</div>

			<div className="flex flex-col">
				<Input
					{...register('price', { valueAsNumber: true })}
					label="Ціна"
					type="number"
					id="price"
					min={1}
					disabled={isSubmitting}
				/>
				{errors.price?.message && <span className="text-red-500">{errors.price?.message}</span>}
			</div>

			<div className="flex flex-col">
				<Input
					{...register('stock', { valueAsNumber: true })}
					label="На складі"
					type="number"
					id="stock"
					min={0}
					disabled={isSubmitting}
				/>
				{errors.price?.message && <span className="text-red-500">{errors.stock?.message}</span>}
			</div>

			<Button type="submit" onClick={handleSubmit(onSubmit)}>
				Відправити
			</Button>
		</form>
	)
}
