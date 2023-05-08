import { Button } from '@/ui/Button'
import { ButtonLink } from '@/ui/ButtonLink'
import { Input } from '@/ui/Input'

const Signup = () => {
	return (
		<>
			<form className="flex flex-col bg-surface border rounded gap-4 p-6">
				<p className="text-2xl font-medium">Вхід</p>
				<hr />
				<Input label="Ваше ім'я" />
				<Input label="Електронна пошта" />
				<Input label="Номер телефону" />
				<Input label="Пароль" />
				<Input label="Повторіть пароль" />
				<Button>Зареєструватись</Button>
			</form>
			<p>Вже є аккаунт?</p>
			<ButtonLink variant="secondary" href="auth/signin" fullWidth>
				Увійти
			</ButtonLink>
		</>
	)
}

export default Signup
