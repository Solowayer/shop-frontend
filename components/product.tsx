import React from 'react'
import Image from 'next/image'
import AddToCartForm from './forms/add-to-cart-form'
import { Star } from './icons'

export default function Product({ product }: { product: Product }) {
	return (
		<div className="flex gap-10">
			{product.images && product.images.length > 0 && (
				<div className="flex flex-col gap-4 overflow-hidden w-[400px]">
					<div className="relative flex h-[400px] border rounded">
						<Image src={product.images[0]} alt={''} fill className="object-contain p-4" />
					</div>
					<div className="flex gap-2 h-[100px] overflow-x-auto">
						{product.images.map((image, index) => (
							<Image
								key={index}
								src={image}
								alt={''}
								width={100}
								height={100}
								className="border rounded p-2 object-contain"
							/>
						))}
					</div>
				</div>
			)}
			<div className="flex flex-1 gap-8 items-start justify-between">
				<div className="w-full flex flex-col gap-4">
					<span className="font-medium text-2xl">{product.name}</span>
					<span className="flex items-center gap-1 text-yellow-600">
						{product.rating}
						<Star />
					</span>
					<span className="font-bold">Про товар:</span>
					<span className="text-md text-zinc-600">{product.description ?? 'Опис відсутній'}</span>
				</div>
				<div className="flex flex-col gap-4 w-[372px] p-4 border rounded">
					<span className="text-xl">{product.price} ₴</span>
					<AddToCartForm productId={product.id} />
				</div>
			</div>
		</div>
	)
}
