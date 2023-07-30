'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Button, Input } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { addToCartSchema } from '@/lib/validation/cartSchema'
import ListService from '@/services/list-service'

type AddListFormProps = {
	setDialogClose: () => void
}

export default function AddListForm({ setDialogClose }: AddListFormProps) {
	const queryClient = useQueryClient()

	const createListmutation = useMutation({
		mutationFn: ListService.create,
		onSuccess: () => queryClient.invalidateQueries(['lists'])
	})

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<CreateList>({
		defaultValues: {
			name: ''
		}
	})

	const onSubmit: SubmitHandler<CreateList> = async data => {
		try {
			createListmutation.mutateAsync({ ...data })
			setDialogClose()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<Input label="Назва" id="name" {...register('name')} />
			{errors.name && <span className="text-red-500">Помилка</span>}
			<Button type="submit" fullWidth disabled={isSubmitting}>
				{isSubmitting ? 'Створюється...' : 'Створити'}
			</Button>
		</form>
	)
}
