import Product from '@/components/product'
import CategoryBreadcrumbs from '@/components/category-breadcrumbs'
import ProductService from '@/services/product-service'
import CategoryService from '@/services/category-service'

export default async function ProductPage({ params }: { params: { slug: string } }) {
	const product = await ProductService.findProductBySlug(params.slug)
	const breadcrumbs = await CategoryService.findCategoryBreadcrumbs(product.categoryId)

	return (
		<div className="flex flex-col gap-4">
			<CategoryBreadcrumbs breadcrumbs={breadcrumbs} />
			<Product product={product} />
		</div>
	)
}
