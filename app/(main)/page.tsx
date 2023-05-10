import ProductCard from '@/components/ProductCard'
import getAllProducts from '@/lib/getAllProducts'

export default async function Home() {
	const productsData: Promise<Product[]> = getAllProducts()
	const products = await productsData

	return (
		<div className="grid grid-cols-4 gap-4">
			{products.map(product => (
				<ProductCard
					key={product.id}
					href={`/product/${product.slug}`}
					images={product.images}
					name={product.name}
					price={product.price}
					rating={product.rating}
				/>
			))}
		</div>
	)
}
