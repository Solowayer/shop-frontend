'use client'

import Button from '@/components/ui/Button'
import { Input } from '@/ui/Input'
import { createProduct, uploadImages, deleteImage } from '@/lib/mutations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm, SubmitHandler } from 'react-hook-form'
import { createProductSchema } from '@/lib/validation/productSchema'
import { fetchAllCategories } from '@/lib/queries'
import { Textarea } from '@/ui/Textarea'
import Spinner from '@/components/ui/Spinner'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from '@/components/icons'
import { ChangeEvent } from 'react'
import Image from 'next/image'
import { useProductStore } from '@/store/productStore'
import { useStore } from '@/store/use-store-hook'

export default function SellerCreateProduct() {
	const productImages = useStore(useProductStore, state => state.productImages)
	const { setProductImages, setProductImageDelete } = useProductStore()

	const router = useRouter()

	const productMutation = useMutation({
		mutationFn: createProduct,
		onSuccess: () => {
			setProductImages([])
			router.push('seller/dashboard/products')
		}
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
		setValue,
		formState: { errors, isSubmitting }
	} = useForm<CreateProduct>({
		defaultValues: {
			slug: '',
			name: '',
			images: [],
			description: '',
			price: 0,
			categoryId: categoryIds[0],
			published: true
		},
		resolver: zodResolver(createProductSchema)
	})

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
			} catch (error) {
				console.log(error)
			}
		}
	}

	const handleImageDelete = async (imageUrl: string) => {
		console.log('Image to delete:', imageUrl)

		setProductImageDelete(imageUrl)

		return await deleteImage(imageUrl)
	}

	const onSubmit: SubmitHandler<CreateProduct> = async data => {
		try {
			await productMutation.mutateAsync({ ...data, images: productImages })
			console.log('productData:', { ...data })
		} catch (error) {
			throw new Error('Failed to add product')
		}
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
					<div className="w-[50%] flex flex-col gap-4">
						<div className="flex flex-col gap-4 p-6 border">
							<Input {...register('slug')} label="Slug (ідентифікатор)" type="text" id="slug" disabled={isSubmitting} />
							{errors.slug?.message && <span className="text-red-500">{errors.slug?.message}</span>}

							<Input {...register('name')} label="Назва товару" type="text" id="name" disabled={isSubmitting} />
							{errors.name?.message && <span className="text-red-500">{errors.name?.message}</span>}

							<Textarea label="Опис товару" {...register('description')} id="desc" />
						</div>
						<div className="flex flex-col gap-4 p-6 border">
							<label htmlFor="images" className="flex flex-col gap-2">
								Фото товару
								<input type="file" id="images" disabled={isSubmitting} max={10} onChange={handleImageChange} multiple />
							</label>
							{imagesMutation.isError && <span className="text-red-500">Помилка</span>}
							{errors.images?.message && <span className="text-red-500">{errors.images?.message}</span>}
							<div className="flex gap-4 overflow-auto">
								{productImages &&
									productImages.length > 0 &&
									productImages.map((imageUrl, index) => (
										<div key={index}>
											<Image
												src={imageUrl}
												alt={`Image ${index + 1}`}
												width={120}
												height={120}
												className="object-contain min-w-[120px] max-h-[120px]"
												onClick={() => handleImageDelete(imageUrl)}
											/>
										</div>
									))}
							</div>
						</div>
					</div>
					<div className="flex w-[50%] flex-col gap-4 p-6 border">
						<Input
							{...register('price', { valueAsNumber: true })}
							label="Ціна"
							type="number"
							id="price"
							disabled={isSubmitting}
						/>
						{errors.price?.message && !Number.isNaN(getValues('price')) && (
							<span className="text-red-500">{errors.price?.message}</span>
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
				</form>
			</div>
		</div>
	)
}
