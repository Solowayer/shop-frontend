'use client'

import ProductsList from '@/components/product/ProductsList'
import Button from '@/ui/Button'
import Spinner from '@/ui/Spinner'
import { fetchAllCategories, fetchAllProducts, fetchProductsMaxPrice } from '@/lib/queries'
import { useQuery } from '@tanstack/react-query'
import { useSortStore } from '@/store/sortFIlterStore'
import { Input } from '@/components/ui/Input'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { filterSchema } from '@/lib/validation/filterSchema'
import StyledLink from '@/components/ui/StyledLink'

export default function Home() {
	const {
		sortProducts,
		setSortProducts,
		minPrice,
		maxPrice,
		setMaxPrice,
		setMinPrice,
		setDeleteFilters,
		isClearButton,
		setClearButton
	} = useSortStore()

	const { data: categories } = useQuery({
		queryKey: ['categories'],
		queryFn: () => fetchAllCategories(),
		retry: false
	})

	const { data, isLoading, isError } = useQuery({
		queryKey: ['products', { sort: sortProducts }, { filter: [minPrice, maxPrice] }],
		queryFn: () => fetchAllProducts(sortProducts, minPrice, maxPrice),
		retry: false
	})

	useEffect(() => {
		const fetchData = async () => {
			const productsMaxPrice = await fetchProductsMaxPrice()
			setMaxPrice(productsMaxPrice)
		}

		if (!maxPrice) fetchData()
	}, [maxPrice, setMaxPrice])

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue
	} = useForm<{ minPrice?: number; maxPrice?: number }>({
		defaultValues: {
			minPrice,
			maxPrice
		}
	})

	if (isError) {
		return <h3>Помилка</h3>
	}

	if (isLoading) {
		return <Spinner />
	}

	const onSubmit: SubmitHandler<{ minPrice?: number; maxPrice?: number }> = async data => {
		setMinPrice(data.minPrice)
		setMaxPrice(data.maxPrice)
	}

	const handleDeleteFilters = () => {
		setDeleteFilters()
		setValue('minPrice', 1)
		setValue('maxPrice', undefined)
		setClearButton(false)
	}

	return (
		<div className="flex flex-col gap-8">
			<div className="grid grid-cols-4 gap-4">
				{categories?.map((category, index) => (
					<StyledLink key={index} href={`category/${category.id}`}>
						{category.name}
					</StyledLink>
				))}
			</div>
			<div className="flex bg-white items-center justify-between drop-shadow rounded p-4 gap-4">
				<div className="flex gap-4">
					<button
						className={`${sortProducts === 'rating' ? 'text-red-500' : ''}`}
						onClick={() => setSortProducts('rating')}
					>
						За рейтингом
					</button>
					<button
						className={`${sortProducts === 'price_asc' ? 'text-red-500' : ''}`}
						onClick={() => setSortProducts('price_asc')}
					>
						Спочатку дешевші
					</button>
					<button
						className={`${sortProducts === 'price_desc' ? 'text-red-500' : ''}`}
						onClick={() => setSortProducts('price_desc')}
					>
						Спочатку дорожчі
					</button>
				</div>
				<form className="flex gap-4 max-w-[380px]" onSubmit={handleSubmit(onSubmit)}>
					<Input
						min={1}
						placeholder="Мінімальна ціна"
						fullWidth
						id="minPrice"
						type="number"
						{...register('minPrice')}
					/>
					{errors.minPrice && <span className="text-red-500">Помилка</span>}
					<Input
						min={1}
						placeholder="Максимальна ціна"
						fullWidth
						id="maxPrice"
						type="number"
						{...register('maxPrice')}
					/>
					{errors.maxPrice && <span className="text-red-500">Помилка</span>}
					<Button type="submit" disabled={isSubmitting} onClick={() => setClearButton(true)}>
						Шукати
					</Button>
				</form>
				{isClearButton && (
					<Button variant="secondary" onClick={() => handleDeleteFilters()}>
						Очистити фільтр
					</Button>
				)}
			</div>
			<ProductsList products={data} />
		</div>
	)
}
