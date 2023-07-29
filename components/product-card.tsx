'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Cart, FavoriteFilled, FavoriteOutlined, Star, CartFilled } from './icons'
import Link from 'next/link'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Button, ButtonLink } from './ui'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import ListService from '@/services/list-service'
import CartService from '@/services/cart-service'

interface ProductProps extends Omit<Product, 'slug' | 'description' | 'categoryId' | 'published'> {
	href: string
}

export default function ProductCard({ id, href, images, name, price, rating }: ProductProps) {
	const [open, setOpen] = useState(false)

	const queryClient = useQueryClient()

	const { data: cartCheck } = useQuery([`check-product-in-cart-${id}`], () => CartService.checkProductInCart(id))
	const { data: listCheck } = useQuery([`check-product-in-list-${id}`], () => ListService.checkProductInList(id))

	const { data: listData } = useQuery(['lists'], ListService.findAll)

	const addCartItemMutation = useMutation({
		mutationFn: CartService.addItem,
		onSuccess: () => {
			queryClient.invalidateQueries(['cart']), queryClient.invalidateQueries([`check-product-in-cart-${id}`])
		}
	})

	const addProductToListMutation = useMutation({
		mutationFn: ({ listId, productId }: { listId: number; productId: number }) =>
			ListService.addProduct(listId, productId),
		onSuccess: () => {
			queryClient.invalidateQueries([`check-product-in-list-${id}`])
		}
	})

	const deleteProductFromListMutation = useMutation({
		mutationFn: (productId: number) => ListService.deleteProduct(productId),
		onSuccess: () => {
			queryClient.invalidateQueries([`check-product-in-list-${id}`])
		}
	})

	const handleAddProductToCart = async () => {
		try {
			await addCartItemMutation.mutateAsync({ productId: id, quantity: 1 })
		} catch (error) {
			console.error('Помилка при додаванні товару до корзини:', error)
		}
	}

	const handleAddProductToList = async (listId: number) => {
		try {
			await addProductToListMutation.mutateAsync({ productId: id, listId })
			setOpen(false)
		} catch (error) {
			console.error('Помилка при додаванні товару до корзини:', error)
		}
	}

	const handleDeleteProductFromList = async () => {
		try {
			await deleteProductFromListMutation.mutateAsync(id)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<li className="relative flex flex-col min-w-[240px] border rounded hover:border-zinc-300 overflow-hidden bg-white">
			{listCheck?.isInList ? (
				<div
					className="absolute flex items-center top-2 right-2 z-50 bg-white p-2 rounded-full"
					onClick={handleDeleteProductFromList}
				>
					<FavoriteFilled size="24" className="text-red-500" />
				</div>
			) : (
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<div className="absolute flex items-center top-2 right-2 z-50 bg-white p-2 rounded-full">
							<FavoriteOutlined size="24" />
						</div>
					</DialogTrigger>
					<DialogContent title="Ваше обране">
						<Button intent="secondary">+ Додати новий список</Button>
						{listData?.map((list, index) => (
							<Button intent="secondary" key={index} onClick={() => handleAddProductToList(list.id)}>
								{list.name}
							</Button>
						))}
					</DialogContent>
				</Dialog>
			)}

			<div className="absolute z-50 bottom-32 right-4">
				{cartCheck?.isInCart ? (
					<ButtonLink intent="positive" shape="circle" href="/cart">
						<CartFilled />
					</ButtonLink>
				) : (
					<Button shape="circle" onClick={handleAddProductToCart}>
						<Cart />
					</Button>
				)}
			</div>

			<Link href={href}>
				<div className="relative h-[180px] w-full">
					{images && images.length > 0 ? (
						<Image src={images[0]} alt={'Product photo'} fill sizes="300px" className="p-4 object-contain" />
					) : (
						<Image src="/../public/no-product-photo.png" alt={'Product photo'} className="object-contain" fill />
					)}
				</div>

				<div className="flex flex-col p-4 gap-2">
					<span className="font-bold">₴{price}</span>
					<span className="hover:text-amber-700 line-clamp-1" title={name}>
						{name}
					</span>
					<span className="flex items-center gap-1">
						{rating} <Star fill="#ffa41c" />
					</span>
				</div>
			</Link>
		</li>
	)
}
