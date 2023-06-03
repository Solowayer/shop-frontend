'use client'

import ProductsList from '@/components/product/ProductsList'
import Button from '@/ui/Button'
import Spinner from '@/ui/Spinner'
import { fetchAllProducts } from '@/lib/queries'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function Home() {
	const [sort, setSort] = useState<string>('')

	const { data, isLoading, isError } = useQuery(['products', { sort: sort }], () => fetchAllProducts(sort))

	console.log(data)

	if (isError) {
		return <h3>Помилка</h3>
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex gap-4">
				<Button onClick={() => setSort('price_asc')}>Сортувати asc</Button>
				<Button onClick={() => setSort('price_desc')}>Сортувати desc</Button>
			</div>
			<ProductsList products={data} />
		</div>
	)
}
