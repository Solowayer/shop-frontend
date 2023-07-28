'use client'

import { ChevronLeft } from '@/components/icons'
import DefaultError from '@/components/layouts/default-error'
import { ButtonLink, Spinner } from '@/components/ui'
import ListService from '@/services/list-service'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'

export default function Page() {
	const { data: listData, isError, isLoading, refetch } = useQuery(['lists'], ListService.findAll)

	if (isLoading) return <Spinner />
	if (isError) return <DefaultError reset={refetch} />

	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center justify-between">
				<h1 className="w-full text-3xl font-bold">Мої списки</h1>
			</div>
			<div className="grid grid-cols-3 gap-4">
				{listData?.map((list, index) => (
					<Link
						href={`/account/lists/${list.id}`}
						key={index}
						className="border-2 rounded p-4 h-[130px] hover:border-black"
					>
						{list.name}
					</Link>
				))}
			</div>
		</div>
	)
}
