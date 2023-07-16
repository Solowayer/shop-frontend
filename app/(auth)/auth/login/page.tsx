'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/lib/validation/authorizationSchema'

import { Button, ButtonLink, Input } from '@/components/ui'

import { useMutation } from '@tanstack/react-query'

import AuthService from '@/services/auth-service'

import { useUserStore } from '@/store/userStore'
import { useEffect } from 'react'
import { useAuthRedirect } from '@/lib/hooks/useAuthRedirect'

export default function Login() {
	const { setIsAuth } = useUserStore()

	const logMutation = useMutation({
		mutationFn: AuthService.login
	})

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<Login>({
		defaultValues: {
			email: '',
			password: ''
		},
		resolver: zodResolver(loginSchema)
	})

	const onSubmit: SubmitHandler<Login> = async data => {
		try {
			logMutation.mutate({ ...data })
			console.log({ ...data })
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (logMutation.isSuccess) {
			setIsAuth(true)
		}
	}, [logMutation.isSuccess, setIsAuth])

	useAuthRedirect()

	return (
		<>
			<form className="flex flex-col bg-surface border rounded gap-4 p-6" onSubmit={handleSubmit(onSubmit)}>
				<p className="text-2xl font-medium">Вхід</p>
				<hr />
				<Input label="Електронна пошта" type="email" id="email" {...register('email')} disabled={isSubmitting} />
				{errors.email?.message && <p className="text-red-500">{errors.email?.message}</p>}
				<Input label="Пароль" type="password" id="password" {...register('password')} disabled={isSubmitting} />
				{errors.password?.message && <p className="text-red-500">{errors.password?.message}</p>}
				<Button type="submit" disabled={isSubmitting}>
					Увійти
				</Button>
				{logMutation.isError && <div>Something wrong</div>}
				{logMutation.isLoading && <div>Loading...</div>}
				{logMutation.isSuccess && <div>Done</div>}
			</form>
			<p>Ще немає аккаунту?</p>
			<ButtonLink intent="secondary" href="/auth/register" fullWidth>
				Зареєструватись
			</ButtonLink>
		</>
	)
}
