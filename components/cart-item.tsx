'use client'

import React from 'react'
import Image from 'next/image'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import CartService from '@/services/cart-service'

import { Spinner, Button } from '@/components/ui'
import Link from 'next/link'
import { useUserStore } from '@/store/userStore'

export default function CartItem({ id, image, name, price, quantity, productId }: CartItem) {
	const { cartTotalQty, setCartTotalQty } = useUserStore()
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: CartService.deleteCartItem,
		onSuccess: () => {
			queryClient.invalidateQueries(['cart'])
			setCartTotalQty(cartTotalQty - quantity)
		}
	})

	const { isLoading } = mutation

	const handleDeleteCartItem = async () => {
		try {
			mutation.mutate(id)
			console.log(id)
		} catch (error) {
			console.log(error)
		}
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<div className="flex gap-6 bg-white drop-shadow-[0_4px_20px_rgba(34,34,34,.15)] p-6 rounded">
			{image && (
				<div className="relative h-[120px] w-[120px]">
					<Image src={image} alt={''} fill className="object-contain" />
				</div>
			)}
			<div className="flex flex-1 flex-col justify-between">
				<div className="flex justify-between gap-6">
					<span className="w-full flex flex-1 font-medium text-lg hover:text-amber-700 hover:underline cursor-pointer">
						<Link href={`/product/p/${productId}`}>{name}</Link>
					</span>
					<span className="font-bold text-xl min-w-[200px] inline-flex justify-end">{price} ₴</span>
				</div>
				<div className="flex items-center justify-between">
					<span>{quantity}</span>
					<Button intent="secondary" onClick={() => handleDeleteCartItem()}>
						Видалити
					</Button>
				</div>
			</div>
		</div>
	)
}
