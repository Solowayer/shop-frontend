'use client'

import { sellerSchema } from '@/lib/validation/sellerSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Button from '@/ui/Button'
import { Input } from '@/ui/Input'
import { registerSeller } from '@/lib/mutations'
import { useMutation } from '@tanstack/react-query'
import { useSellerStore } from '@/store/sellerStore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SellerRegister() {
	const router = useRouter()
	const { setIsSeller } = useSellerStore()

	const sellerMutation = useMutation({
		mutationFn: registerSeller
	})

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<SellerRegister>({
		defaultValues: {
			name: '',
			adress: '',
			email: '',
			phoneNumber: '',
			pib: ''
		},
		resolver: zodResolver(sellerSchema)
	})

	const onSubmit: SubmitHandler<SellerRegister> = async data => {
		try {
			sellerMutation.mutate({ ...data })
			console.log({ ...data })
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (sellerMutation.isSuccess) {
			setIsSeller(true)
			router.push('/seller/dashboard')
		}
	}, [router, sellerMutation.isSuccess, setIsSeller])

	return (
		<div className="flex flex-col">
			<div className="flex w-full gap-8 bg-blue-600 px-10 pb-10">
				<div className="flex flex-col w-full gap-4 max-w-[1500px] m-auto">
					<div className="flex w-full items-center justify-between h-[80px]">
						<Link href="/" className="text-2xl font-bold text-white">
							SHOP
						</Link>
					</div>
					<div className="flex w-full">
						<div className="flex flex-col gap-4 w-1/2 py-12">
							<p className="text-4xl font-black text-white">Хочеш продавати?</p>
							<p className="text-white">Реєструй свій магазин та приєднуйся</p>
						</div>
						<form
							className="flex bg-white flex-1 flex-col bg-surface border rounded gap-4 p-6"
							onSubmit={handleSubmit(onSubmit)}
						>
							<Input {...register('name')} label="Назва магазину" type="text" id="name" disabled={isSubmitting} />
							{errors.name?.message && <p className="text-red-500">{errors.name?.message}</p>}
							<Input {...register('adress')} label="Адреса" type="text" id="adress" disabled={isSubmitting} />
							{errors.adress?.message && <p className="text-red-500">{errors.adress?.message}</p>}
							<Input {...register('email')} label="Email" type="email" id="email" disabled={isSubmitting} />
							{errors.email?.message && <p className="text-red-500">{errors.email?.message}</p>}
							<Input {...register('phoneNumber')} label="Телефон" type="tel" id="tel" disabled={isSubmitting} />
							{errors.phoneNumber?.message && <p className="text-red-500">{errors.phoneNumber?.message}</p>}
							<Input
								{...register('pib')}
								label="Прізвище, ім'я, по-батькові"
								type="text"
								id="pib"
								disabled={isSubmitting}
							/>
							{sellerMutation.isError && <span className="text-red-500">{(sellerMutation.error as any)?.message}</span>}
							{sellerMutation.isLoading && <span>Loading...</span>}
							{sellerMutation.isSuccess && <span>Done</span>}
							{errors.pib?.message && <p className="text-red-500">{errors.pib?.message}</p>}
							<Button type="submit" disabled={isSubmitting}>
								Приєднатись
							</Button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
