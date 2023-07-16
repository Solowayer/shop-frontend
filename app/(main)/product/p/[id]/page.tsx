import CategoryBreadcrumbs from '@/components/category-breadcrumbs'
import Product from '@/components/product'
import ProductService from '@/services/product-service'
import CategoryService from '@/services/category-service'

export default async function ProductPage({ params }: { params: { id: number } }) {
	const product = await ProductService.getById(params.id)
	const breadcrumbs = await CategoryService.getBreadcrumbs(product.categoryId)

	if (!product) return <div>Помилка</div>

	return (
		<div className="flex flex-col gap-4">
			<CategoryBreadcrumbs breadcrumbs={breadcrumbs} />
			<Product product={product} />
		</div>
	)
}
