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

export default function ProductListCard({ id, href, images, name, price, rating }: ProductProps) {
	const { data: listData } = useQuery(['lists'], ListService.getAll)

	return (
		<div className="flex">
			<Link href={href}>
				<div className="relative h-[180px] w-[180px]">
					{images && images.length > 0 ? (
						<Image src={images[0]} alt={'Product photo'} fill sizes="300px" className="p-4 object-contain" />
					) : (
						<Image src="/../public/no-product-photo.png" alt={'Product photo'} className="object-contain" fill />
					)}
				</div>
			</Link>

			<div className="flex w-full justify-between p-4 gap-2">
				<Link href={href} className="flex flex-col gap-2">
					<span className="hover:text-amber-700" title={name}>
						{name}
					</span>
					<span className="flex items-center gap-1">
						{rating} <Star fill="#ffa41c" />
					</span>
				</Link>

				<span className="font-bold text-xl whitespace-nowrap">{price} ₴</span>
			</div>
		</div>
	)
}
