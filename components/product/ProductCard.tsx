import React from 'react'
import Image from 'next/image'
import { Star } from '../icons'
import Link from 'next/link'

interface ProductProps extends Omit<Product, 'id' | 'slug' | 'description'> {
	href: string
}

export default function ProductCard({ href, images, name, price, rating }: ProductProps) {
	return (
		<div className="flex flex-col min-w-[240px] border-2 rounded hover:border-zinc-300 overflow-hidden">
			<Link href={href}>
				<div className="relative h-[272px] w-full">
					{images.length > 0 ? (
						<Image src={images[0]} alt={'Product photo'} fill sizes="400px" className="p-4 object-contain" />
					) : (
						<Image src="/../public/no-product-photo.png" alt={'Product photo'} className="object-contain" fill />
					)}
				</div>

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
