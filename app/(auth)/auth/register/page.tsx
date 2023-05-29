'use client'

import axios from 'axios'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '@/validation/authorization'
import { useRouter } from 'next/navigation'

import Button from '@/ui/Button'
import { ButtonLink } from '@/ui/ButtonLink'
import { Input } from '@/ui/Input'

export default function Register() {
	// const router = useRouter()

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
		try {
			const response = await axios.post(`${process.env.api}/user-auth/register`, data)
			console.log(response)

			// router.push('/')
		} catch (error) {
			console.log(error)
		}
	}

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
			</form>
			<p>Вже є аккаунт?</p>
			<ButtonLink variant="secondary" href="auth/login" fullWidth disabled={isSubmitting}>
				Увійти
			</ButtonLink>
		</>
	)
}