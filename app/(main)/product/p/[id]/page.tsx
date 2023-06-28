import { fetchProductById } from '@/lib/queries'
import Product from '@/components/product'

export default async function ProductPage({ params }: { params: { id: number } }) {
	const product: Product = await fetchProductById(params.id)
	console.log('id:', params.id)

	if (!product) return <div>Помилка</div>

	return <Product product={product} />
}
