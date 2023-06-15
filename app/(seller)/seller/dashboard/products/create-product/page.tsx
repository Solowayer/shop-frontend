'use client'

import Button from '@/components/ui/Button'
import { Input } from '@/ui/Input'
import { createProduct } from '@/lib/mutations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm, SubmitHandler } from 'react-hook-form'
import { createProductSchema } from '@/lib/validation/productSchema'
import { fetchAllCategories } from '@/lib/queries'
import { Textarea } from '@/ui/Textarea'
import Spinner from '@/components/ui/Spinner'

export default function SellerCreateProduct() {
	const productMutation = useMutation({
		mutationFn: createProduct
	})

	const {
		data: categories,
		isLoading: isCategoriesLoading,
		isError: isCategoriesError
	} = useQuery({
		queryKey: ['all-categories'],
		queryFn: () => fetchAllCategories(),
		retry: false
	})

	const categoryIds = categories?.map(item => item.id) ?? []

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors, isSubmitting }
	} = useForm<CreateProduct>({
		defaultValues: {
			slug: '',
			name: '',
			description: '',
			price: 0,
			categoryId: categoryIds[0],
			published: true
		},
		resolver: zodResolver(createProductSchema)
	})

	const onSubmit: SubmitHandler<CreateProduct> = async data => {
		try {
			await productMutation.mutateAsync({ ...data })
			console.log({ ...data })
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div>
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
						{productMutation.isSuccess && <span>Товар створено</span>}
						<Button type="submit" disabled={isSubmitting}>
							Додати товар
						</Button>
					</div>
				</div>
			</form>
		</div>
	)
}
