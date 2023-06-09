'use client'

import { ButtonLink, Spinner, Button, StyledLink, TD, TH } from '@/components/ui'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Delete } from '@/components/icons'
import Image from 'next/image'
import ProductService from '@/services/product.service'

export default function SellerProducts() {
	const queryClient = useQueryClient()

	const {
		data: products,
		isError,
		isLoading
	} = useQuery({
		queryKey: ['seller-products'],
		queryFn: ProductService.getBySeller,
		retry: false
	})

	const deleteProductMutation = useMutation({
		mutationFn: ProductService.delete,
		onSuccess: () => {
			queryClient.invalidateQueries(['seller-products'])
		}
	})

	const deleteOneProduct = async (productId: number) => {
		try {
			await deleteProductMutation.mutateAsync(productId)
		} catch (error) {
			console.log(error)
		}
	}

	if (isError) {
		return <h3>Помилка</h3>
	}

	if (isLoading) {
		return <Spinner />
	}

	// console.log('Seller products:', products)

	return (
		<div className="flex flex-col w-full gap-6">
			<div className="flex items-center justify-between">
				<h3 className="text-2xl font-bold">Всі товари</h3>
				<ButtonLink href="/seller/dashboard/products/create">Додати товар</ButtonLink>
			</div>
			{products.length > 0 ? (
				<table className="min-w-full divide-y divide-gray-200">
					<thead>
						<tr>
							<TH>Назва</TH>
							<TH>Ціна</TH>
							<TH>Рейтинг</TH>
							<TH>Дії</TH>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{products &&
							products.map(product => (
								<tr key={product.id}>
									<TD>
										<div className="flex gap-4 items-center text-sm text-gray-900">
											{product.images && product.images.length > 0 && (
												<div className="relative min-w-[64px] h-[64px]">
													<Image
														src={product.images[0]}
														alt={'Product image'}
														fill
														className="object-contain border rounded p-1"
													/>
												</div>
											)}
											<StyledLink href={`/product/${product.slug}`}>{product.name}</StyledLink>
										</div>
									</TD>
									<TD>
										<div className="text-sm text-gray-900">₴{product.price}</div>
									</TD>
									<TD>
										<div className="text-sm text-gray-900">{product.rating}</div>
									</TD>
									<TD>
										<div className="flex gap-2">
											<ButtonLink href={`/seller/dashboard/products/edit/${product.id}`} intent="secondary">
												Змінити
											</ButtonLink>
											<Button shape="square" intent="danger" onClick={() => deleteOneProduct(product.id)}>
												<Delete />
											</Button>
										</div>
									</TD>
								</tr>
							))}
					</tbody>
				</table>
			) : (
				<h3>Товарів поки що немає</h3>
			)}
		</div>
	)
}
