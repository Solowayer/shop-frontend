import React from 'react'
import ProductCard from './ProductCard'

export default function ProductsList({ products }: { products: Product[] }) {
	return (
		<div className="grid grid-cols-4 gap-4">
			{products.map(product => (
				<ProductCard
					key={product.id}
					href={`/product/${product.slug}`}
					images={product.images}
					name={product.name}
					price={product.price}
					rating={product.rating}
				/>
			))}
		</div>
	)
}
