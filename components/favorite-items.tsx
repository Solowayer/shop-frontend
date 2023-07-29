import React from 'react'
import FavoriteItem from './favorite-item'

export default function FavoriteItems({ products }: { products: Product[] }) {
	return (
		<ul className="flex flex-col gap-4">
			{products.map((product, index) => (
				<FavoriteItem
					key={index}
					href={''}
					id={product.id}
					images={product.images}
					rating={product.rating}
					name={product.name}
					price={product.price}
				/>
			))}
		</ul>
	)
}
