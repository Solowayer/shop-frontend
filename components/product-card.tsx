'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { FavoriteFilled, FavoriteOutlined, Star } from './icons'
import Link from 'next/link'
import { Toggle } from './ui/toggle'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui'
import { useQuery } from '@tanstack/react-query'
import ListService from '@/services/list-service'

interface ProductProps extends Omit<Product, 'slug' | 'description' | 'categoryId' | 'published'> {
	href: string
}

export default function ProductCard({ id, href, images, name, price, rating }: ProductProps) {
	const [pressed, setPressed] = useState<boolean>(false)

	const { data: listData } = useQuery(['lists'], ListService.getAll)

	return (
		<li className="relative flex flex-col min-w-[240px] border-2 rounded hover:border-zinc-300 overflow-hidden bg-white">
			<Dialog>
				<DialogTrigger asChild>
					<Toggle className="absolute flex items-center top-2 right-2 z-50 bg-white p-2 rounded-full" pressed={true}>
						{pressed ? <FavoriteFilled size="24" className="text-red-500" /> : <FavoriteOutlined size="24" />}
					</Toggle>
				</DialogTrigger>
				<DialogContent title="Ваше обране">
					<Button intent="secondary" onClick={() => setPressed(!pressed)}>
						+ Додати новий список
					</Button>
					{listData?.map((list, index) => (
						<Button intent="secondary" key={index} onClick={() => alert(list.id)}>
							{list.name}
						</Button>
					))}
				</DialogContent>
			</Dialog>

			<Link href={href}>
				<div className="relative h-[180px] w-full">
					{images && images.length > 0 ? (
						<Image src={images[0]} alt={'Product photo'} fill sizes="300px" className="p-4 object-contain" />
					) : (
						<Image src="/../public/no-product-photo.png" alt={'Product photo'} className="object-contain" fill />
					)}
				</div>

				<div className="flex flex-col p-4 gap-2">
					<span className="hover:text-amber-700 line-clamp-1" title={name}>
						{name}
					</span>
					<span className="flex items-center gap-1">
						{rating} <Star fill="#ffa41c" />
					</span>
					<span className="font-bold text-xl">{price} ₴</span>
				</div>
			</Link>
		</li>
	)
}
