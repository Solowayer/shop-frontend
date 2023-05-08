import ProductCard from '@/components/ProductCard'
import { Button } from '@/ui/Button'

export default function Home() {
	return (
		<>
			<ProductCard
				href=""
				images={[
					'https://m.media-amazon.com/images/I/71Pi1Gy2fXL._AC_UL320_.jpg',
					'https://m.media-amazon.com/images/I/61f3XiTXbTL._AC_SX466_.jpg'
				]}
				name={'Блок живлення Aerocool VX Plus 600 600W'}
				price={'1399'}
				rating={0}
			></ProductCard>
		</>
	)
}
