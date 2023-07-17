import * as z from 'zod'

export const profileSchema = z.object({
	firstName: z.string().max(20, 'ввв'),
	lastName: z.string().max(20, 'ввв')
})
