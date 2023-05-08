import React from 'react'
import Artwork from '@/ui/Artwork'
import Link from 'next/link'
import Image from 'next/image'
import { Star } from './icons'

interface IProductCard {
	href: string
	images?: string[]
	name: string
	price: string
	rating: number
}

export default function ProductCard({ href, images, name, price, rating }: IProductCard) {
	return (
		<div className="flex flex-col w-[300px] border-2 border-zinc-100 rounded">
			<Link href={href}>
				{images && (
					<div className="relative h-[272px] w-full">
						<Image src={images[0]} alt={'cringe'} fill className="object-contain bg-zinc-100" />
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
