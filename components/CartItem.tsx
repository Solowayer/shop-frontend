import React from 'react'
import Image from 'next/image'
import { Button } from '@/ui/Button'

interface ICartItem {
	image?: string
	name: string
	price: number
	quantity: number
}

export default function CartItem({ image, name, price, quantity }: ICartItem) {
	return (
		<div className="flex gap-6 bg-white drop-shadow-[0_4px_20px_rgba(34,34,34,.15)] p-6 rounded">
			{image && (
				<div className="relative h-[120px] w-[120px]">
					<Image src={image} alt={'cringe'} fill className="object-contain" />
				</div>
			)}
			<div className="flex flex-1 flex-col justify-between">
				<div className="flex justify-between gap-6">
					<span className="w-full flex flex-1 font-medium text-lg">{name}</span>
					<span className="font-bold text-xl min-w-[200px] inline-flex justify-end">{price} ₴</span>
				</div>
				<div className="flex items-center justify-between">
					<span>{quantity}</span>
					<Button variant="secondary">Видалити</Button>
				</div>
			</div>
		</div>
	)
}
