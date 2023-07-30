'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Button, Input } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import ListService from '@/services/list-service'
import { listSchema } from '@/lib/validation/listSchema'

type AddListFormProps = {
	setDialogClose: () => void
	productId?: number
}

export default function CreateListForm({ setDialogClose, productId }: AddListFormProps) {
	const queryClient = useQueryClient()

	const createListmutation = useMutation({
		mutationFn: ListService.create,
		onSuccess: () => queryClient.invalidateQueries(['lists'])
	})

	const addProductToListMutation = useMutation({
		mutationFn: ({ listId, productId }: { listId: number; productId: number }) =>
			ListService.addProduct(listId, productId),
		onSuccess: () => {
			queryClient.invalidateQueries(['check-product-in-list', productId])
		}
	})

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<CreateList>({
		defaultValues: {
			name: ''
		},
		resolver: zodResolver(listSchema)
	})

	const onSubmit: SubmitHandler<CreateList> = async data => {
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
			{errors.name && <span className="text-red-500">Помилка</span>}
			<Button type="submit" fullWidth disabled={isSubmitting}>
				{isSubmitting ? 'Створюється...' : 'Створити'}
			</Button>
		</form>
	)
}
