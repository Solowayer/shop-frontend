'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { addtoCart } from '@/lib/mutations'
import Button from '@/ui/Button'
import { useCartStore } from '@/store/cartStore'
import { ExpandMore } from '../icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { addToCartSchema } from '@/lib/validation/cart'

export default function AddToCartForm({ productId }: { productId: number }) {
	const { setCartItemCount } = useCartStore()
	const { cartItemCount } = useCartStore()

	const mutation = useMutation({
		mutationFn: addtoCart
	})

	const { isError } = mutation

	const options = Array.from({ length: 100 }, (_, index) => (
		<option key={index + 1} value={index + 1}>
			{index + 1}
		</option>
	))

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<AddToCart>({
		defaultValues: {
			quantity: '1',
			productId: productId
		},
		resolver: zodResolver(addToCartSchema)
	})

	const onSubmit: SubmitHandler<AddToCart> = data => {
		const quantityValue = parseInt(data.quantity, 10)
		mutation.mutate(
			{ ...data },
			{
				onSuccess: () => {
					setCartItemCount(cartItemCount + quantityValue)
					console.log({ ...data })
				},
				onError: error => {
					console.log(error)
				}
			}
		)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<div className="flex items-center relative border hover:cursor-pointer rounded px-1">
				<select
					id="quantity"
					className="appearance-none w-full focus:outline-none"
					{...register('quantity')}
					disabled={isSubmitting}
				>
					{options}
				</select>
				<ExpandMore className="pointer-events-none absolute end-1" />
			</div>
			{isError && <span className="text-red-500">Увійдіть, щоб додавати товари в корзину</span>}
			{errors.quantity && <span className="text-red-500">Помилка</span>}
			<Button type="submit" fullWidth disabled={isSubmitting}>
				{isSubmitting ? 'Додається...' : 'Додати в корзину'}
			</Button>
		</form>
	)
}
