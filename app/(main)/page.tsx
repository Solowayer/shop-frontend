import ProductCard from '@/components/product/ProductCard'
import { fetchAllProducts } from '@/lib/queries'

export default async function Home() {
	const products = await fetchAllProducts()

	return (
		<>
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
		</>
	)
}
