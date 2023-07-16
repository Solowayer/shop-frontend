import * as z from 'zod'

export const registerSchema = z.object({
	firstName: z.string().min(1, { message: 'Вкажіть ім`я' }).max(20),
	lastName: z.string().min(1, { message: 'Вкажіть прізвище' }).max(20),
	email: z.string().email({ message: 'Вкажіть email' }),
	phoneNumber: z.string().transform(phoneNumber => {
		if (phoneNumber === '') return null
		return phoneNumber
	}),
	password: z.string().min(6, { message: 'Вкажіть password' }).max(20)
})

export const loginSchema = z.object({
	email: z.string().email({ message: 'Вкажіть email' }),
	password: z.string().min(6, { message: 'Вкажіть password' }).max(20)
})
