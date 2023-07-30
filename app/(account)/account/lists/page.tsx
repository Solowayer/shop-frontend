'use client'

import AddListForm from '@/components/forms/create-list-form'
import DefaultError from '@/components/layouts/default-error'
import { Button, Spinner } from '@/components/ui'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import ListService from '@/services/list-service'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Page() {
	const [openDialog, setOpenDialog] = useState(false)
	const { data: lists, isError, isLoading, refetch } = useQuery(['lists'], ListService.findAll)

	if (isLoading) return <Spinner />
	if (isError) return <DefaultError reset={refetch} />

	return (
		<div className="flex flex-col gap-8">
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
				{lists && lists.length
					? lists.map((list, index) => (
							<Link
								href={`/account/lists/${list.id}`}
								key={index}
								className="border rounded p-4 h-[130px] hover:border-black"
							>
								<div className="flex flex-col gap-1">
									<span className="font-medium">{list.name}</span>
									{/* <span className="text-sm text-zinc-400">2 шт</span> */}
								</div>
							</Link>
					  ))
					: 'Тут нічого немає'}
			</div>
		</div>
	)
}
