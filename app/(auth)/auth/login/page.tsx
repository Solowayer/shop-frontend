'use client'

import { useEffect } from 'react'

import axios from 'axios'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { loginSchema } from '@/validation/authorization'
import { zodResolver } from '@hookform/resolvers/zod'

import { login } from '@/redux/slices/authSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

import Button from '@/components/ui/Button'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Input } from '@/components/ui/Input'
import { RootState } from '@/redux/store'

import { useAuthLoginMutation } from '@/redux/api/authLoginApi'

export default function Login() {
	const [authLogin, { isLoading, isError }] = useAuthLoginMutation()

	const router = useRouter()

	const loginState = useAppSelector((state: RootState) => state.auth)
	const dispatch = useAppDispatch()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<UserLogin>({
		defaultValues: {
			email: '',
			password: ''
		},
		resolver: zodResolver(loginSchema)
	})

	const onSubmit: SubmitHandler<UserLogin> = async data => {
		try {
			const payload = await authLogin(data).unwrap()
			dispatch(login(payload))
			console.log('fulfilled', payload)
			return payload
		} catch (error) {
			console.error('rejected', error)
		}
	}

	useEffect(() => {
		console.log(loginState)
	}, [loginState])

	return (
		<>
			<form className="flex flex-col bg-surface border rounded gap-4 p-6" onSubmit={handleSubmit(onSubmit)}>
				<p className="text-2xl font-medium">Вхід</p>
				<hr />
				<Input label="Електронна пошта" type="email" {...register('email')} disabled={isSubmitting} />
				{errors.email?.message && <p className="text-red-500">{errors.email?.message}</p>}
				<Input label="Пароль" type="password" {...register('password')} disabled={isSubmitting} />
				{errors.password?.message && <p className="text-red-500">{errors.password?.message}</p>}
				<Button type="submit">Увійти</Button>
			</form>
			<p>Ще немає аккаунту?</p>
			<ButtonLink variant="secondary" href="/auth/register" fullWidth>
				Зареєструватись
			</ButtonLink>
		</>
	)
}
