'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Button, Input } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import WishlistService from '@/services/wishlist-service'
import { listSchema } from '@/lib/validation/listSchema'

type AddListFormProps = {
	setDialogClose: () => void
	productId?: number
}

export default function CreateWishlistForm({ setDialogClose, productId }: AddListFormProps) {
	const queryClient = useQueryClient()

	const createListmutation = useMutation({
		mutationFn: WishlistService.createWishlist,
		onSuccess: () => queryClient.invalidateQueries(['wishlists'])
	})

	const addProductToListMutation = useMutation({
		mutationFn: ({ listId, productId }: { listId: number; productId: number }) =>
			WishlistService.addProductToWishlist(listId, productId),
		onSuccess: () => {
			queryClient.invalidateQueries(['check-product-in-wishlist', productId])
		}
	})

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<CreateWishlist>({
		defaultValues: {
			name: ''
		},
		resolver: zodResolver(listSchema)
	})

	const onSubmit: SubmitHandler<CreateWishlist> = async data => {
		try {
			const createdList = await createListmutation.mutateAsync({ ...data })
			const listId = createdList.id

			if (listId && productId) await addProductToListMutation.mutateAsync({ listId, productId })
			console.log(createListmutation.data?.id)

			setDialogClose()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
			<Input label="Назва" id="name" {...register('name')} />
			{errors.name && <span className="text-red-500">{errors.name?.message}</span>}
			<Button type="submit" fullWidth disabled={isSubmitting}>
				{isSubmitting ? 'Створюється...' : 'Створити'}
			</Button>
		</form>
	)
}
