'use client'

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button, Spinner } from '@/components/ui'
import DefaultError from '@/components/layouts/default-error'
import ProfileService from '@/services/profile-service'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import EditProfileForm from '@/components/forms/edit-profile-form'

export default function Page() {
	const genderLabels = {
		MALE: 'Чоловіча',
		FEMALE: 'Жіноча',
		OTHER: 'Інше'
	}

	const [open, setOpen] = useState<boolean>(false)
	const { data, isError, isLoading, refetch } = useQuery(['profile'], ProfileService.get)

	if (isLoading) {
		return <Spinner />
	}

	if (isError) {
		return <DefaultError reset={refetch} />
	}

	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center justify-between">
				<h1 className="w-full text-3xl font-bold">Профіль</h1>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button intent="secondary">Редагувати</Button>
					</DialogTrigger>

					<DialogContent title="Редагування профілю" description="Внесіть зміни у свій профіль тут.">
						<EditProfileForm
							firstName={data.firstName}
							lastName={data.lastName}
							gender={data.gender}
							setOpen={setOpen}
						/>
					</DialogContent>
				</Dialog>
			</div>

			<div className="grid grid-cols-2 gap-4 border p-6 rounded">
				<div className="flex flex-col">
					<span className="font-bold">Ім&apos;я:</span>
					{data.firstName}
				</div>

				<div className="flex flex-col">
					<span className="font-bold">Прізвище:</span>
					{data.lastName}
				</div>

				<div className="flex flex-col">
					<span className="font-bold">Стать:</span>
					<span>{genderLabels[data.gender] ?? 'Не вказано'}</span>
				</div>
			</div>
		</div>
	)
}
