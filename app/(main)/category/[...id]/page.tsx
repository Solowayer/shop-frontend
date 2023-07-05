import CategoryBreadcrumbs from '@/components/category-breadcrumbs'
import { StyledLink } from '@/components/ui'
import Products from '@/components/products'

import CategoryService from '@/services/category.service'

import ProductService from '@/services/product.service'

export default async function Category({ params }: { params: { id: number } }) {
	const category = await CategoryService.getById(params.id)
	const breadcrumbs = await CategoryService.getBreadcrumbs(params.id)
	const products = await ProductService.getByCategoryId(params.id)

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
