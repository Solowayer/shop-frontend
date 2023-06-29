import ProductCard from '@/components/product-card'
import CategoryBreadcrumbs from '@/components/category-breadcrumbs'
import { StyledLink } from '@/components/ui'
import Products from '@/components/products'
import { fetchCategoryById, fetchProductsByCategoryId } from '@/lib/queries'
import { getCategoryBreadcrumbs } from '@/lib/utils/getCategoryBreadcrumbs'

export default async function Category({ params }: { params: { id: number } }) {
	const category = await fetchCategoryById(params.id)
	const breadcrumbs = await getCategoryBreadcrumbs(category)
	const products = await fetchProductsByCategoryId(params.id)

	const filteredChildren = category.children.filter(childCategory => childCategory.parentId === category.id)

	return (
		<div className="flex flex-col gap-4">
			<CategoryBreadcrumbs breadcrumbs={breadcrumbs} />
			<h3 className="font-bold text-3xl">{category.name}</h3>
			<>{category.isMain ? 'ГОЛОВНА КАТЕГОРІЯ' : 'ПІДКАТЕГОРІЯ'}</>
			<div className="flex flex-col">
				{filteredChildren.length > 0 &&
					filteredChildren.map(childCategory => (
						<StyledLink key={childCategory.id} href={`category/${childCategory.id}`}>
							{childCategory.name}
						</StyledLink>
					))}
			</div>
			<Products products={products} />
		</div>
	)
}
