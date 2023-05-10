import { Button } from '@/ui/Button'
import { ButtonLink } from '@/ui/ButtonLink'
import { Input } from '@/ui/Input'

const Signup = () => {
	return (
		<>
			<form className="flex flex-col bg-surface border rounded gap-4 p-6">
				<p className="text-2xl font-medium">Вхід</p>
				<hr />
				<Input id="username" type="text" label="Ваше ім'я" required />
				<Input id="email" type="email" label="Електронна пошта" required />
				<Input id="phoneNumber" type="tel" label="Номер телефону" />
				<Input id="password" type="password" label="Пароль" required />
				<Button type="submit">Зареєструватись</Button>
			</form>
			<p>Вже є аккаунт?</p>
			<ButtonLink variant="secondary" href="auth/signin" fullWidth>
				Увійти
			</ButtonLink>
		</>
	)
}

export default Signup
