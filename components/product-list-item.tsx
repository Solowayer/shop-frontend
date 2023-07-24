'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { Star } from './icons'
import Link from 'next/link'
import { Button } from './ui'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import CartService from '@/services/cart-service'
import { useUserStore } from '@/store/userStore'
import Stepper from './stepper'

interface ProductProps extends Omit<Product, 'slug' | 'description' | 'categoryId' | 'published'> {
	href: string
}

export default function ProductListItem({ id, href, images, name, price, rating }: ProductProps) {
	const queryClient = useQueryClient()
	const { cartTotalQty, setCartTotalQty } = useUserStore()

	const { data: cartItemData } = useQuery([`cart-item-${id}`], () => CartService.getItemByProductId(id))

	const addCartItemMutation = useMutation({
		mutationFn: CartService.addItem,
		onSuccess: () => {
			setCartTotalQty(cartTotalQty + 1), queryClient.invalidateQueries([`cart-item-${id}`])
		}
	})

	const addProductToCart = async () => {
		try {
			await addCartItemMutation.mutateAsync({ productId: id, quantity: 1 })
		} catch (error) {
			console.error('Помилка при додаванні товару до корзини:', error)
		}
	}

	return (
		<li className="flex gap-8">
			<Link href={href}>
				<div className="relative h-[180px] w-[180px] select-none">
					{images && images.length > 0 ? (
						<Image src={images[0]} alt={'Product photo'} fill sizes="300px" className="p-4 object-contain" />
					) : (
						<Image src="/../public/no-product-photo.png" alt={'Product photo'} className="object-contain" fill />
					)}
				</div>
			</Link>
			<div className="flex w-full gap-8 justify-between">
				<div className="flex flex-col gap-2">
					<Link href={href} className="flex flex-col gap-2">
						<span className="hover:text-amber-700" title={name}>
							{name}
						</span>
					</Link>
					<span className="font-bold text-xl whitespace-nowrap">{price} ₴</span>
					<span className="flex items-center gap-1">
						{rating} <Star fill="#ffa41c" />
					</span>
				</div>
				<div className="flex justify-end">
					{cartItemData && cartItemData.quantity ? (
						// <Stepper quantity={cartItemData.quantity} />
						'cringe'
					) : (
						<Button onClick={addProductToCart}>
							<span className="whitespace-nowrap">В корзину</span>
						</Button>
					)}
				</div>
			</div>
		</li>
	)
}
