'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { Button, Input } from '@/components/ui'
import WishlistService from '@/services/wishlist-service'
import { useRouter } from 'next/navigation'
import { listSchema } from '@/lib/validation/listSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Delete } from '../icons'
import { useEffect } from 'react'

type EditListFormProps = {
	listId: number
	setDialogClose: () => void
}

export default function EditWishlistForm({ listId, setDialogClose }: EditListFormProps) {
	const router = useRouter()
	const queryClient = useQueryClient()
	const { data: list } = useQuery(['wishlist', listId], () => WishlistService.findWishlistById(listId))

	const updateListmutation = useMutation({
		mutationFn: (data: UpdateWishlist) => WishlistService.updateWishlist(listId, data),
		onSuccess: () => queryClient.invalidateQueries(['wishlist', listId])
	})

	const deleteListMutation = useMutation({
		mutationFn: () => WishlistService.deleteWishlist(listId),
		onSuccess: () => {
			queryClient.invalidateQueries(['wishlists'])
		}
	})

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting, isDirty }
	} = useForm<UpdateWishlist>({
		resolver: zodResolver(listSchema)
	})

	useEffect(() => {
		if (list) {
			reset(list)
		}
	}, [list, reset])

	const onSubmit: SubmitHandler<UpdateWishlist> = async data => {
		try {
			await updateListmutation.mutateAsync({ ...data })
			setDialogClose()
		} catch (error) {
			console.log(error)
		}
	}

	const handleDeleteList = async () => {
		router.replace('/account/wishlists')
		try {
			deleteListMutation.mutateAsync()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
			<div className="flex flex-col gap-2">
				<Input label="Назва" id="name" {...register('name')} />
				{errors.name && <span className="text-red-500">{errors.name?.message}</span>}
			</div>
			<div className="flex justify-between gap-4">
				<Button intent="secondary" disabled={isSubmitting} onClick={handleDeleteList}>
					<Delete />
					Видалити
				</Button>
				<div className="flex gap-4">
					<Button intent="secondary" disabled={isSubmitting} onClick={setDialogClose}>
						Скасувати
					</Button>
					<Button type="submit" disabled={isSubmitting || !isDirty}>
						{isSubmitting ? 'Збереження...' : 'Зберегти'}
					</Button>
				</div>
			</div>
		</form>
	)
}
