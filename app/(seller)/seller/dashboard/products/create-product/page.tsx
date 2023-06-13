'use client'

import Button from '@/components/ui/Button'
import { Input } from '@/ui/Input'
import { createProduct } from '@/lib/mutations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm, SubmitHandler } from 'react-hook-form'
import { createProductSchema } from '@/lib/validation/createProductSchema'
import { fetchAllCategories } from '@/lib/queries'
import { data } from 'autoprefixer'

export default function SellerCreateProduct() {
	const productMutation = useMutation({
		mutationFn: createProduct
	})

	const {
		data: categories,
		isError,
		isLoading,
		isSuccess
	} = useQuery({ queryKey: ['all-categories'], queryFn: () => fetchAllCategories(), retry: false })

	if (isSuccess) {
		console.log(categories)
	}

	const categoryIds = categories?.map(item => item.id) ?? []

	const {
		register,
		handleSubmit,
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
			productMutation.mutate({ ...data })
			console.log({ ...data })
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="">
			<form className="flex bg-white flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex gap-10 items-start">
					<div className="flex flex-col gap-4 flex-grow p-6 border">
						<Input {...register('slug')} label="Slug (ідентифікатор)" type="text" id="slug" disabled={isSubmitting} />
						{errors.slug?.message && <p className="text-red-500">{errors.slug?.message}</p>}
						<Input {...register('name')} label="Назва товару" type="text" id="name" disabled={isSubmitting} />
						{errors.name?.message && <p className="text-red-500">{errors.name?.message}</p>}
						<Input
							{...register('price', { valueAsNumber: true })}
							label="Ціна"
							type="number"
							id="price"
							disabled={isSubmitting}
						/>
						{errors.price?.message && <p className="text-red-500">{errors.price?.message}</p>}
					</div>
					<div className="flex flex-col gap-4 flex-grow p-6 border">
						<select {...register('categoryId', { valueAsNumber: true })} className="border py-2 px-4">
							{categories?.map(category => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
						{errors.categoryId?.message && <p className="text-red-500">{errors.categoryId?.message}</p>}
						{productMutation.isLoading && <span>Loading...</span>}
						{productMutation.isSuccess && <span>Done</span>}
						<Button type="submit" disabled={isSubmitting}>
							Додати товар
						</Button>
					</div>
				</div>
			</form>
		</div>
	)
}
