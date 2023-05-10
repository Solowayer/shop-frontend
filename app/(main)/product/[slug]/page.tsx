import { Button } from '@/components/ui/Button'
import Image from 'next/image'
import React from 'react'
import getProduct from '@/lib/getProduct'

export default async function Product({ params }: { params: { slug: string } }) {
	const productData: Promise<Product> = getProduct(params.slug)
	const product = await productData

	return (
		<div className="flex gap-10">
			<div className="relative flex w-[400px] h-[400px]">
				<Image src={product.images[0]} alt={''} fill className="object-contain" />
			</div>
			<div className="flex flex-1 gap-8 items-start justify-between">
				<div className="w-full flex flex-col gap-4">
					<span className="font-medium text-2xl">{product.name}</span>
					{product.description && (
						<>
							<span className="font-bold">Про товар:</span>
							<span className="text-md text-zinc-600">{product.description}</span>
						</>
					)}
				</div>
				<div className="flex flex-col gap-4 w-[372px] p-4 border">
					<span className="text-xl">{product.price} ₴</span>
					<Button fullWidth>Додати в корзину</Button>
				</div>
			</div>
		</div>
	)
}
