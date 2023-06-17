'use client'

import Spinner from '@/ui/Spinner'
import { fetchMainCategories } from '@/lib/queries'
import { useQuery } from '@tanstack/react-query'

import StyledLink from '@/components/ui/StyledLink'
import Link from 'next/link'

export default function Home() {
	const {
		data: mainCategories,
		isError,
		isLoading
	} = useQuery({
		queryKey: ['main-categories'],
		queryFn: fetchMainCategories,
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
					<Link key={index} href={`category/${category.id}`}>
						<div className="bg-zinc-100 py-2 px-4 rounded-full hover:bg-zinc-200">{category.name}</div>
					</Link>
				))}
			</div>
		</div>
	)
}
