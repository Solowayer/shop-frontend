'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button, Spinner } from '@/components/ui'
import DefaultError from '@/components/layouts/default-error'
import ProfileService from '@/services/profile-service'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

export default function Page() {
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
				<Dialog>
					<DialogTrigger asChild>
						<Button intent="secondary">Редагувати</Button>
					</DialogTrigger>

					<DialogContent title="Редагування профілю" description="Внесіть зміни у свій профіль тут.">
						Content
					</DialogContent>
				</Dialog>
			</div>

			<div className="border rounded-lg">
				<div className="flex justify-between items-center border-b rounded p-4">
					<div className="flex flex-col">
						<span className="font-bold">Ім&apos;я:</span>
						{data.firstName}
					</div>
				</div>
				<div className="flex justify-between items-center rounded p-4">
					<div className="flex flex-col">
						<span className="font-bold">Прізвище:</span>
						{data.lastName}
					</div>
				</div>
			</div>
		</div>
	)
}
