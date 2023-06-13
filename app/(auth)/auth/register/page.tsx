'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '@/lib/validation/authorizationSchema'
import { useRouter } from 'next/navigation'

import Button from '@/ui/Button'
import { ButtonLink } from '@/ui/ButtonLink'
import { Input } from '@/ui/Input'
import { useMutation } from '@tanstack/react-query'
import { loginUser, registerUser } from '@/lib/mutations'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'

export default function Register() {
	const router = useRouter()
	const { setIsAuth } = useAuthStore()

	const logMutation = useMutation({
		mutationFn: loginUser
	})

	const regMutation = useMutation({
		mutationFn: registerUser
	})

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<UserRegister>({
		defaultValues: {
			username: '',
			email: '',
			phoneNumber: '',
			password: ''
		},
		resolver: zodResolver(registerSchema)
	})

	const onSubmit: SubmitHandler<UserRegister> = async data => {
		const { email, password } = data

		try {
			await regMutation.mutateAsync({ ...data })
			await logMutation.mutateAsync({ email, password })
			console.log({ ...data })
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (regMutation.isSuccess && logMutation.isSuccess) {
			setIsAuth(true)
			router.push('/')
		}
	}, [logMutation.isSuccess, regMutation.isSuccess, router, setIsAuth])

	return (
		<>
			<form className="flex flex-col bg-surface border rounded gap-4 p-6" onSubmit={handleSubmit(onSubmit)}>
				<p className="text-2xl font-medium">Реєстрація</p>
				<hr />
				<Input id="username" type="text" label="Ваше ім'я" {...register('username')} disabled={isSubmitting} />
				{errors.username?.message && <p className="text-red-500">{errors.username?.message}</p>}
				<Input id="email" type="email" label="Електронна пошта" {...register('email')} disabled={isSubmitting} />
				{errors.email?.message && <p className="text-red-500">{errors.email?.message}</p>}
				<Input
					id="phoneNumber"
					type="tel"
					label="Номер телефону"
					{...register('phoneNumber')}
					disabled={isSubmitting}
				/>
				<Input id="password" type="password" label="Пароль" {...register('password')} />
				{errors.password?.message && <p className="text-red-500">{errors.password?.message}</p>}
				<Button type="submit">Зареєструватись</Button>
				{regMutation.isError && <span className="text-red-500">{(regMutation.error as any)?.message}</span>}
				{regMutation.isLoading && <span>Loading...</span>}
				{regMutation.isSuccess && <span>Done</span>}
			</form>
			<p>Вже є аккаунт?</p>
			<ButtonLink variant="secondary" href="auth/login" fullWidth disabled={isSubmitting}>
				Увійти
			</ButtonLink>
		</>
	)
}
