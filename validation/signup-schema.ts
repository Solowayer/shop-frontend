import * as z from 'zod'

export const signupSchema = z.object({
	username: z.string().min(1, { message: 'Вкажіть name' }).max(15),
	email: z.string().email({ message: 'Вкажіть email' }),
	phoneNumber: z.string().transform(phoneNumber => {
		if (phoneNumber === '') return null
		return phoneNumber
	}),
	password: z.string().min(6, { message: 'Вкажіть password' }).max(20)
})
