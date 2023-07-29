'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Button, Input } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { addToCartSchema } from '@/lib/validation/cartSchema'
import ListService from '@/services/list-service'

export default function AddToCartForm() {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: ListService.create
	})

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<CreateList>({
		defaultValues: {
			name: ''
		},
		resolver: zodResolver(addToCartSchema)
	})

	const onSubmit: SubmitHandler<CreateList> = data => {
		try {
			mutation.mutate({ ...data })
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<hr />
			<Input label="Виберіть кількість:" id="name" {...register('name', { valueAsNumber: true })} />
			{errors.name && <span className="text-red-500">Помилка</span>}
			<Button type="submit" fullWidth disabled={isSubmitting}>
				{isSubmitting ? 'Створюється...' : 'Створити'}
			</Button>
		</form>
	)
}
