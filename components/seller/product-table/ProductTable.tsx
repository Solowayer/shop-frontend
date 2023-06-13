import React from 'react'
import ProductTableHeader from './ProductTableHeader'

export default function ProductTable({ products }: { products: Product[] }) {
	return (
		<table className="min-w-full divide-y divide-gray-200">
			<ProductTableHeader />
			<tbody className="bg-white divide-y divide-gray-200">
				{products.map(product => (
					<tr key={product.id}>
						<td className="px-6 py-4 whitespace-nowrap">
							<div className="text-sm text-gray-900">{product.slug}</div>
						</td>
						<td className="px-6 py-4 whitespace-nowrap">
							<div className="text-sm text-gray-900">{product.name}</div>
						</td>
						<td className="px-6 py-4 whitespace-nowrap">
							<div className="text-sm text-gray-900">${product.price}</div>
						</td>
						<td className="px-6 py-4 whitespace-nowrap">
							<div className="text-sm text-gray-900">{product.rating}</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
