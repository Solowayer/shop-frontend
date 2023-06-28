'use client'

import CartItemList from '@/components/cart-items'
import { StyledLink, Spinner, Button } from '@/components/ui'
import { fetchCartData } from '@/lib/queries'
import { useCartStore } from '@/store/cartStore'
import { useMutation, useQuery } from '@tanstack/react-query'
import { deleteCart } from '@/lib/mutations'
import { useAuthStore } from '@/store/authStore'
import { useEffect } from 'react'

export default function Cart() {
	const { totalQuantity, cartItems, totalAmount, setCart, setCartDelete } = useCartStore()
	const { isAuth } = useAuthStore()

	const { data, isLoading, isError, isSuccess } = useQuery({
		queryKey: ['cart'],
		queryFn: fetchCartData,
		retry: false
	})

	useEffect(() => {
		if (isSuccess) {
			console.log('cartData:', data)
			data && setCart(data.cartItems, data.totalQuantity, data.totalAmount)
		}
	}, [data, isSuccess, setCart])

	const mutation = useMutation({
		mutationFn: deleteCart
	})

	const handleDeleteCart = async () => {
		try {
			mutation.mutate()
		} catch (error) {
			console.log(error)
		}
		setCartDelete()
	}

	if (isLoading) {
		return <Spinner width="full" />
	}

	if (isError) {
		if (!isAuth) {
			return (
				<div className="flex flex-col gap-8 w-full">
					<h3>
						<StyledLink href="/auth/login">Увійдіть</StyledLink>, щоб додавати товари в корзину
					</h3>
				</div>
			)
		} else {
			return (
				<div className="flex flex-col gap-8 w-full">
					<h3>Виникла помилка під час завантаження корзини</h3>
				</div>
			)
		}
	}

	return (
		<div className="flex flex-col gap-8 w-full">
			<h1 className="text-3xl font-bold">Корзина</h1>
			{cartItems && cartItems.length > 0 ? (
				<div className="flex gap-10">
					<CartItemList cartItems={cartItems} />
					<div className="flex flex-col w-[400px] gap-4">
						<div className="flex justify-between">
							<span>Всього товарів ({data ? totalQuantity : 0}):</span>
							<span className="text-lg font-bold">{data ? totalAmount : 0} ₴</span>
						</div>
						<Button>Оформити замовлення</Button>
						<Button intent="secondary" onClick={() => handleDeleteCart()}>
							Очистити корзину
						</Button>
					</div>
				</div>
			) : (
				<h3 className="w-full">
					Тут поки що нічого немає. <br />
					<StyledLink href="/">Продовжити покупки</StyledLink>
				</h3>
			)}
		</div>
	)
}
