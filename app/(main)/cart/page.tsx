'use client'

import CartItems from '@/components/cart-items'
import { StyledLink, Spinner, Button } from '@/components/ui'
import CartService from '@/services/cart-service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useUserStore } from '@/store/userStore'
import { useStore } from '@/store/use-store-hook'
import DefaultError from '@/components/layouts/default-error'

export default function Cart() {
	const queryClient = useQueryClient()
	const isAuth = useStore(useUserStore, state => state.isAuth)
	const { setCartTotalQty } = useUserStore()

	const {
		data: cartData,
		isLoading,
		isError,
		refetch
	} = useQuery({
		queryKey: ['cart'],
		queryFn: CartService.getAllItems
	})

	const cartMutation = useMutation({
		mutationFn: CartService.deleteItems,
		onSuccess: () => {
			queryClient.invalidateQueries(['cart'])
			setCartTotalQty(0)
		}
	})

	const handleDeleteCart = async () => {
		try {
			cartMutation.mutate()
		} catch (error) {
			console.log(error)
		}
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
			return <DefaultError reset={refetch} />
		}
	}

	return (
		<div className="flex flex-col gap-8 w-full">
			<h1 className="text-3xl font-bold">Корзина</h1>
			{cartData && cartData.cartItems.length ? (
				<div className="flex gap-10">
					<CartItems cartItems={cartData.cartItems} />
					<div className="flex flex-col w-[400px] gap-4">
						<div className="flex justify-between">
							<span>Всього товарів ({cartData ? cartData.totalQuantity : 0}):</span>
							<span className="text-lg font-bold">{cartData ? cartData.totalAmount : 0} ₴</span>
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
