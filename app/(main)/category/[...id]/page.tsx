import ProductCard from '@/components/product/ProductCard'
import { fetchCategoryById } from '@/lib/queries'
import React from 'react'

export default async function Category({ params }: { params: { id: number } }) {
	const category = await fetchCategoryById(params.id)

	const subCategories = category.subCategories

	const products = subCategories.reduce((acc: Product[], subCategory) => {
		return [...acc, ...subCategory.products]
	}, [])

	console.log(subCategories)

	return (
		<div className="flex flex-col gap-4">
			<h3 className="font-bold text-2xl">{category.name}</h3>
			<div>
				{category.subCategories.map(category => (
					<div key={category.id}>{category.name}</div>
				))}
			</div>
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
		</div>
	)
}
