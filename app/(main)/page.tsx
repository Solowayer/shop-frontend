'use client'

import Spinner from '@/ui/Spinner'
import { fetchAllCategories } from '@/lib/queries'
import { useQuery } from '@tanstack/react-query'

import StyledLink from '@/components/ui/StyledLink'

export default function Home() {
	const {
		data: categories,
		isError,
		isLoading
	} = useQuery({
		queryKey: ['categories'],
		queryFn: () => fetchAllCategories(),
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
			<div className="grid grid-cols-4 gap-4">
				{categories?.map((category, index) => (
					<StyledLink key={index} href={`category/${category.id}`}>
						{category.name}
					</StyledLink>
				))}
			</div>
		</div>
	)
}
