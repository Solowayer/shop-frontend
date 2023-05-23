'use client'

import axios from 'axios'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/validation/authorization'

import { useDispatch, useSelector } from 'react-redux'
import { login } from '@/store/slices/authSlice'

import Button from '@/components/ui/Button'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Input } from '@/components/ui/Input'
import { useRouter } from 'next/navigation'
import { RootState } from '@/store'

export default function Login() {
	const router = useRouter()

	const loginState = useSelector((state: RootState) => state.auth)

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

	const dispatch = useDispatch()

	const onSubmit: SubmitHandler<UserLogin> = async data => {
		try {
			const response = await axios.post(`${process.env.api}/user-auth/login`, data, {
				withCredentials: true
			})
			dispatch(login(response.data))

			console.log(loginState)

			// router.push('/')
		} catch (error) {
			console.log(error)
		}
	}

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
