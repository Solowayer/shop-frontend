import ProductsList from '@/components/product/ProductsList'
import getAllProducts from '@/lib/getAllProducts'

export default async function Home() {
	const productsData: Promise<Product[]> = getAllProducts()
	const products = await productsData

	return <ProductsList products={products} />
}
