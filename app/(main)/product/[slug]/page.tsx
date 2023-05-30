import AddToCartForm from '@/components/cart/AddToCartForm'
import fetchProduct from '@/lib/queries'
import Image from 'next/image'
import React from 'react'

export default async function Product({ params }: { params: { slug: string } }) {
	const product = await fetchProduct(params.slug)

	return (
		<div className="flex gap-10">
			<div className="flex flex-col gap-4 overflow-hidden">
				<div className="relative flex w-[400px] h-[400px] border rounded">
					<Image src={product.images[0]} alt={''} fill className="object-contain p-4" />
				</div>
				<div className="flex gap-2 h-[80px]">
					{product.images.map((image, index) => (
						<Image
							key={index}
							src={image}
							alt={''}
							width={80}
							height={80}
							className="border rounded p-2 object-contain"
						/>
					))}
				</div>
			</div>
			<div className="flex flex-1 gap-8 items-start justify-between">
				<div className="w-full flex flex-col gap-4">
					<span className="font-medium text-2xl">{product.name}</span>
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
