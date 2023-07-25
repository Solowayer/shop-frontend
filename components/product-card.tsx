'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Cart, Check, FavoriteFilled, FavoriteOutlined, Star } from './icons'
import Link from 'next/link'
import { Toggle } from './ui/toggle'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Button, ButtonLink } from './ui'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import ListService from '@/services/list-service'
import CartService from '@/services/cart-service'

interface ProductProps extends Omit<Product, 'slug' | 'description' | 'categoryId' | 'published'> {
	href: string
}

export default function ProductCard({ id, href, images, name, price, rating }: ProductProps) {
	const queryClient = useQueryClient()
	const [pressed, setPressed] = useState<boolean>(false)

	const { isError: isCartItemError, isLoading: isCartItemLoading } = useQuery([`cart-item-${id}`], () =>
		CartService.getItemByProductId(id)
	)

	const addCartItemMutation = useMutation({
		mutationFn: CartService.addItem,
		onSuccess: () => {
			queryClient.invalidateQueries(['cart']), queryClient.invalidateQueries([`cart-item-${id}`])
		}
	})

	const addProductToCart = async () => {
		try {
			await addCartItemMutation.mutateAsync({ productId: id, quantity: 1 })
		} catch (error) {
			console.error('Помилка при додаванні товару до корзини:', error)
		}
	}

	const { data: listData } = useQuery(['lists'], ListService.getAll)

	return (
		<li className="relative flex flex-col min-w-[240px] border rounded hover:border-zinc-300 overflow-hidden bg-white">
			<Dialog>
				<DialogTrigger asChild>
					<Toggle className="absolute flex items-center top-2 right-2 z-50 bg-white p-2 rounded-full" pressed={true}>
						{pressed ? <FavoriteFilled size="24" className="text-red-500" /> : <FavoriteOutlined size="24" />}
					</Toggle>
				</DialogTrigger>
				<DialogContent title="Ваше обране">
					<Button intent="secondary" onClick={() => setPressed(!pressed)}>
						+ Додати новий список
					</Button>
					{listData?.map((list, index) => (
						<Button intent="secondary" key={index} onClick={() => alert(list.id)}>
							{list.name}
						</Button>
					))}
				</DialogContent>
			</Dialog>

			<div className="absolute z-50 bottom-32 right-4">
				{isCartItemError ? (
					<Button shape="circle" onClick={addProductToCart}>
						<Cart />
					</Button>
				) : (
					<ButtonLink intent="positive" shape="circle" href="/cart">
						<Check />
					</ButtonLink>
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
