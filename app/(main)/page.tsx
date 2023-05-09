'use client'

import ProductCard from '@/components/ProductCard'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export interface Product {
	id: number
	name: string
	price: number
	rating: number
}

export default function Home() {
	const [products, setProducts] = useState([])

	useEffect(() => {
		async function fetchProducts() {
			const res = await fetch('http://localhost:4200/products')
			const products = await res.json()
			setProducts(products)
		}

		fetchProducts()
	}, [])

	return (
		<div className="grid grid-cols-4 gap-4">
			{products.map((product: Product) => (
				<ProductCard
					key={product.id}
					href={`/${product.id}`}
					name={product.name}
					price={product.price}
					rating={product.rating}
				/>
			))}
		</div>
	)
}
