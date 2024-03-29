'use client'

import { Spinner } from '@/components/ui'
import CategoryService from '@/services/category-service'
import { useQuery } from '@tanstack/react-query'

import Link from 'next/link'

export default function Home() {
	const {
		data: mainCategories,
		isError,
		isLoading
	} = useQuery({
		queryKey: ['main-categories'],
		queryFn: CategoryService.findMainCategories,
		retry: false
	})

	if (isError) {
		return <h3>Помилка</h3>
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<div className="flex flex-col gap-8">
			<div className="flex gap-2">
				{mainCategories.map((category, index) => (
					<Link key={index} href={`/category/${category.slug}`}>
						<div className="bg-zinc-100 py-2 px-4 rounded-full hover:bg-zinc-200">{category.name}</div>
					</Link>
				))}
			</div>
		</div>
	)
}
