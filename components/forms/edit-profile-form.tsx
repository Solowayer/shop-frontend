'use client'

import React from 'react'
import { Button, Input } from '../ui'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import ProfileService from '@/services/profile-service'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileSchema } from '@/lib/validation/profileSchema'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Profile, Gender } from '@/types/profile.type'

type ProfileFormProps = {
	setOpen: (value: boolean) => void
} & Profile

export default function EditProfileForm({ firstName, lastName, gender, setOpen }: ProfileFormProps) {
	const queryClient = useQueryClient()

	const mutation = useMutation((data: Profile) => ProfileService.updateProfile(data), {
		onSuccess: () => queryClient.invalidateQueries(['profile'])
	})

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isDirty },
		setValue
	} = useForm<Profile>({
		defaultValues: {
			firstName,
			lastName,
			gender
		},
		resolver: zodResolver(profileSchema)
	})

	const handleClose = () => {
		setOpen(false)
	}

	const onSubmit: SubmitHandler<Profile> = async data => {
		try {
			await mutation.mutateAsync({ ...data })
			handleClose()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
			<div className="grid grid-cols-2 gap-4">
				<Input {...register('firstName')} disabled={isSubmitting} label="Ім'я" id="firstName" fullWidth />
				{errors.firstName?.message && <span className="text-red-500">{errors.firstName?.message}</span>}
				<Input {...register('lastName')} disabled={isSubmitting} label="Прізвище" id="lastName" fullWidth />
				{errors.lastName?.message && <span className="text-red-500">{errors.lastName?.message}</span>}

				<div className="flex flex-col gap-4">
					<span className="font-medium">
						Стать {gender === null && <span className="text-zinc-500">(Не вказано)</span>}
					</span>
					<RadioGroup
						defaultValue={gender ?? null}
						onValueChange={(value: Gender) => setValue('gender', value, { shouldDirty: true })}
					>
						<div className="flex flex-col gap-4">
							<RadioGroupItem {...register('gender')} value={Gender.FEMALE} label="Жіноча" id="female" />
							<RadioGroupItem {...register('gender')} value={Gender.MALE} label="Чоловіча" id="male" />
							<RadioGroupItem {...register('gender')} value={Gender.OTHER} label="Інше" id="other" />
						</div>
					</RadioGroup>
				</div>
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
