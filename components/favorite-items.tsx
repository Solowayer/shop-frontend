import React from 'react'
import FavoriteItem from './favorite-item'

export default function FavoriteItems({ products, listId }: { products: Product[]; listId: number }) {
	return (
		<ul className="flex flex-col gap-4">
			{products.map((product, index) => (
				<FavoriteItem
					key={index}
					href={''}
					id={product.id}
					listId={listId}
					images={product.images}
					rating={product.rating}
					name={product.name}
					price={product.price}
				/>
			))}
		</ul>
	)
}
