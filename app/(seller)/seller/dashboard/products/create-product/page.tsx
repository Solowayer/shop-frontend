'use client'

import Button from '@/components/ui/Button'
import { Input } from '@/ui/Input'
import { createProduct } from '@/lib/mutations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { createProductSchema } from '@/lib/validation/createProductSchema'

export default function SellerCreateProduct() {
	const productMutation = useMutation({
		mutationFn: createProduct
	})

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<CreateProduct>({
		defaultValues: {
			slug: '',
			name: '',
			description: '',
			price: '0',
			categoryId: '',
			published: false
		},
		resolver: zodResolver(createProductSchema)
	})

	const onSubmit: SubmitHandler<CreateProduct> = async data => {
		try {
			productMutation.mutate({ ...data })
			console.log({ ...data })
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="">
			<form className="flex bg-white flex-1 flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
				<Input {...register('slug')} label="Slug (ідентифікатор)" type="text" id="slug" disabled={isSubmitting} />
				{errors.slug?.message && <p className="text-red-500">{errors.slug?.message}</p>}
				<Input {...register('name')} label="Назва товару" type="text" id="name" disabled={isSubmitting} />
				{errors.name?.message && <p className="text-red-500">{errors.name?.message}</p>}
				<Input {...register('price')} label="Ціна" type="number" id="price" disabled={isSubmitting} />
				{errors.price?.message && <p className="text-red-500">{errors.price?.message}</p>}
				<Input {...register('categoryId')} label="Категорія" type="number" id="category" disabled={isSubmitting} />
				{errors.categoryId?.message && <p className="text-red-500">{errors.categoryId?.message}</p>}

				<div>
					<label>
						<input type="radio" value="true" {...register('published', { value: true })} disabled={isSubmitting} />
						Опубліковано
					</label>
				</div>

				<div>
					<label>
						<input type="radio" value="false" {...register('published', { value: false })} disabled={isSubmitting} />
						Неопубліковано
					</label>
				</div>

				{productMutation.isLoading && <span>Loading...</span>}
				{productMutation.isSuccess && <span>Done</span>}
				<Button type="submit" disabled={isSubmitting}>
					Додати товар
				</Button>
			</form>
		</div>
	)
}
