import { fetchProductBySlug } from '@/lib/queries'
import Product from '@/components/product'

export default async function ProductPage({ params }: { params: { slug: string } }) {
	const product: Product = await fetchProductBySlug(params.slug)
	console.log('slug:', params.slug)

	if (!product) return <div>Помилка</div>

	return <Product product={product} />
}
