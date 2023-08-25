'use client'

import React, { useState } from 'react'
import ListService from '@/services/wishlist-service'
import { useQuery } from '@tanstack/react-query'
import { Button, Spinner } from '@/components/ui'
import ProductService from '@/services/product-service'
import { More } from '@/components/icons'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import EditWishlistForm from '@/components/forms/edit-wishlist-form'
import FavoriteItem from '@/components/favorite-item'
import Breadcrumbs from '@/components/breadcrumbs'

export default function Page({ params, searchParams }: { params: { id: number }; searchParams: { page: number } }) {
	const PER_PAGE = 8

	const [openDialog, setOpenDialog] = useState(false)
	const { data: list, isLoading } = useQuery([`wishlist`, params.id], () => ListService.findWishlistById(params.id))
	const { data: productsData } = useQuery(['wishlist-products', params.id], () =>
		ProductService.findProductsByWishlist(params.id, {
			sort: 'high-price',
			min_price: undefined,
			max_price: undefined,
			q: undefined,
			page: searchParams.page,
			limit: PER_PAGE
		})
	)

	if (isLoading) return <Spinner />

	return (
		<div className="flex flex-col gap-8">
			<Breadcrumbs
				breadcrumbs={[
					{ name: 'Аккаунт', href: '/account' },
					{ name: 'Мої списки', href: '/account/wishlists' },
					{ name: `Список "${list?.name}"`, href: '/' }
				]}
			/>
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
						<EditWishlistForm listId={params.id} setDialogClose={() => setOpenDialog(false)} />
					</DialogContent>
				</Dialog>
			</div>
			<hr />
			{productsData && productsData.products.length > 0 ? (
				<ul className="flex flex-col gap-4">
					{productsData.products.map((product, index) => (
						<FavoriteItem
							key={index}
							href={`/product/${product.slug}`}
							id={product.id}
							listId={params.id}
							rating={product.rating}
							images={product.images}
							name={product.name}
							price={product.price}
							stock={product.stock}
						/>
					))}
				</ul>
			) : (
				<span>Тут нічого немає</span>
			)}
		</div>
	)
}
