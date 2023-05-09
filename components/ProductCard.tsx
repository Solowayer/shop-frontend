import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star } from './icons'

export interface IProductCard {
	href: string
	image?: string
	name: string
	price: number
	rating: number
}

export default function ProductCard({ href, image, name, price, rating }: IProductCard) {
	return (
		<div className="flex flex-col min-w-[300px] border-2 border-zinc-100 rounded">
			<Link href={href}>
				{image && (
					<div className="relative h-[272px] w-full">
						<Image src={image} alt={'cringe'} fill className="p-4 object-contain bg-zinc-100" />
					</div>
				)}
				<div className="flex flex-col p-4 gap-2">
					<span className="hover:text-amber-700">{name}</span>
					<span className="flex items-center gap-1">
						{rating} <Star fill="#ffa41c" />
					</span>
					<span className="font-bold text-xl">{price} ₴</span>
				</div>
			</Link>
		</div>
	)
}
