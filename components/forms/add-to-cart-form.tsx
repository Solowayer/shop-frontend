'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import CartService from '@/services/cart-service'

import { Button, Input } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { addToCartSchema } from '@/lib/validation/cartSchema'
import { useStore } from '@/store/use-store-hook'
import { useUserStore } from '@/store/userStore'

export default function AddToCartForm({ productId }: { productId: number }) {
	const queryClient = useQueryClient()

	const isAuth = useStore(useUserStore, state => state.isAuth)

	const mutation = useMutation({
		mutationFn: CartService.createCartItem,
		onSuccess: () => queryClient.invalidateQueries(['cart'])
	})

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<CreateCartItem>({
		defaultValues: {
			quantity: 1,
			productId: productId
		},
		resolver: zodResolver(addToCartSchema)
	})

	const onSubmit: SubmitHandler<CreateCartItem> = data => {
		try {
			mutation.mutate({ ...data })
		} catch (error) {
			console.log(error)
		}
	}

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
			{!isAuth && mutation.isError && <span className="text-red-500">Увійдіть, щоб додавати товари в корзину</span>}
		</form>
	)
}
