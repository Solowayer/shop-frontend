import { fetchProductById, fetchProductBySlug } from '@/lib/queries'
import ProductPage from '@/components/product/Product'

export default async function Product({ params }: { params: { slug: string; id: number } }) {
	const product: Product = params.slug ? await fetchProductBySlug(params.slug) : await fetchProductById(params.id)

	return <ProductPage product={product} />
}
