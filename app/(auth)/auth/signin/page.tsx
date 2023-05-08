import { Button } from '@/components/ui/Button'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Input } from '@/components/ui/Input'

const Signin = () => {
	return (
		<>
			<form className="flex flex-col bg-surface border rounded gap-4 p-6">
				<p className="text-2xl font-medium">Вхід</p>
				<hr />
				<Input label="Електронна пошта або номер телефону" />
				<Input label="Пароль" />
				<Button>Увійти</Button>
			</form>
			<p>Ще немає аккаунту?</p>
			<ButtonLink variant="secondary" href="/auth/signup" fullWidth>
				Зареєструватись
			</ButtonLink>
		</>
	)
}

export default Signin
