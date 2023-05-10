'use client'

import axios from 'axios'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupSchema } from '@/validation/signup-schema'

import { Button } from '@/ui/Button'
import { ButtonLink } from '@/ui/ButtonLink'
import { Input } from '@/ui/Input'

const Signup = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<UserSignup>({
		defaultValues: {
			username: '',
			email: '',
			phoneNumber: '',
			password: ''
		},
		resolver: zodResolver(signupSchema)
	})

	const onSubmit: SubmitHandler<UserSignup> = data =>
		axios
			.post('http://localhost:4200/user-auth/signup', data)
			.then(function (response) {
				console.log(response)
			})
			.catch(function (error) {
				console.log(error)
			})

	return (
		<>
			<form className="flex flex-col bg-surface border rounded gap-4 p-6" onSubmit={handleSubmit(onSubmit)}>
				<p className="text-2xl font-medium">Вхід</p>
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
			<ButtonLink variant="secondary" href="auth/signin" fullWidth disabled={isSubmitting}>
				Увійти
			</ButtonLink>
		</>
	)
}

export default Signup
