'use client'

import CartItemList from '@/components/cart/CartItemList'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'
import { fetchCartData } from '@/lib/queries'
import { useCartStore } from '@/store/cartStore'
import { useQuery } from '@tanstack/react-query'
import { useStore } from '@/store/use-store-hook'

export default function Cart() {
	const { setCartItemCount } = useCartStore()
	const cartItemCount = useStore(useCartStore, state => state.cartItemCount)

	const { data, isLoading, isError } = useQuery({
		queryKey: ['cart'],
		queryFn: fetchCartData,
		retry: false,
		onSuccess: data => {
			setCartItemCount(data.cartItems.reduce((total, item) => total + item.quantity, 0))
		}
	})

	if (isLoading) {
		return <Spinner width="full" />
	}

	return (
		<div className="flex flex-col gap-8 w-full">
			<h1 className="text-3xl font-bold">Корзина</h1>
			{isError ? (
				<h3>Увійдіть, щоб додавати товари в корзину</h3>
			) : (
				<div className="flex gap-10">
					{data ? <CartItemList cartItems={data.cartItems} /> : <h3 className="w-full">Тут поки що нічого немає</h3>}
					<div className="flex flex-col w-[400px] gap-4">
						<div className="flex justify-between">
							<span>Всього товарів ({data ? cartItemCount : 0}):</span>
							<span className="text-lg font-bold">{data ? data.totalAmount : 0} ₴</span>
						</div>
						<Button>Оформити замовлення</Button>
					</div>
				</div>
			)}
		</div>
	)
}
