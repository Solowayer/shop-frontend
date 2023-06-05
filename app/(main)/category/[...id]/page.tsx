import ProductCard from '@/components/product/ProductCard'
import StyledLink from '@/components/ui/StyledLink'
import { fetchCategoryById } from '@/lib/queries'
import React from 'react'

export default async function Category({ params }: { params: { id: number } }) {
	const category = await fetchCategoryById(params.id)

	console.log(category.parentId)

	const subCategories = category.subCategories

	const products = subCategories.reduce((acc: Product[], subCategory) => {
		return [...acc, ...subCategory.products]
	}, [])

	const popular = products.filter(product => product.rating === 5)

	console.log(subCategories)

	return (
		<div className="flex flex-col gap-4">
			<h3 className="font-bold text-3xl">{category.name}</h3>
			<div className="flex flex-col">
				{category.subCategories.map(category => (
					<StyledLink key={category.id} href={`category/${category.id}`}>
						{category.name}
					</StyledLink>
				))}
			</div>
			<div className="grid grid-cols-4 gap-4">
				{category.products.map(product => (
					<ProductCard
						key={product.id}
						href={`/product/${product.slug}`}
						images={product.images}
						name={product.name}
						price={product.price}
						rating={product.rating}
					/>
				))}
				{popular.map(product => (
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
