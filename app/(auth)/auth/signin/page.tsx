'use client'

import axios from 'axios'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signinSchema } from '@/validation/authorization'
import Cookies from 'js-cookie'

import { Button } from '@/components/ui/Button'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Input } from '@/components/ui/Input'
import { useRouter } from 'next/navigation'

const Signin = () => {
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<UserSignin>({
		defaultValues: {
			emailOrPhoneNumber: '',
			password: ''
		},
		resolver: zodResolver(signinSchema)
	})

	const onSubmit: SubmitHandler<UserSignin> = async data => {
		try {
			const response = await axios.post(`${process.env.api}/user-auth/signin`, data)
			console.log(response)
			const { token } = await response.data
			console.log(token)

			localStorage.setItem('token', token) // зберегти токен у localStorage

			// оновити хедер для авторизованого користувача
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

			router.push('/')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<form className="flex flex-col bg-surface border rounded gap-4 p-6" onSubmit={handleSubmit(onSubmit)}>
				<p className="text-2xl font-medium">Вхід</p>
				<hr />
				<Input
					label="Електронна пошта або номер телефону"
					pattern="^(380\d{9}|[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3})$"
					{...register('emailOrPhoneNumber')}
					disabled={isSubmitting}
				/>
				{errors.emailOrPhoneNumber?.message && <p className="text-red-500">{errors.emailOrPhoneNumber?.message}</p>}
				<Input label="Пароль" {...register('password')} disabled={isSubmitting} />
				{errors.password?.message && <p className="text-red-500">{errors.password?.message}</p>}
				<Button type="submit">Увійти</Button>
			</form>
			<p>Ще немає аккаунту?</p>
			<ButtonLink variant="secondary" href="/auth/signup" fullWidth>
				Зареєструватись
			</ButtonLink>
		</>
	)
}

export default Signin
