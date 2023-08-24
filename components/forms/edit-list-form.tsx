'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { Button, Input } from '@/components/ui'
import ListService from '@/services/wishlist-service'
import { useRouter } from 'next/navigation'
import { listSchema } from '@/lib/validation/listSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Delete } from '../icons'

type EditListFormProps = {
	listId: number
	setDialogClose: () => void
}

export default function EditListForm({ listId, setDialogClose }: EditListFormProps) {
	const router = useRouter()
	const queryClient = useQueryClient()
	const { data: list } = useQuery(['list', listId], () => ListService.findById(listId))

	const updateListmutation = useMutation({
		mutationFn: (data: EditList) => ListService.update(listId, data),
		onSuccess: () => queryClient.invalidateQueries(['list', listId])
	})

	const deleteListMutation = useMutation({
		mutationFn: () => ListService.delete(listId),
		onSuccess: () => {
			queryClient.invalidateQueries(['lists'])
		}
	})

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isDirty }
	} = useForm<EditList>({
		defaultValues: {
			name: list?.name
		},
		resolver: zodResolver(listSchema)
	})

	const onSubmit: SubmitHandler<EditList> = async data => {
		try {
			updateListmutation.mutateAsync({ ...data })
			setDialogClose()
		} catch (error) {
			console.log(error)
		}
	}

	const handleDeleteList = async () => {
		router.replace('/account/lists')
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
