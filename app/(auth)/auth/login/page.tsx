import LoginForm from '@/components/forms/login-form'
import { ButtonLink } from '@/components/ui'

export default function Login() {
	return (
		<>
			<LoginForm />
			<p>Ще немає аккаунту?</p>
			<ButtonLink intent="secondary" href="/auth/register" fullWidth>
				Зареєструватись
			</ButtonLink>
		</>
	)
}
