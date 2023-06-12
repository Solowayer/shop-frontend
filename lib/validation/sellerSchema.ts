import * as z from 'zod'

export const sellerSchema = z.object({
	name: z.string().min(1, { message: 'Вкажіть name' }).max(20),
	adress: z.string().min(1, { message: 'Вкажіть name' }).max(50),
	email: z.string().email({ message: 'Вкажіть email' }),
	phoneNumber: z.string().min(1, { message: 'Вкажіть номер телефону' }),
	pib: z.string().min(1, { message: 'Вкажіть name' }).max(50)
})

export const loginSchema = z.object({
	email: z.string().email({ message: 'Вкажіть email' }),
	password: z.string().min(6, { message: 'Вкажіть password' }).max(20)
})
