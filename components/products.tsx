import React from 'react'
import ProductCard from './product-card'

export default function Products({ products }: { products: Product[] }) {
	return (
		<div className="grid grid-cols-4 gap-4">
			{products.map(product => (
				<ProductCard
					id={product.id}
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
