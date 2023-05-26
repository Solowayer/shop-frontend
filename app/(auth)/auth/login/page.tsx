'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/validation/authorization'

import Button from '@/components/ui/Button'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Input } from '@/components/ui/Input'
import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'
import { login } from '@/lib/mutations'

export default function Login() {
	const mutation = useMutation({
		mutationFn: login
	})

	const router = useRouter()

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
			mutation.mutate({ ...data })
			router.push('/')
			console.log({ ...data })
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
				{mutation.isError && <div>Something wrong</div>}
				{mutation.isLoading && <div>Loading...</div>}
				{mutation.isSuccess && <div>Done</div>}
			</form>
			<p>Ще немає аккаунту?</p>
			<ButtonLink variant="secondary" href="/auth/register" fullWidth>
				Зареєструватись
			</ButtonLink>
		</>
	)
}
