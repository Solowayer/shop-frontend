'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { Button, Input } from '@/components/ui'
import ListService from '@/services/list-service'
import { useRouter } from 'next/navigation'

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
		onSuccess: () => queryClient.invalidateQueries(['lists'])
	})

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<EditList>({
		defaultValues: {
			name: list?.name
		}
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
		try {
			deleteListMutation.mutateAsync()
			router.push('/account/lists')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<Input label="Назва" id="name" {...register('name')} />
			{errors.name && <span className="text-red-500">Помилка</span>}
			<div className="flex justify-between gap-4">
				<Button intent="danger" disabled={isSubmitting} onClick={handleDeleteList}>
					Видалити
				</Button>
				<div className="flex gap-4">
					<Button intent="secondary" disabled={isSubmitting} onClick={setDialogClose}>
						Скасувати
					</Button>
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? 'Створюється...' : 'Перейменувати'}
					</Button>
				</div>
			</div>
		</form>
	)
}
