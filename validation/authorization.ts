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

export const signinSchema = z.object({
	emailOrPhoneNumber: z
		.string()
		.regex(/^(380\d{9}|[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3})$/, { message: 'Invalid email or phone number format' }),
	password: z.string().min(6, { message: 'Вкажіть password' }).max(20)
})
