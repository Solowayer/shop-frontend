import CategoryBreadcrumbs from '@/components/category-breadcrumbs'
import { StyledLink } from '@/components/ui'
import Products from '@/components/products'
import { fetchCategoryBreadcrumbs, fetchCategoryById, fetchProductsByCategoryId } from '@/lib/queries'

export default async function Category({ params }: { params: { id: number } }) {
	const category = await fetchCategoryById(params.id)
	const breadcrumbs = await fetchCategoryBreadcrumbs(params.id)
	const products = await fetchProductsByCategoryId(params.id)

	const childrenWithSameParent = category.children.filter(childCategory => childCategory.parentId === category.id)

	return (
		<div className="flex flex-col gap-4">
			<CategoryBreadcrumbs breadcrumbs={breadcrumbs} />
			<h3 className="font-bold text-3xl">{category.name}</h3>
			<>{category.parentId ? 'ПІДКАТЕГОРІЯ' : 'ГОЛОВНА КАТЕГОРІЯ'}</>
			<div className="flex flex-col">
				{childrenWithSameParent.length > 0 &&
					childrenWithSameParent.map(childCategory => (
						<StyledLink key={childCategory.id} href={`/category/${childCategory.id}`}>
							{childCategory.name}
						</StyledLink>
					))}
			</div>
			<Products products={products} />
		</div>
	)
}
