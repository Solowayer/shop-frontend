import * as z from 'zod'

export const listSchema = z.object({
	name: z.string().min(1, { message: 'Мінімум 1 символ' }).max(20, { message: 'Не більше 20 символів' })
})
