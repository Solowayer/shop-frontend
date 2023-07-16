import { ButtonLink } from '@/components/ui'
import { RegisterForm } from '@/components/forms/register-form'

export default function Register() {
	return (
		<>
			<RegisterForm />
			<p>Вже є аккаунт?</p>
			<ButtonLink intent="secondary" href="/auth/login" fullWidth>
				Увійти
			</ButtonLink>
		</>
	)
}
