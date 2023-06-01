'use client'

import CartItemList from '@/components/cart/CartItemList'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'
import { fetchCartData } from '@/lib/queries'
import { useCartStore } from '@/store/cartStore'
import { useMutation, useQuery } from '@tanstack/react-query'
import StyledLink from '@/components/ui/StyledLink'
import { deleteCart } from '@/lib/mutations'
import { useAuthStore } from '@/store/authStore'

export default function Cart() {
	const { cartItemsQuantity, cartItems, cartTotalAmountPrice, setCartItemCreate, setCartDelete } = useCartStore()
	const { isAuth } = useAuthStore()

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['cart'],
		queryFn: fetchCartData,
		retry: false,
		onSuccess: data => {
			console.log(data)
			const quantity = data ? data.cartItems.reduce((total, item) => total + item.quantity, 0) : 0
			setCartItemCreate(quantity, data.cartItems, data.totalAmount)
		}
	})

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
							<span>Всього товарів ({data ? cartItemsQuantity : 0}):</span>
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
					<StyledLink href="/">Продовжити покупки</StyledLink>
				</h3>
			)}
		</div>
	)
}
