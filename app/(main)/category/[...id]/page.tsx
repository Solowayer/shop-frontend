import CategoryBreadcrumbs from '@/components/category-breadcrumbs'
import { StyledLink } from '@/components/ui'

import CategoryService from '@/services/category-service'
import ProductsByCategoryId from '@/components/products-by-category-id'
import ProductsByCategoryTree from '@/components/products-by-category-tree'

export default async function Category({
	params,
	searchParams
}: {
	params: { id: number }
	searchParams: { page: number }
}) {
	const PER_PAGE = 8

	const category = await CategoryService.getById(params.id)

	const breadcrumbs = await CategoryService.getBreadcrumbs(params.id)

	const children = category.children
	const childrenWithSameParent = children.filter(childCategory => childCategory.parentId === category.id)

	return (
		<div className="flex flex-col gap-4">
			<CategoryBreadcrumbs breadcrumbs={breadcrumbs} />
			<h3 className="font-bold text-3xl">{category.name}</h3>
			<>
				{children.length > 0 ? (
					<div className="flex flex-col gap-4">
						<div className="flex flex-col">
							{childrenWithSameParent.length > 0 &&
								childrenWithSameParent.map(childCategory => (
									<StyledLink key={childCategory.id} href={`/category/${childCategory.id}`}>
										{childCategory.name}
									</StyledLink>
								))}
						</div>
						<ProductsByCategoryTree id={params.id} page={searchParams.page} perPage={PER_PAGE} />
					</div>
				) : (
					<ProductsByCategoryId id={params.id} page={searchParams.page} perPage={PER_PAGE} />
				)}
			</>
		</div>
	)
}
