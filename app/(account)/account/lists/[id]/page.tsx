'use client'

import React, { useState } from 'react'
import ListService from '@/services/list-service'
import { useQuery } from '@tanstack/react-query'
import { Button, Spinner } from '@/components/ui'
import ProductService from '@/services/product-service'
import { More } from '@/components/icons'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import EditListForm from '@/components/forms/edit-list-form'
import FavoriteItem from '@/components/favorite-item'

export default function Page({ params }: { params: { id: number } }) {
	const [openDialog, setOpenDialog] = useState(false)
	const { data: list, isLoading } = useQuery([`list`, params.id], () => ListService.findById(params.id))
	const { data: productsData } = useQuery(['list-products', params.id], () => ProductService.findByList(params.id))

	if (isLoading) return <Spinner />

	return (
		<div className="flex flex-col gap-8">
			<div className="flex items-center">
				<h1 className="w-full text-3xl font-bold">{list?.name}</h1>
				<Dialog open={openDialog} onOpenChange={setOpenDialog}>
					<DialogTrigger asChild>
						<Button intent="secondary">
							Налаштування
							<More />
						</Button>
					</DialogTrigger>
					<DialogContent title="Налаштування">
						<EditListForm listId={params.id} setDialogClose={() => setOpenDialog(false)} />
					</DialogContent>
				</Dialog>
			</div>
			<hr />
			{productsData && productsData.products.length > 0 ? (
				<ul className="flex flex-col gap-4">
					{productsData.products.map((product, index) => (
						<FavoriteItem
							key={index}
							href={''}
							id={product.id}
							listId={params.id}
							images={product.images}
							rating={product.rating}
							name={product.name}
							price={product.price}
						/>
					))}
				</ul>
			) : (
				<span>Тут нічого немає</span>
			)}
		</div>
	)
}
