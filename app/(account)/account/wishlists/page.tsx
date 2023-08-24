'use client'

import Breadcrumbs from '@/components/breadcrumbs'
import AddListForm from '@/components/forms/create-list-form'
import { ChevronRight } from '@/components/icons'
import DefaultError from '@/components/layouts/default-error'
import { Button, Spinner } from '@/components/ui'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import ListService from '@/services/wishlist-service'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Page() {
	const [openDialog, setOpenDialog] = useState(false)
	const { data: wishlists, isError, isLoading, refetch } = useQuery(['wishlists'], ListService.findAllWishlists)

	if (isLoading) return <Spinner />
	if (isError) return <DefaultError reset={refetch} />

	return (
		<div className="flex flex-col gap-8">
			<Breadcrumbs
				breadcrumbs={[
					{ name: 'Аккаунт', href: '/account' },
					{ name: 'Мої списки', href: '' }
				]}
			/>
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">Мої списки</h1>
				<Dialog open={openDialog} onOpenChange={setOpenDialog}>
					<DialogTrigger asChild>
						<Button>Додати список</Button>
					</DialogTrigger>
					<DialogContent title={'Додати список'}>
						<AddListForm setDialogClose={() => setOpenDialog(false)} />
					</DialogContent>
				</Dialog>
			</div>
			<div className="grid grid-cols-3 gap-4">
				{wishlists && wishlists.length
					? wishlists.map((list, index) => (
							<Link href={`/account/wishlists/${list.id}`} key={index} className="bg-zinc-100 rounded p-4 h-[130px]">
								<div className="flex flex-col gap-1">
									<div className="flex items-center justify-between">
										<span className="font-medium">{list.name}</span>
										<ChevronRight />
									</div>
									{/* <span className="text-sm text-zinc-400">2 шт</span> */}
								</div>
							</Link>
					  ))
					: 'Тут нічого немає'}
			</div>
		</div>
	)
}
