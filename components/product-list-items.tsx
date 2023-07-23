import React from 'react'
import ProductListItem from './product-list-item'

export default function ProductListItems({ products }: { products: Product[] }) {
	return (
		<li className="flex flex-col gap-4">
			{products.map((product, index) => (
				<ProductListItem
					key={index}
					href={''}
					id={product.id}
					images={product.images}
					rating={product.rating}
					name={product.name}
					price={product.price}
				/>
			))}
		</li>
	)
}
