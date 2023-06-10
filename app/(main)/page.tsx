'use client'

import Spinner from '@/ui/Spinner'
import { fetchMainCategories } from '@/lib/queries'
import { useQuery } from '@tanstack/react-query'

import StyledLink from '@/components/ui/StyledLink'

export default function Home() {
	const {
		data: mainCategories,
		isError,
		isLoading
	} = useQuery({
		queryKey: ['categories'],
		queryFn: () => fetchMainCategories(),
		retry: false
	})

	if (isError) {
		return <h3>Стався крінж</h3>
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-col">
				{mainCategories.map((category, index) => (
					<StyledLink key={index} href={`category/${category.id}`}>
						{category.name}
					</StyledLink>
				))}
			</div>
		</div>
	)
}
