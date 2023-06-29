'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { addtoCart } from '@/lib/mutations'
import { Button, Input } from '@/components/ui'
import { useCartStore } from '@/store/cartStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { addToCartSchema } from '@/lib/validation/cartSchema'
import { useStore } from '@/store/use-store-hook'
import { useAuthStore } from '@/store/authStore'
import { useEffect } from 'react'

export default function AddToCartForm({ productId }: { productId: number }) {
	const { setTotalQuantity, totalQuantity } = useCartStore()
	const isAuth = useStore(useAuthStore, state => state.isAuth)

	const mutation = useMutation({
		mutationFn: addtoCart
	})

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<AddToCart>({
		defaultValues: {
			quantity: 1,
			productId: productId
		},
		resolver: zodResolver(addToCartSchema)
	})

	const onSubmit: SubmitHandler<AddToCart> = data => {
		mutation.mutate({ ...data })
		if (isAuth) {
			const quantityValue = data.quantity
			setTotalQuantity(totalQuantity + quantityValue)
			console.log('totalQuantity:', totalQuantity)
		}
	}

	if (mutation.isError) {
		throw new Error('Failed to load')
	}

	useEffect(() => {
		console.log('inititalized totalQuantity:', totalQuantity)
	}, [totalQuantity])

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<hr />
			<Input
				label="Виберіть кількість:"
				id="quantity"
				type="number"
				min={1}
				{...register('quantity', { valueAsNumber: true })}
			/>
			{errors.quantity && <span className="text-red-500">Помилка</span>}
			<Button type="submit" fullWidth disabled={isSubmitting}>
				{isSubmitting ? 'Додається...' : 'Додати в корзину'}
			</Button>
			{!isAuth && mutation.isSuccess && <span className="text-red-500">Увійдіть, щоб додавати товари в корзину</span>}
		</form>
	)
}