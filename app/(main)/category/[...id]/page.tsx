import ProductCard from '@/components/product/ProductCard'
import StyledLink from '@/components/ui/StyledLink'
import { fetchCategoryById, fetchProductsByCategoryId } from '@/lib/queries'
import CategoryBreadcrumbs from '@/components/category/CategoryBreadcrumbs'
import { getCategoryBreadcrumbs } from '@/lib/getCategoryBreadcrumbs'

export default async function Category({ params }: { params: { id: number } }) {
	const category = await fetchCategoryById(params.id)
	const products = await fetchProductsByCategoryId(params.id)
	const breadcrumbs = await getCategoryBreadcrumbs(category)

	const subCategories = category.subCategories

	console.log(subCategories)

	return (
		<div className="flex flex-col gap-4">
			<CategoryBreadcrumbs breadcrumbs={breadcrumbs} />
			<h3 className="font-bold text-3xl">{category.name}</h3>
			<>{category.parentId ? 'Категорія всередині' : 'ТОП КАТЕГОРІЯ'}</>
			<div className="flex flex-col">
				{category.subCategories.map(category => (
					<StyledLink key={category.id} href={`category/${category.id}`}>
						{category.name}
					</StyledLink>
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
