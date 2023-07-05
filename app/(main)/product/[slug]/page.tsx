import { fetchCategoryBreadcrumbs, fetchProductBySlug } from '@/lib/queries'
import Product from '@/components/product'
import CategoryBreadcrumbs from '@/components/category-breadcrumbs'

export default async function ProductPage({ params }: { params: { slug: string } }) {
	const product: Product = await fetchProductBySlug(params.slug)
	const breadcrumbs: Category[] = await fetchCategoryBreadcrumbs(product.categoryId)
	console.log('slug:', params.slug)

	if (!product) return <div>Помилка</div>

	return (
		<div className="flex flex-col gap-4">
			<CategoryBreadcrumbs breadcrumbs={breadcrumbs} />
			<Product product={product} />
		</div>
	)
}
