'use client'

import CartItemList from '@/components/cart/CartItemList'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'
import { fetchCartData } from '@/lib/queries'
import { useCartStore } from '@/store/cartStore'
import { useMutation, useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { deleteCart } from '@/lib/mutations'

export default function Cart() {
	const { setCartItemCount, setCartItems, setCartTotalAmountPrice } = useCartStore()
	const { cartItemCount, cartItems, cartTotalAmountPrice } = useCartStore()

	const { data, isLoading, isError } = useQuery({
		queryKey: ['cart'],
		queryFn: fetchCartData,
		retry: false,
		onSuccess: data => {
			setCartItemCount(data ? data.cartItems.reduce((total, item) => total + item.quantity, 0) : 0)
			setCartItems(data.cartItems)
			setCartTotalAmountPrice(data.totalAmount)
		}
	})

	const mutation = useMutation({
		mutationFn: deleteCart
	})

	const handleDeleteCart = () => {
		try {
			mutation.mutate()
		} catch (error) {
			console.log(error)
		}
		setCartItemCount(0)
		setCartItems(null)
		setCartTotalAmountPrice(0)
	}

	if (isLoading) {
		return <Spinner width="full" />
	}

	return (
		<div className="flex flex-col gap-8 w-full">
			<h1 className="text-3xl font-bold">Корзина</h1>
			{isError ? (
				<h3>
					<Link href="auth/login" className="text-blue-500 hover:underline">
						Увійдіть
					</Link>
					, щоб додавати товари в корзину
				</h3>
			) : (
				<>
					{cartItems ? (
						<div className="flex gap-10">
							<CartItemList cartItems={cartItems} />
							<div className="flex flex-col w-[400px] gap-4">
								<div className="flex justify-between">
									<span>Всього товарів ({data ? cartItemCount : 0}):</span>
									<span className="text-lg font-bold">{data ? cartTotalAmountPrice : 0} ₴</span>
								</div>
								<Button>Оформити замовлення</Button>
								<Button variant="secondary" onClick={() => handleDeleteCart()}>
									Очистити корзину
								</Button>
							</div>
						</div>
					) : (
						<h3 className="w-full">
							Тут поки що нічого немає. <br />
							<Link href="/" className="text-blue-500 hover:underline">
								Продовжити покупки
							</Link>
						</h3>
					)}
				</>
			)}
		</div>
	)
}
