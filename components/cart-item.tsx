'use client'

import React from 'react'
import Image from 'next/image'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import CartService from '@/services/cart-service'

import { Button } from '@/components/ui'
import Link from 'next/link'
import { Delete } from './icons'
import Stepper from './stepper'

export default function CartItem({ id, image, name, price, quantity, productId }: CartItem) {
	const queryClient = useQueryClient()

	const updateCartItemMutation = useMutation((data: EditCartItem) => CartService.updateItem(id, data), {
		onSuccess: () => {
			queryClient.invalidateQueries(['cart'])
		}
	})

	const deleteCartItemMutation = useMutation(CartService.deleteItem, {
		onSuccess: () => {
			queryClient.invalidateQueries(['cart'])
		}
	})

	const handleUpdateCartItem = async (newQuantity: number) => {
		try {
			await updateCartItemMutation.mutateAsync({ quantity: newQuantity })
		} catch (error) {
			console.log(error)
		}
	}

	const handleDeleteCartItem = async () => {
		try {
			await deleteCartItemMutation.mutateAsync(id)
			console.log(id)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="flex gap-6 bg-white drop-shadow-[0_4px_20px_rgba(34,34,34,.15)] p-6 rounded">
			{image && (
				<div className="relative h-[120px] w-[120px]">
					<Image src={image} alt={''} fill className="object-contain" />
				</div>
			)}
			<div className="flex flex-1 gap-8 flex-col justify-between">
				<div className="flex justify-between gap-6">
					<span className="w-full flex flex-1 font-medium text-lg hover:text-amber-700 hover:underline cursor-pointer">
						<Link href={`/product/p/${productId}`}>{name}</Link>
					</span>
					<span className="font-bold text-xl min-w-[200px] inline-flex justify-end">{price} ₴</span>
				</div>
				<div className="flex items-center gap-4">
					<Stepper value={quantity} setValue={handleUpdateCartItem} onDeleteButton={handleDeleteCartItem} max={33} />
					{quantity > 1 ? (
						<Button intent="secondary" shape="circle" onClick={handleDeleteCartItem}>
							<Delete />
						</Button>
					) : null}
				</div>
			</div>
		</div>
	)
}
