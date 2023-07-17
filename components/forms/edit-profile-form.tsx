'use client'

import React from 'react'
import { Button, Input } from '../ui'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import ProfileService from '@/services/profile-service'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileSchema } from '@/lib/validation/profileSchema'

type ProfileFormProps = {
	firstName: string
	lastName: string
	setOpen: (value: boolean) => void
}

export default function EditProfileForm({ firstName, lastName, setOpen }: ProfileFormProps) {
	const queryClient = useQueryClient()

	const mutation = useMutation((data: Profile) => ProfileService.updateProfile(data), {
		onSuccess: () => queryClient.invalidateQueries(['profile'])
	})

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isDirty }
	} = useForm<Profile>({
		defaultValues: {
			firstName,
			lastName
		},
		resolver: zodResolver(profileSchema)
	})

	const onSubmit: SubmitHandler<Profile> = async data => {
		try {
			await mutation.mutateAsync({ ...data })
			setOpen(false)
		} catch (error) {
			console.log(error)
		}
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
			<div className="flex flex-col gap-4">
				<Input {...register('firstName')} disabled={isSubmitting} label="Ім'я" id="firstName" fullWidth />
				{errors.firstName?.message && <span className="text-red-500">{errors.firstName?.message}</span>}
				<Input {...register('lastName')} disabled={isSubmitting} label="Прізвище" id="lastName" fullWidth />
				{errors.lastName?.message && <span className="text-red-500">{errors.lastName?.message}</span>}
			</div>

			<div className="flex justify-end gap-4">
				<Button intent="secondary" onClick={handleClose}>
					Скасувати
				</Button>
				<Button type="submit" disabled={!isDirty}>
					Внести зміни
				</Button>
			</div>
		</form>
	)
}
