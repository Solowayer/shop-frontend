import React from 'react'
import ProductCard from './product-card'

export default function ProductsGrid({ products }: { products: Product[] }) {
	return (
		<ul className="grid grid-cols-4 gap-4">
			{products.map(product => (
				<ProductCard
					id={product.id}
					key={product.id}
					name={product.name}
					images={product.images}
					price={product.price}
					stock={product.stock}
					rating={product.rating}
					href={`/product/${product.slug}`}
				/>
			))}
		</ul>
	)
}
